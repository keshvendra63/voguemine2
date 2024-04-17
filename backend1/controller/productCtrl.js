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
    let query ={};

    // Check if a collection name is provided
    if (req.params.collectionName) {
      query = { collectionName: req.params.collectionName};
    }
    if (req.query.size) {
      query['variants.size'] = { $eq: req.query.size }; // Ensure exact match for size
    }


    if (req.query.search) {
      const searchKeywords = req.query.search.toLowerCase().split(' ');
      const searchConditions = [];

      // Add conditions for each search keyword
      searchKeywords.forEach(keyword => {
        searchConditions.push({
          $or: [
            { category:keyword }, // Match category based on keyword
            { 'variants.color': { $in: [keyword] } }, // Match color based on keyword
            { title: { $regex: new RegExp(keyword, 'i') } }, // Match title based on keyword
            { brand: { $regex: new RegExp(keyword, 'i') } }, // Match brand based on keyword
            { sku:keyword }, // Match sku based on keyword
            { 'variants.size': { $in: [keyword] } } // Match size based on keyword
          ]
        });
      });

      query.$and = searchConditions; // Ensure all search conditions are met
    }


    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields","search"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const filter = JSON.parse(queryStr);

    query = { ...query, ...filter };

    // Querying products based on collection name and filters
    let productQuery = Product.find(query);

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      productQuery = productQuery.sort(sortBy);
    } else {
      productQuery = productQuery.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      productQuery = productQuery.select(fields);
    } else {
      productQuery = productQuery.select("-__v");
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 28;
    const skip = (page - 1) * limit;
    productQuery = productQuery.skip(skip).limit(limit);

    // Executing the query
    let products = await productQuery;

    // Move products with quantity 0 to the end
    products.sort((a, b) => {
      const sumQuantityA = a.variants.reduce((acc, variant) => acc + variant.quantity, 0);
      const sumQuantityB = b.variants.reduce((acc, variant) => acc + variant.quantity, 0);
      if (sumQuantityA === 0 && sumQuantityB !== 0) return 1;
      if (sumQuantityA !== 0 && sumQuantityB === 0) return -1;
      return 0;
    });

    // Sending response
    res.json(products);
  } catch (error) {
    throw new Error(error);
  }
});
const reorderProducts = asyncHandler(async (req, res) => {
  const { productIds } = req.body;
  try {
    // Update the order of products in the database
    for (let i = 0; i < productIds.length; i++) {
      await Product.findByIdAndUpdate(productIds[i], { order: i });
    }
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
  getaProductDashboard
};
