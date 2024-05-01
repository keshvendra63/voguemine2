import axios from 'axios'
import {base_url, config} from '../../utils/axiosConfig'

const getBanner=async()=>{
    
    const response =await axios.get(`${base_url}banner`)


        if (response.data) {
            return response.data;
        }
}

export const bannerService={
    getBanner,
}