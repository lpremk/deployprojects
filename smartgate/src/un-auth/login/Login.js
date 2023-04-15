import uoh_logo from '../../assets/images/icons/University_of_Hyderabad_Logo.png';
import { useState } from 'react';
import axios from '../../AxiosInstance';
import properties from '../../properties.json'
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login(){
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    const handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(inputs));
    axios({
        method: 'post',
        url: '/authenticate',
        headers: {
            "Content-Type": "application/json",
        },
        // data:JSON.stringify(myData)
        data:JSON.stringify(inputs)
        })
        .then(function (response) {
            // console.log(response.data);
            localStorage.setItem('jwt',response.data.jwt)
            window.location.href = properties.self_url+"/authenticated";
        })
        .catch(function (error) {
            // console.log(error)
            document.getElementById("loginErrorMessage").innerHTML=`The entered username or password is wrong.`
            localStorage.removeItem('jwt');
        });
    
    }
  return(
    <div>
      <div className="container d-flex justify-content-center">
            
            <div className='commonStyle'>
                <div className='d-flex justify-content-center'>
                    <img src={uoh_logo} style={{"width":"160px","height":"160px","marginBottom":"20px"}} className="" alt="logo" />
                </div>
                <h3 className='text-center heading'>Login Form</h3>
               
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username"
                        name='username'
                        value={inputs.username||""}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div className="mb-3">
                        <label for="passowrd" className="form-label">Password</label>
                        <input type="password" className="form-control" id="passowrd"
                        name='password'
                        value={inputs.password||""}
                        onChange={handleChange}
                        required/>
                    </div>
                    <p id="loginErrorMessage" style={{"color":"red"}} className='text-center'></p>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary submit">Login</button>
                    </div>
                    <NavLink className="nav-link text-primary" to={"/un-auth/login/forgot-password"}>Forgot password ?</NavLink>
                </form>
            </div>
        </div>
    </div>
  );
}