import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import properties from "../../properties.json"
import { getPayloadFromJwtToken, hasRole } from "../../util/JwtUtil";
import './AuthNavbar.css'
import uoh_logo from '../../assets/images/icons/University_of_Hyderabad_Logo.png'

export default function AuthNavbar(){
    const[authenticated,setAuthenticated]=useState(false);
    const[jwt,setJwt]=useState()
    useEffect(()=>{
        let jwt;
        jwt=localStorage.getItem('jwt')
        if(jwt==null){
            setAuthenticated(false)
            setJwt(null)
        }
        else{
            setAuthenticated(true)
            setJwt(jwt)
        }
    },[])
    return(<>
        <nav class="auth-navbar navbar navbar-expand-lg container-fluid" style={{"backgroundColor":"#e3f2fd"}}>
            <div class="container">
                <NavLink className="navbar-brand" aria-current="page" to={"/authenticated"}>
                    <img style={{"width":"36px","height":"36px"}} src={uoh_logo} />
                    </NavLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                        <NavLink className="nav-link" aria-current="page" to={"/authenticated"}>Home</NavLink>
                </li>
                {/* <li class="nav-item">
                        <NavLink className="nav-link" to={"/un-auth/visit/create-visit"}>New Visit</NavLink>
                    </li> */}
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Visitor
                    </a>
                    <ul class="dropdown-menu">
                        <li><NavLink class="dropdown-item" to={"/un-auth/visit/create-visit"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                app_registration
                                </span> &nbsp;&nbsp;
                                <div>Create Visit</div>
                            </div>
                            </NavLink></li>
                    </ul>
                </li>
                {
                (jwt!=null&&hasRole(jwt,'ROLE_UNIVERSITY_USER')) && 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        University User
                    </a>
                    <ul class="dropdown-menu">
                        <li><NavLink class="dropdown-item" to={"/auth/visit/read-all-visits-by-authenticated-user-view"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                person
                                </span> &nbsp;&nbsp;
                                <div>My Visits</div>
                            </div>
                            </NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/exit/create-exit"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                app_registration
                                </span> &nbsp;&nbsp;
                                <div>Create Exit</div>
                            </div>
                            </NavLink></li>
                    </ul>
                </li>
                }
                {
                (jwt!=null&&hasRole(jwt,'ROLE_SECURITY_ADMIN')) && 

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Security Admin
                    </a>
                    <ul class="dropdown-menu">                 
                        <li><NavLink class="dropdown-item nav-link" to={"/auth/visit/read-all-visits-by-registration-id-view"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex justify-content-start">
                                <span class="material-icons-outlined">
                                badge
                                </span> &nbsp;&nbsp;
                                <div> Find Visits By Registration Id</div>
                            </div>
                            </NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/visit/read-visit-by-visit-id-view"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex justify-content-start">
                                <span class="material-icons-outlined">
                                badge
                                </span> &nbsp;&nbsp;
                                <div> Find Visit By Visit Id</div>
                            </div>
                            </NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/visit/read-all-visits-by-mobile-number-view"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex justify-content-start">
                                <span class="material-icons-outlined">
                                phone_iphone
                                </span> &nbsp;&nbsp;
                                <div>Find Visits By Mobile Number</div>
                            </div>
                            </NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/visit/overall-today-visits"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex justify-content-start">
                                <span class="material-icons-outlined">
                                today
                                </span> &nbsp;&nbsp;
                                <div>Overall Today Visits</div>
                            </div>
                            </NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/visit/overall-from-to-visits"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex justify-content-start">
                                <span class="material-icons-outlined">
                                calendar_month
                                </span> 
                                <span class="material-icons-outlined">
                                calendar_month
                                </span>
                                &nbsp;&nbsp;
                                <div>Overall From To Visits</div>
                            </div>
                            </NavLink></li>
                    </ul>
                </li>
                }

{
                (jwt!=null&&hasRole(jwt,'ROLE_EXIT_ADMIN')) && 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Exit Admin
                    </a>
                    <ul class="dropdown-menu">
                       
                        <li><NavLink class="dropdown-item" to={"/auth/exit/read-all-exits-by-registration-id-view"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div style={{"display":"inline-block !important"}} className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                badge
                                </span> &nbsp;&nbsp;
                                <span>Find Exits by Registration Id</span>
                            </div>
                            </NavLink></li>
                    </ul>
                 
                </li>
                }
                
                {
                (jwt!=null&&hasRole(jwt,'ROLE_APP_ADMIN')) && 
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        App Admin
                    </a>
                    <ul class="dropdown-menu">
                        <li><NavLink class="dropdown-item" to={"/auth/user/read-user-by-username"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                search
                                </span> &nbsp;&nbsp;
                                <div>Find User</div>
                            </div>
                            </NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/user/create-user"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                app_registration
                                </span> &nbsp;&nbsp;
                                <div>Register User</div>
                            </div>
                            </NavLink></li>
                    </ul>
                </li>
                }
                   
                </ul>
                <ul class="navbar-nav mb-2 mb-lg-0 d-flex">
                <li class="nav-item dropdown">
                    <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div style={{"display":"flex"}}>
                            <div>Logged In as : &nbsp;
                                {authenticated && <span style={{"color":"#2aa33e"}}>{JSON.parse(getPayloadFromJwtToken(jwt)).sub}</span>}
                                 &nbsp;&nbsp;&nbsp;</div>
                            <div> 
                                <span class="material-icons-outlined">
                                account_circle
                                </span>
                            </div> 
                        </div>
                    </a>
                    <ul class="dropdown-menu">
                        <li><NavLink class="dropdown-item" to={"/auth/user/read-user-authenticated-view"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                person
                                </span> &nbsp;&nbsp;
                                <div>My Profile</div>
                            </div>
                            </NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/user/update-password-view"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}>
                            <div className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                password
                                </span> &nbsp;&nbsp;
                                <div>Change Password</div>
                            </div>
                            </NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/user/create-user"} 
                        style={{"whiteSpace":"nowrap","textDecoration":"none"}}
                            onClick={()=>{
                                localStorage.removeItem('jwt')
                                window.location.href = properties.self_url+"/un-auth/login/login";
                            }}>
                             <div className="custom-text-wrapper d-flex flex-wrap">
                                <span class="material-icons-outlined">
                                logout
                                </span> &nbsp;&nbsp;
                                <div>Sign Out</div>
                            </div>
                            </NavLink></li>
                    </ul>
                </li>
                </ul>
                </div>
            </div>
            </nav>
    </>);
}