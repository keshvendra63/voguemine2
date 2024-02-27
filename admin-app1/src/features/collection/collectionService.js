import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCollections = async () => {
  const response = await axios.get(`${base_url}collection/`);

  return response.data;
};
const createCollection = async (collection) => {
  const response = await axios.post(`${base_url}collection/`, collection, config);

  return response.data;
};

const updateCollection = async (collection) => {
  const response = await axios.put(
    `${base_url}collection/${collection.id}`,
    { title: collection.collectionData.title },
    config
  );

  return response.data;
};
const getCollection = async (id) => {
  const response = await axios.get(`${base_url}collection/${id}`, config);

  return response.data;
};

const deleteCollection = async (id) => {
  const response = await axios.delete(`${base_url}collection/${id}`, config);

  return response.data;
};
const collectionService = {
  getCollections,
  createCollection,
  updateCollection,
  getCollection,
  deleteCollection,
};

export default collectionService;
