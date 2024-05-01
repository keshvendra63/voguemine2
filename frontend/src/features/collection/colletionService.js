import axios from 'axios'
import {base_url, config} from '../../utils/axiosConfig'

const getCollection=async()=>{
    
    const response =await axios.get(`${base_url}collection`)


        if (response.data) {
            return response.data;
        }
}
const getaCollection=async(data)=>{
    
    const response =await axios.get(`${base_url}collection/web/${data}`)


        if (response.data) {
            return response.data;
        }
}
export const collectionService={
    getCollection,
    getaCollection
}