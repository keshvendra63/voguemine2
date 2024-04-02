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

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      const keywords = req.query.search.toLowerCase().split(' ');
      query.$or = [
          { title: { $regex: searchRegex } },
          { sku: { $regex: searchRegex } },
          { 'variants.color': { $in: keywords } },
          { description: { $regex: searchRegex } }
      ];
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
    const limit = parseInt(req.query.limit) || 21;
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
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
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
      console.log(newpath);
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
