const ChicCollection=require('../models/chicCollection')
const asyncHandler = require("express-async-handler");


const createCollection = async (data) => {
    try {
        const newCollection = new ChicCollection(data);
        await newCollection.save();
        return newCollection;
    } catch (error) {
        throw new Error(`Error creating collection: ${error.message}`);
    }
};

const getCollection=async(id)=>{
  try{
    const collection=ChicCollection.findById(id)
    return collection
  }
  catch(error){
    console.log(error)
  }
}
const getaCollection = asyncHandler(async (name) => {
  try {
    const findCollection = await ChicCollection.findOne({name:name})
    return findCollection
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCollections = async () => {
    try {
        const collections = await ChicCollection.find();
        return collections;
    } catch (error) {
        throw new Error(`Error fetching collections: ${error.message}`);
    }
};
const updateCollection = async (id, data) => {
    try {
        const updatedCollection = await ChicCollection.findByIdAndUpdate(id, data, { new: true });
        return updatedCollection;
    } catch (error) {
        throw new Error(`Error updating collection: ${error.message}`);
    }
};
const deleteCollection = async (id) => {
    try {
        await ChicCollection.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(`Error deleting collection: ${error.message}`);
    }
};


const addInnerCollection = async (collectionId, innerCollectionData) => {
    try {
        const collection = await ChicCollection.findById(collectionId);
        collection.collections.push(innerCollectionData);
        await collection.save();
        return collection;
    } catch (error) {
        throw new Error(`Error adding inner collection: ${error.message}`);
    }
};

const getInnerCollection = async (collectionId, innerCollectionId) => {
    try {
        const collection = await ChicCollection.findById(collectionId);
        const innerCollection = collection.collections.id(innerCollectionId);
        return innerCollection;
    } catch (error) {
        throw new Error(`Error fetching inner collection: ${error.message}`);
    }
};
const getaInnerCollection = asyncHandler(async (name,url) => {
  try {
    const findCollection = await ChicCollection.findOne({ name: name });

    if (!findCollection) {
      throw new Error("Collection not found");
    }

    // Find the specific inner collection by URL
    const innerCollection = findCollection.collections.find(col => col.url === url);

    if (!innerCollection) {
      throw new Error("Inner collection not found");
    }

    return innerCollection;
  } catch (error) {
    throw new Error(error.message);
  }
});

const updateInnerCollection = async (collectionId, innerCollectionId, innerCollectionData) => {
    try {
        const collection = await ChicCollection.findById(collectionId);
        const innerCollection = collection.collections.id(innerCollectionId);
        Object.assign(innerCollection, innerCollectionData);
        await collection.save();
        return innerCollection;
    } catch (error) {
        throw new Error(`Error updating inner collection: ${error.message}`);
    }
};
const deleteInnerCollection = async (collectionId, innerCollectionId) => {
    try {
        const collection = await ChicCollection.findById(collectionId);
        collection.collections.id(innerCollectionId).remove();
        await collection.save();
    } catch (error) {
        throw new Error(`Error deleting inner collection: ${error.message}`);
    }
};

const addBannerImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const uploader = (path) => cloudinaryUploadImg(path, 'images');
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const updatedCollection = await ChicCollection.findByIdAndUpdate(
        id,
        {
          banner: urls.map((file) => file.url),
        },
        {
          new: true,
        }
      );
      res.json(updatedCollection);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  const addCollectionImage = asyncHandler(async (req, res) => {
    const { id, collectionId } = req.params;
    validateMongoDbId(id);
    validateMongoDbId(collectionId);
    try {
      const uploader = (path) => cloudinaryUploadImg(path, 'images');
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const collection = await ChicCollection.findOneAndUpdate(
        { _id: id, 'collections._id': collectionId },
        {
          $push: { 'collections.$.img': urls.map((file) => file.url) },
        },
        {
          new: true,
        }
      );
      res.json(collection);
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports={
    createCollection,
    updateCollection,
    deleteCollection,
    getAllCollections,
    addInnerCollection,
    updateInnerCollection,
    deleteInnerCollection,
    getInnerCollection,
    addBannerImage,
    addCollectionImage,
    getCollection,
    getaCollection,
    getaInnerCollection
}