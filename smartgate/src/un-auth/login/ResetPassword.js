import { useEffect, useState } from "react";
import axios from 'axios';
import properties from '../../properties.json'

let newPassword=""
let confirmedNewPassword=""
export default function ResetPassword(){
    const [inputs, setInputs] = useState({});
    // const [firstLoad,setFirstLoad]=useState(0)
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        if(name=='newPassword'){
            newPassword=value; 
        }
        if(name=='confirmedNewPassword'){
            confirmedNewPassword=value
        }
        validateNewAndConfirmNewPasswordsEquality()
      }
      function validateNewAndConfirmNewPasswordsEquality(){
        if(newPassword=="" || confirmedNewPassword==""){
            document.getElementById("resetPasswordError").innerHTML=`<p style="color:red;">* Passwords should not empty</p>`;
        }
        else{
            if(newPassword==confirmedNewPassword){
                document.getElementById("resetPasswordError").innerHTML=`<p style="color:green;">* Passwords matched</p>`;
            }
            if(newPassword!=confirmedNewPassword){
                document.getElementById("resetPasswordError").innerHTML=`<p style="color:red;">* New and Confirm Passwords are not matched</p>`;
            }
        }
      }
      function validateNewAndConfirmNewPasswordsEquality_BeforeSubmit(){
        if(newPassword=="" || confirmedNewPassword==""){
            throw new Error()
        }
        else{
            if(newPassword==confirmedNewPassword){
            }
            if(newPassword!=confirmedNewPassword){
                throw new Error();
            }
        }
      }

    function validatePassword_BeforeSubmit(inputtxt) 
        { 
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(inputtxt.match(passw)) 
        { 
            document.getElementById("strongPasswordError").innerHTML=`<p style="color:green;">* Password is strong</p>`;
        }
        else
        {  
            document.getElementById("strongPasswordError").innerHTML=`<p style="color:red;">
            * Weak password. 
            <br/>Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.
            </p>`;
            throw new Error();
        }
    }

    const handleSubmit = (event) => {
    event.preventDefault();
    validateNewAndConfirmNewPasswordsEquality_BeforeSubmit()
    validatePassword_BeforeSubmit(inputs.newPassword) 
    console.log('submit called')
    const url = new URL(window.location.toLocaleString());
    const urlParams=url.searchParams;
    const passwordResetId=urlParams.get('passwordResetId');
    inputs.id=passwordResetId;

    console.log(JSON.stringify(inputs));
    axios({
        method: 'post',
        url: properties.backend_url+'/user/reset-password',
        headers: {
            "Content-Type": "application/json",
        },
        data:JSON.stringify(inputs)
        })
        .then(function (response) {
            console.log(response.data);
            document.getElementById("passwordResetPage").innerHTML=
            `<p style="color:green;font-size: 20px;">${response.data.message}</p>`
            
        })
        .catch(function (error) {   
            // console.log(error)
            document.getElementById("passwordResetPage").innerHTML=
            `<p style="color:red;font-size: 20px;">${error.response.data.message}</p>`
        });
    
    }
    return(<>

    <div className="container d-flex justify-content-center">
            <div id="passwordResetPage" className='commonStyle'>
                {/* {firstLoad} */}
                <h3 className='text-center heading'>Password Reset Form</h3>
                <p className="text-center">Please provide your new password to reset.</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="newPassword" className="form-label">New Password</label>
                        <input type="password" className="form-control" id="newPassword"
                        name='newPassword'
                        value={inputs.newPassword||""}
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label for="confirmedNewPassword" className="form-label">Confirm New Password</label>
                        <input type="password" className="form-control" id="confirmedNewPassword"
                        name='confirmedNewPassword'
                        value={inputs.confirmedNewPassword||""}
                        onChange={handleChange}/>
                    </div>
                    <div id="strongPasswordError"></div>
                    <div id="resetPasswordError"></div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>);
}