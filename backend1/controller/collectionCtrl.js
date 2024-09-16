const Collection = require("../models/collectionModel");
const Collection1 = require("../models/collectionModel1");
const Collection2 = require("../models/collectionModel2");
const Product =require("../models/productModel")

const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCollection = asyncHandler(async (req, res) => {
  try {
    const newCollection = await Collection.create(req.body);
    res.json(newCollection);
  } catch (error) {
    throw new Error(error);
  }
});

const getaCollection = asyncHandler(async (req, res) => {
  try {
    const findCollection = await Collection.findOne({handle:req.params.handle})
    if (!findCollection) {
      return res.status(404).json({ error: 'Collection not found' });
    }
    res.json(findCollection);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCollection = await Collection.findByIdAndDelete(id);
    res.json(deletedCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const getCollection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCollection = await Collection.findById(id);
    res.json(getaCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCollection = asyncHandler(async (req, res) => {
  try {
    const collections = await Collection.find();

    // Using Promise.all to fetch the product count for each collection in parallel
    const collectionsWithProductCount = await Promise.all(
      collections.map(async (collection) => {
        // Count products belonging to the current collection using collectionName field
        const productCount = await Product.countDocuments({ collectionName: collection.title });
        return {
          ...collection.toObject(), // Convert Mongoose document to plain JavaScript object
          productCount
        };
      })
    );

    res.json(collectionsWithProductCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    const findCollection = await Collection.findByIdAndUpdate(
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
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const createCollection1 = asyncHandler(async (req, res) => {
  try {
    const newCollection = await Collection1.create(req.body);
    res.json(newCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const getaCollection1 = asyncHandler(async (req, res) => {
  try {
    const findCollection = await Collection1.findOne({handle:req.params.handle})
    res.json(findCollection);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCollection1 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCollection = await Collection1.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCollection1 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCollection = await Collection1.findByIdAndDelete(id);
    res.json(deletedCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const getCollection1 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCollection = await Collection1.findById(id);
    res.json(getaCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCollection1 = asyncHandler(async (req, res) => {
  try {
    const getallCollection = await Collection1.find();
    res.json(getallCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const uploadImages1 = asyncHandler(async (req, res) => {
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
    const findCollection = await Collection1.findByIdAndUpdate(
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
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const createCollection2 = asyncHandler(async (req, res) => {
  try {
    const newCollection = await Collection2.create(req.body);
    res.json(newCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const getaCollection2 = asyncHandler(async (req, res) => {
  try {
    const findCollection = await Collection2.findOne({handle:req.params.handle})
    res.json(findCollection);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCollection2 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCollection = await Collection2.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCollection2 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCollection = await Collection2.findByIdAndDelete(id);
    res.json(deletedCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const getCollection2 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCollection = await Collection2.findById(id);
    res.json(getaCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const getallCollection2 = asyncHandler(async (req, res) => {
  try {
    const getallCollection = await Collection2.find();
    res.json(getallCollection);
  } catch (error) {
    throw new Error(error);
  }
});
const uploadImages2 = asyncHandler(async (req, res) => {
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
    const findCollection = await Collection2.findByIdAndUpdate(
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
    res.json(findBlog);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCollection,
  updateCollection,
  deleteCollection,
  getCollection,
  getallCollection,
  uploadImages,
  getaCollection,
  createCollection1,
  updateCollection1,
  deleteCollection1,
  getCollection1,
  getallCollection1,
  uploadImages1,
  getaCollection1,
  createCollection2,
  updateCollection2,
  deleteCollection2,
  getCollection2,
  getallCollection2,
  uploadImages2,
  getaCollection2,
};
