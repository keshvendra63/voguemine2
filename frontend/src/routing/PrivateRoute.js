import {toast} from 'react-toastify'

export const PublicRoute=({children})=>{
    const getTokenFromLocalStorage=JSON.parse(localStorage.getItem("customer"))
    return getTokenFromLocalStorage?.token !==undefined ?children: (toast.error("Please Login "))
}