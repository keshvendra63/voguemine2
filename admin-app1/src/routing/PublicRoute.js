import {Navigate} from 'react-router-dom'

export const PublicRoute=({children})=>{
    const getTokenFromLocalStorage=JSON.parse(localStorage.getItem("user"))
    return getTokenFromLocalStorage?.token ===undefined ?children: (<Navigate to="/admin" replace={true} />)
}