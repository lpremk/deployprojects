import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../../index.css'
import './Authenticated.css'
import {  hasRole } from "../../util/JwtUtil";

export default function Authenticated(){

    const[jwt,setJwt]=useState()
    useEffect(()=>{
        let jwt;
        jwt=localStorage.getItem('jwt')
        if(jwt==null){
            setJwt(null)
        }
        else{
            setJwt(jwt)
        }
    },[])
    return(<>
        <div className="container authenticated">
        
        <h4 className="text-center" style={{"backgroundColor":"#e3f2fd"}}>Visitor</h4>
        <div class="row">
        <div class="mb-3 mb-sm-0 d-flex justify-content-center">
            <NavLink className="card custom-card text-decoration-none"  to={"/un-auth/visit/create-visit"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
                <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                    directions_walk
                </span>
                {/* <span  style={{"fontSize":"70px"}} class="material-icons-outlined">
                    follow_the_signs
                </span> */}
                <div style={{"marginTop":"0px"}} className="text-center">Create <br/>New Visit</div>
            </div>
            </NavLink>
        </div>
        </div>
       
        {
        (jwt!=null&&hasRole(jwt,'ROLE_UNIVERSITY_USER')) && 
        <>
        <h4 className="text-center" style={{"backgroundColor":"#e3f2fd"}}>University User</h4>
        <div class="row">
        <div class="mb-3 mb-sm-0 d-flex justify-content-center">
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/visit/read-all-visits-by-authenticated-user-view"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
            <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                person
            </span>
                <div  style={{"marginTop":"13px"}} className="text-center">My Visits</div>
            </div>
            </NavLink>
        </div>
        </div>
        </>
        }

        {
            (jwt!=null&&hasRole(jwt,'ROLE_SECURITY_ADMIN')) && 
        
        <>
        <h4 className="text-center" style={{"backgroundColor":"#e3f2fd"}}>Security Admin</h4>
        <div class="row">
        <div class="mb-3 mb-sm-0" style={{"display":"flex","flexWrap":"wrap","justifyContent":"center"}}>
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/visit/read-all-visits-by-registration-id-view"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
                <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                    badge
                </span>
                <div style={{"marginTop":"-10px"}} className="text-center">Find Visits <br/> By <br/> Registration Id</div>
            </div>
            </NavLink>
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/visit/read-visit-by-visit-id-view"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
                <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                    badge
                </span>
                <div style={{"marginTop":"-14px"}} className="text-center">Find Visits <br/> By <br/> Visit Id</div>
            </div>
            </NavLink>
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/visit/read-all-visits-by-mobile-number-view"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
                <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                    phone_iphone
                </span>
                <div style={{"marginTop":"-13px"}} className="text-center">Find Visits <br/> By <br/> Mobile Number</div>
            </div>
            </NavLink>
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/visit/overall-today-visits"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
                <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                    today
                </span>
                <div style={{"marginTop":"-18px","marginLeft":"21px"}} className="text-center">Overall <br/> Today <br/> Visits</div>
            </div>
            </NavLink>
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/visit/overall-from-to-visits"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
                <div style={{"display":"flex","flexDirection":"column"}}>
                <span style={{"fontSize":"40px"}} class="material-icons-outlined">
                calendar_month
                </span>
                <span style={{"fontSize":"14px","fontWeight":"600","marginLeft":"4px"}}>from</span>
                </div>
                <div style={{"display":"flex","flexDirection":"column"}}>
                <span style={{"fontSize":"40px"}} class="material-icons-outlined">
                calendar_month
                </span>
                <span style={{"fontSize":"14px","fontWeight":"600","marginLeft":"11px"}}>to</span>
                </div>
                <div  style={{"marginTop":"-15px","marginLeft":"10px"}}  className="text-center">Overall <br/> From To <br/> Visits</div>
            </div>
            </NavLink>
        </div>
        </div>
        </>
        }
        {
        (jwt!=null&&hasRole(jwt,'ROLE_EXIT_ADMIN')) && 
        <>
        <h4 className="text-center" style={{"backgroundColor":"#e3f2fd"}}>Exit Admin</h4>
        <div class="row">
        <div class="mb-3 mb-sm-0 d-flex justify-content-center">
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/visit/read-all-visits-by-authenticated-user-view"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
            <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                directions_walk
            </span>
                <div  style={{"marginTop":"13px"}} className="text-center">Create Exit</div>
            </div>
            </NavLink>
        </div>
        </div>
        </>
        }
        {
            (jwt!=null&&hasRole(jwt,'ROLE_APP_ADMIN')) && 
        <>
        <h4 className="text-center" style={{"backgroundColor":"#e3f2fd"}}>App Admin</h4>
        <div class="row">
        <div class="mb-3 mb-sm-0" style={{"display":"flex","flexWrap":"wrap","justifyContent":"center"}}>
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/user/read-user-by-username"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
                <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                    search
                </span>
                <div style={{"marginTop":"10px"}} className="text-center">Find User</div>
            </div>
            </NavLink>
            <NavLink className="card custom-card text-decoration-none"  to={"/auth/user/create-user"}>
            <div class="card-body" style={{"display":"flex","flexWrap":"wrap"}}>
                <span style={{"fontSize":"60px"}} class="material-icons-outlined">
                    app_registration
                </span>
                <div  style={{"marginTop":"12px"}} className="text-center">Register User</div>
            </div>
            </NavLink>
        </div>
        </div>
        </>
        }
         </div>
    </>);
}