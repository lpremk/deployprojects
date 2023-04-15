import {  useNavigate } from "react-router-dom"
import { useEffect } from "react";

export default function UnAuthenticated(){
    const navigate=useNavigate()
    useEffect(()=>{
        let jwt;
        jwt=localStorage.getItem("jwt")
        // alert(jwt)
        if(jwt==null){
            //do nothing
        }
        else{
            navigate("/authenticated")
        }
    })
    return (<>
    <div className="container">
            <p className="text-center">This is UnAuthenticated Home page</p>
    </div>
    </>);
}