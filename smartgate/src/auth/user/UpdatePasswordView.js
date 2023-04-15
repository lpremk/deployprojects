import { useState } from "react";
import axios from "../../AxiosInstance";


export default function UpdatePasswordView(){
    const [inputs, setInputs] = useState({});
    
    const handleChange = (event) => {
        // console.log('handle change called')
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    const handleSubmit=(e)=>{
        e.preventDefault();
        // console.log(JSON.stringify(inputs));
        axios({
            method: 'post',
            url: '/user/update-password',
            data:JSON.stringify(inputs)
             }).then(function (response) {
            // console.log(response.data);
            document.getElementById("changePasswordFormId").innerHTML=
            '<h4 style="color:green;border:2px solid green;font-size:25px;padding:20px;font-weight:400;text-align:center;">'
            +response.data.message+'</h4>';
            })
            .catch(function (error) {
                document.getElementById("changePasswordFormId").innerHTML=
                '<h4 style="color:red;border:2px solid red;font-size:25px;padding:20px;font-weight:400;text-align:center;">'
                +error.response.data.message+'</h4>';
                // console.log(error.response.data.message);
            }); 
    }
    return(<>
    <div className="container d-flex justify-content-center">
        <form onSubmit={handleSubmit} style={{"maxWidth":"400px"}} id="changePasswordFormId">
            <div id="changePasswordError"></div>
            <div className="mb-3">
                <label for="oldPassword" className="form-label">Old Password</label>
                <input type="password" className="form-control" id="oldPassword"
                name='oldPassword'
                value={inputs.oldPassword||""}
                onChange={handleChange}
                required
                />
            </div>
            <div className="mb-3">
                <label for="newPassword" className="form-label">New Password</label>
                <input type="password" className="form-control" id="newPassword"
                name='newPassword'
                value={inputs.newPassword||""}
                onChange={handleChange}
                required
                />
            </div>
            <div className="mb-3">
                <label for="confirmedNewPassword" className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" id="confirmedNewPassword"
                name='confirmedNewPassword'
                value={inputs.confirmedNewPassword||""}
                onChange={handleChange}
                required
                />
            </div>
            <div className='d-flex justify-content-center'>
                <button type="submit" className="btn btn-primary submit">
                    Submit
                </button>
            </div>
        </form>
        </div>
    </>);
}