const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {id}=req.params
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id , req.body, {
      new: true,
    });
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteProduct = asyncHandler(async (req, res) => {
  const {id}=req.params

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  try {
    const findProduct = await Product.findOne({handle:req.params.handle})
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getaProductDashboard = asyncHandler(async (req, res) => {
  const {id}=req.params
  try {
    const findProduct = await Product.findById(id)
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    let query = {};

    // Check if a collection name is provided
    if (req.params.collectionName) {
      query.collectionName = req.params.collectionName;
    }

    // Apply size filter if provided
     if (req.query.size) {
      const sizes = req.query.size.split(',').map(size => size.trim());
      query['variants'] = { 
        $elemMatch: { 
          size: { $in: sizes }, 
          quantity: { $gt: 0 } 
        } 
      };
    }
    if (req.query.color) {
      const colors = req.query.color.split(',').map(color => color.trim());
      query['variants.color'] = { $in: colors.map(color => new RegExp(color, 'i')) }; // Case-insensitive regex match for multiple colors
    }
    if (req.query.brand) {
      const brands = req.query.brand.split(',').map(brand => brand.trim());
      query['brand'] = { $in: brands}; // Exact match for multiple brands
    }

    // Handling search conditions...
    if (req.query.search) {
      const searchKeywords = req.query.search.toLowerCase().split(' ');
      const searchConditions = [];

      searchKeywords.forEach(keyword => {
        let regexPattern;
        if (keyword === "shirt") {
          regexPattern = new RegExp(`^(?!.*t-shirt).*\\b${keyword}\\b.*$`, 'i');
        }
        else if(keyword==="shirts"){
          regexPattern = new RegExp(`\\bshirt\\b`, 'i');
        }
         else if (["tshirt", "tshirts", "t-shirts"].includes(keyword)) {
          regexPattern = new RegExp(`\\bt-shirt\\b`, 'i');
        } else if (keyword === "t-shirt") {
          regexPattern = new RegExp(`\\b${keyword}\\b`, 'i');
        } else if (keyword === "shoes") {
          searchConditions.push({
            $or: [
              { title: { $regex: new RegExp("\\bsneakers\\b", 'i') } },
              { title: { $regex: new RegExp("\\bloafers\\b", 'i') } }
            ]
          });
          return;
        } else {
          regexPattern = new RegExp(keyword, 'i');
        }

        if (regexPattern) {
          searchConditions.push({
            $or: [
              { 'variants.color': { $regex: regexPattern } },
              { title: { $regex: regexPattern } },
              { brand: { $regex: regexPattern } },
              { sku: { $regex: regexPattern } },
              { 'variants.size': { $regex: regexPattern } }
            ]
          });
        }
      });

      if (searchConditions.length > 0) {
        query.$and = searchConditions;
      }
    }

    // Handling additional query parameters for filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "search"];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    query = { ...query, ...JSON.parse(queryStr) };

    // Remove redundant size field if it exists
    if (query.size) {
      delete query.size;
    }
    if (query.color) {
      delete query.color;
    }

    // Aggregation pipeline to compute total quantity and sort products
    let sortCriteria = { order: 1, createdAt: -1 }; // Default sorting
    if (req.query.sort) {
      if (req.query.sort === 'title') {
        sortCriteria = { title: 1 }; // Sort by title A to Z
      } else if (req.query.sort === '-title') {
        sortCriteria = { title: -1 }; // Sort by title Z to A
      } else if (req.query.sort === 'price') {
        sortCriteria = { price: 1 }; // Sort by price Low to High
      } else if (req.query.sort === '-price') {
        sortCriteria = { price: -1 }; // Sort by price High to Low
      }
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 28;
    const skip = (page - 1) * limit;

    const totalDocs = await Product.countDocuments(query); // Total matching documents
    const totalPages = Math.ceil(totalDocs / limit); // Total number of pages

    let productQuery = Product.aggregate([
      { $match: query },
      { $addFields: { totalQuantity: { $sum: "$variants.quantity" } } },
      {
        $addFields: {
          isSoldOut: {
            $cond: { if: { $eq: ["$totalQuantity", 0] }, then: 1, else: 0 }
          }
        }
      },
      { $sort: { isSoldOut: 1, ...sortCriteria } },
      { $skip: skip },
      { $limit: limit }
    ]);

    // Optionally add field projection if specified
    if (req.query.fields) {
      const fields = req.query.fields.split(",").reduce((acc, field) => {
        acc[field.trim()] = 1;
        return acc;
      }, {});
      productQuery = productQuery.project(fields);
    }

    // Executing the query
    let products = await productQuery;

    // Sending response
    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalDocs,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



const getAllProductSku = asyncHandler(async (req, res) => {
  try {
    let query = {};

    // Check if a collection name is provided
    if (req.params.collectionName) {
      query.collectionName = req.params.collectionName;

    }

    if (req.query.collectionName === "Men's Denim Jeans") {

      query.$expr = {
        $and: [
          {
            $gte: [
              {
                $convert: {
                  input: {
                    $trim: {
                      input: { $arrayElemAt: [{ $split: ["$sku", "-"] }, 1] },
                      chars: " ", // Remove any leading or trailing spaces
                    },
                  },
                  to: "int", // Convert to integer
                  onError: -1, // Handle errors by assigning -1
                  onNull: -1, // Handle null by assigning -1
                },
              },
              1,
            ],
          },
          {
            $lte: [
              {
                $convert: {
                  input: {
                    $trim: {
                      input: { $arrayElemAt: [{ $split: ["$sku", "-"] }, 1] },
                      chars: " ", // Remove any leading or trailing spaces
                    },
                  },
                  to: "int", // Convert to integer
                  onError: -1, // Handle errors by assigning -1
                  onNull: -1, // Handle null by assigning -1
                },
              },
              30,
            ],
          },
        ],
      };
    }


   if(req.query.collectionName!=="Men's Denim Jeans" && req.query.collectionName!==undefined){
    query.$expr = {
      $and: [
        {
          $gte: [
            {
              $convert: {
                input: {
                  $trim: {
                    input: { $arrayElemAt: [{ $split: ["$sku", "-"] }, 1] },
                    chars: " ", // Remove any leading or trailing spaces
                  },
                },
                to: "int", // Convert to integer
                onError: -1, // Handle errors by assigning -1
                onNull: -1, // Handle null by assigning -1
              },
            },
            1,
          ],
        },
        {
          $lte: [
            {
              $convert: {
                input: {
                  $trim: {
                    input: { $arrayElemAt: [{ $split: ["$sku", "-"] }, 1] },
                    chars: " ", // Remove any leading or trailing spaces
                  },
                },
                to: "int", // Convert to integer
                onError: -1, // Handle errors by assigning -1
                onNull: -1, // Handle null by assigning -1
              },
            },
            100,
          ],
        },
      ],
    };
   }

    // Apply size, color, and brand filters
    if (req.query.size) {
      const sizes = req.query.size.split(',').map(size => size.trim());
      query['variants'] = { 
        $elemMatch: { 
          size: { $in: sizes }, 
          quantity: { $gt: 0 } 
        } 
      };
    }
    if (req.query.color) {
      const colors = req.query.color.split(',').map(color => color.trim());
      query['variants.color'] = { $in: colors.map(color => new RegExp(color, 'i')) };
    }
    if (req.query.brand) {
      const brands = req.query.brand.split(',').map(brand => brand.trim());
      query['brand'] = { $in: brands };
    }
    if (req.query.search) {
      const searchKeywords = req.query.search.toLowerCase().split(' ');

      // Apply SKU limits based on jeans-related searches
      const jeansKeywords = ['jeans', 'men jeans', 'mens jeans', 'jeans for men'];
      const isJeansSearch = searchKeywords.some(keyword => jeansKeywords.includes(keyword));

      if (isJeansSearch) {
        query.$expr = {
          $and: [
            {
              $gte: [
                {
                  $convert: {
                    input: {
                      $trim: {
                        input: { $arrayElemAt: [{ $split: ["$sku", "-"] }, 1] },
                        chars: " ", // Remove any leading or trailing spaces
                      },
                    },
                    to: "int", // Convert to integer
                    onError: -1, // Handle errors by assigning -1
                    onNull: -1, // Handle null by assigning -1
                  },
                },
                1,
              ],
            },
            {
              $lte: [
                {
                  $convert: {
                    input: {
                      $trim: {
                        input: { $arrayElemAt: [{ $split: ["$sku", "-"] }, 1] },
                        chars: " ", // Remove any leading or trailing spaces
                      },
                    },
                    to: "int", // Convert to integer
                    onError: -1, // Handle errors by assigning -1
                    onNull: -1, // Handle null by assigning -1
                  },
                },
                30, // SKU range for jeans-related searches
              ],
            },
          ],
        };
      } else {
        // For other search terms, limit SKUs to 1-100
        query.$expr = {
          $and: [
            {
              $gte: [
                {
                  $convert: {
                    input: {
                      $trim: {
                        input: { $arrayElemAt: [{ $split: ["$sku", "-"] }, 1] },
                        chars: " ", // Remove any leading or trailing spaces
                      },
                    },
                    to: "int", // Convert to integer
                    onError: -1, // Handle errors by assigning -1
                    onNull: -1, // Handle null by assigning -1
                  },
                },
                1,
              ],
            },
            {
              $lte: [
                {
                  $convert: {
                    input: {
                      $trim: {
                        input: { $arrayElemAt: [{ $split: ["$sku", "-"] }, 1] },
                        chars: " ", // Remove any leading or trailing spaces
                      },
                    },
                    to: "int", // Convert to integer
                    onError: -1, // Handle errors by assigning -1
                    onNull: -1, // Handle null by assigning -1
                  },
                },
                100, // SKU range for non-jeans searches
              ],
            },
          ],
        };
      }
    }
    // Handle search conditions
    if (req.query.search) {
      const searchKeywords = req.query.search.toLowerCase().split(' ');
      const searchConditions = [];

      searchKeywords.forEach(keyword => {
        let regexPattern;
        if (keyword === "shirt") {
          regexPattern = new RegExp(`^(?!.*t-shirt).*\\b${keyword}\\b.*$`, 'i');
        } else if (keyword === "shirts") {
          regexPattern = new RegExp(`\\bshirt\\b`, 'i');
        } else if (["tshirt", "tshirts", "t-shirts"].includes(keyword)) {
          regexPattern = new RegExp(`\\bt-shirt\\b`, 'i');
        } else if (keyword === "t-shirt") {
          regexPattern = new RegExp(`\\b${keyword}\\b`, 'i');
        } else if (keyword === "shoes") {
          searchConditions.push({
            $or: [
              { title: { $regex: new RegExp("\\bsneakers\\b", 'i') } },
              { title: { $regex: new RegExp("\\bloafers\\b", 'i') } }
            ]
          });
          return;
        } else {
          regexPattern = new RegExp(keyword, 'i');
        }

        if (regexPattern) {
          searchConditions.push({
            $or: [
              { 'variants.color': { $regex: regexPattern } },
              { title: { $regex: regexPattern } },
              { brand: { $regex: regexPattern } },
              { sku: { $regex: regexPattern }},
              { 'variants.size': { $regex: regexPattern } }
            ]
          });
        }
      });

      if (searchConditions.length > 0) {
        query.$and = searchConditions;
      }
    }

    // Handling additional query parameters for filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "search"];
    excludeFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    query = { ...query, ...JSON.parse(queryStr) };

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 28;
    const skip = (page - 1) * limit;

    const totalDocs = await Product.countDocuments(query); // Total matching documents
    const totalPages = Math.ceil(totalDocs / limit); // Total number of pages

    // Aggregation pipeline to compute total quantity and sort products
    let productQuery = Product.aggregate([
      { $match: query },
      { $addFields: { totalQuantity: { $sum: "$variants.quantity" } } },
      {
        $addFields: {
          isSoldOut: {
            $cond: { if: { $eq: ["$totalQuantity", 0] }, then: 1, else: 0 }
          }
        }
      },
      { $sort: { isSoldOut: 1, createdAt: -1 } }, // Sort by sold-out status, then by creation date
      { $skip: skip },
      { $limit: limit }
    ]);

    // Optionally add field projection if specified
    if (req.query.fields) {
      const fields = req.query.fields.split(",").reduce((acc, field) => {
        acc[field.trim()] = 1;
        return acc;
      }, {});
      productQuery = productQuery.project(fields);
    }

    // Executing the query
    let products = await productQuery;

    // Sending response
    res.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalDocs,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

const reorderProducts = asyncHandler(async (req, res) => {
  const { productIds } = req.body;
  try {
    const updates = productIds.map((id, index) =>
      ({ updateOne: { filter: { _id: id }, update: { $set: { order: index } } } })
    );

    await Product.bulkWrite(updates);

    res.status(200).json({ message: "Products reordered successfully" });
  } catch (error) {
    console.error('Error reordering products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  try {
      const { star, prodId, comment, name, email } = req.body;

      // Update product with new rating and comment
      const rateProduct = await Product.findByIdAndUpdate(
          prodId,
          {
              $push: {
                  ratings: {
                      star: star,
                      name: name,
                      email: email,
                      comment: comment,
                  },
              },
          },
          { new: true }
      );

      // Calculate new average rating for the product
      const product = await Product.findById(prodId);
      const totalRating = product.ratings.length;
      const ratingSum = product.ratings.reduce((prev, curr) => prev + curr.star, 0);
      const averageRating = Math.round(ratingSum / totalRating);

      // Update product with new average rating
      const updatedProduct = await Product.findByIdAndUpdate(
          prodId,
          { totalrating: averageRating },
          { new: true }
      );

      res.json(updatedProduct);
  } catch (error) {
      console.error("Error while updating rating:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});
const getAllRatings = asyncHandler(async (req, res) => {
  try {
    const ratings = await Product.aggregate([
      { $unwind: "$ratings" }, // Deconstruct the ratings array
      { $sort: { "ratings.createdAt": -1 } }, // Sort by createdAt in descending order
      { $limit: 20 }, // Limit to 20 ratings
      {
        $project: {
          productId: "$handle",
          productImages: "$images",
          star: "$ratings.star",
          name: "$ratings.name",
          comment: "$ratings.comment",
        }
      }
    ]);

    res.json(ratings);
  } catch (error) {
    console.error("Error while fetching ratings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  reorderProducts,
  getaProductDashboard,
  getAllRatings,
  getAllProductSku,

};
