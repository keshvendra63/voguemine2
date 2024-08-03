const express = require('express');
const router = express.Router();
const {
    createCollection,
    getAllCollections,
    updateCollection,
    deleteCollection,
    addInnerCollection,
    getInnerCollection,
    updateInnerCollection,
    deleteInnerCollection,
    addBannerImage, 
    addCollectionImage,
    getCollection,
    getaCollection,
    getaInnerCollection
} = require('../controller/chicCollectionCtrl');
const {uploadPhoto } = require("../middlewares/uploadImage");
const multer = require('multer');
const { createChicOrder, getAllOrders, getSingleOrder } = require('../controller/chicCtrl');
const upload = multer({ dest: 'uploads/' });
router.post("/order/createOrder",createChicOrder)
router.get("/getallorders",getAllOrders)
router.get("/getaOrder/:id",getSingleOrder)
router.post('/collections/:id/banner', uploadPhoto.array('images', 1), addBannerImage);
router.post('/collections/:id/:collectionId/images', uploadPhoto.array('images', 1), addCollectionImage);
// Create a new collection
router.post('/collections', async (req, res) => {
    try {
        const collection = await createCollection(req.body);
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/collections/:id', async (req, res) => {
    try {
        const collection = await getCollection(req.params.id);
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/collections/web/:name', async (req, res) => {
    try {
        const collection = await getaCollection(req.params.name);
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Get all collections
router.get('/collections', async (req, res) => {
    try {
        const collections = await getAllCollections();
        res.status(200).json(collections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a collection
router.put('/collections/:id', async (req, res) => {
    try {
        const updatedCollection = await updateCollection(req.params.id, req.body);
        res.status(200).json(updatedCollection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a collection
router.delete('/collections/:id', async (req, res) => {
    try {
        await deleteCollection(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create an inner collection
router.post('/collections/:collectionId/inner', async (req, res) => {
    try {
        const collection = await addInnerCollection(req.params.collectionId, req.body);
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an inner collection
router.get('/collections/:collectionId/inner/:innerId', async (req, res) => {
    try {
        const innerCollection = await getInnerCollection(req.params.collectionId, req.params.innerId);
        res.status(200).json(innerCollection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/collections/web/:name/inner/:url', async (req, res) => {
    try {
        const innerCollection = await getaInnerCollection(req.params.name, req.params.url);
        res.status(200).json(innerCollection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an inner collection
router.put('/collections/:collectionId/inner/:innerId', async (req, res) => {
    try {
        const innerCollection = await updateInnerCollection(req.params.collectionId, req.params.innerId, req.body);
        res.status(200).json(innerCollection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an inner collection
router.delete('/collections/:collectionId/inner/:innerId', async (req, res) => {
    try {
        await deleteInnerCollection(req.params.collectionId, req.params.innerId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;