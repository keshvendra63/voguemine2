const Collection = require("../models/collectionModel");
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
    const getallCollection = await Collection.find();
    res.json(getallCollection);
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
};