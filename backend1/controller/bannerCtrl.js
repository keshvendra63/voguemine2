const Banner = require("../models/bannerModel");
const Banner1 = require("../models/bannerModel1");
const Banner2 = require("../models/bannerModel2");

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
const createBanner1 = asyncHandler(async (req, res) => {
  try {
    const newBanner = await Banner1.create(req.body);
    res.json(newBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBanner1 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBanner = await Banner1.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const getBanner1 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBanner = await Banner1.findById(id);
    res.json(getaBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBanner1 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBanner = await Banner1.findByIdAndDelete(id);
    res.json(deleteBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const getallBanners1 = asyncHandler(async (req, res) => {
  try {
    const getallBanner = await Banner1.find();
    res.json(getallBanner);
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
    const findBanner = await Banner1.findByIdAndUpdate(
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
const createBanner2 = asyncHandler(async (req, res) => {
  try {
    const newBanner = await Banner2.create(req.body);
    res.json(newBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBanner2 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBanner = await Banner2.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const getBanner2 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBanner = await Banner2.findById(id);
    res.json(getaBanner);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBanner2 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBanner = await Banner2.findByIdAndDelete(id);
    res.json(deleteBanner);
  } catch (error) {
    throw new Error(error);
  }
});

const getallBanners2 = asyncHandler(async (req, res) => {
  try {
    const getallBanner = await Banner2.find();
    res.json(getallBanner);
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
    const findBanner = await Banner2.findByIdAndUpdate(
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
  getBanner,
  createBanner1,
  updateBanner1,
  deleteBanner1,
  getallBanners1,
  uploadImages1,
  getBanner1,
  createBanner2,
  updateBanner2,
  deleteBanner2,
  getallBanners2,
  uploadImages2,
  getBanner2
};
