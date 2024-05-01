const Banner = require("../models/bannerModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createBanner = asyncHandler(async (req, res) => {
  try {
    const newBanner = await Banner.create(req.body);
    res.json(newBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const getBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBanner = await Banner.findById(id);
    res.json(getaBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBanner = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBanner = await Banner.findByIdAndDelete(id);
    res.json(deleteBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const getallBanners = asyncHandler(async (req, res) => {
  try {
    const getallBanner = await Banner.find();
    res.json(getallBanner);
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
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBanner = await Banner.findByIdAndUpdate(
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
    res.json(findBanner);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getallBanners,
  uploadImages,
  getBanner
};
