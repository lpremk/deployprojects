import { NavLink } from "react-router-dom";

export default function UnAuthNavbar(){
    return(<>
        <nav class="navbar navbar-expand-lg bg-light container-fluid">
            <div class="container">
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <NavLink className="nav-link active" aria-current="page" to={"/"}>Home</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink className="nav-link" to={"/un-auth/visit/create-visit"}>New Visit</NavLink>
                    </li>
                    {/* <li class="nav-item">
                        <NavLink className="nav-link" to={"/un-auth/login/reset-password"}>Reset Password</NavLink>
                    </li> */}
                </ul>
                    <div class="nav-item">
                        <NavLink className="nav-link" to={"/un-auth/login/login"}>Login</NavLink>
                    </div>
                </div>
            </div>
            </nav>
    </>);
}