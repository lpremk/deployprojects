import { useState } from "react";
import axios from '../../AxiosInstance';

export default function ForgotPassword(){
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
    const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("forgotPasswordLoading").innerHTML=`
    <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>
    `
    console.log(JSON.stringify(inputs));
    axios({
        method: 'post',
        url: '/user/forgot-password',
        headers: {
            "Content-Type": "application/json",
        },
        // data:JSON.stringify(myData)
        data:JSON.stringify(inputs)
        })
        .then(function (response) {
            console.log(response.data);
            document.getElementById("forgotPasswordId").innerHTML=
            '<h4 style="color:green;border:2px solid green;font-size:25px;padding:20px;font-weight:400;text-align:center;">'
            +response.data.message+'</h4>';
        })
        .catch(function (error) {
            console.log(error)
            document.getElementById("forgotPasswordError").innerHTML=
            '<h4 style="color:red;font-size:20px;padding:15px;font-weight:400;text-align:center;">'
            +error.response.data.message+'</h4>';
            document.getElementById("forgotPasswordLoading").innerHTML=''
        });
    
    }
    return(<>
        <div className="container">
            <div id="forgotPasswordId">

            <h4 className="text-center heading">Forgot Password</h4>
            <br/>
            <p className="text-center">Please provide the registration id to generate password reset link. 
            <br/> The reset link will be send to your mail Id which is associated with the registration Id.</p>
            <br/> 
            <div className=" d-flex justify-content-center">
                <form onSubmit={handleSubmit} style={{"maxWidth":"250px"}}>
                <div className="mb-3">
                            <label for="username" className="form-label" style={{'paddingLeft':"70px"}}>Registration Id:</label>
                            <input type="text" className="form-control" id="username"
                            name='username'
                            value={inputs.username||""}
                            onChange={handleChange}/>
                </div>
                <div id="forgotPasswordError"></div>
                <br/>
                <div className='d-flex justify-content-center'>
                    <button type="submit" className="btn btn-primary submit">Submit
                    <div id="forgotPasswordLoading"></div>
                    </button>
                </div>
                <br/>
                </form>
            </div>

            </div>
        </div>
    </>);
}