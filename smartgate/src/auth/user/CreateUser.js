import styles from "./CreateUser.module.css"
import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import axios from '../../AxiosInstance';
import { validateEmail } from '../../util/ValidationUtil';

function CreateUser(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    //current page value should be create or update
    const [currentPage,setCurrentPage]=useState("create")
    const [firstTimeLoad,setFirstTimeLoad]=useState(true)


    useEffect(()=>{

        /*This form is directly without any props loaded for creating user (i.e. props.inputs is undefined)
          While updating user it is loaded with props that is inputs (i.e. props.inputs is not undefined)*/

        if(props.inputs==undefined && firstTimeLoad==true){
            //do nothing
            // console.log('i am undefined')
            setFirstTimeLoad(false)
            setCurrentPage("create")
            axios({
                method: 'get',
                url: '/role/read-all',
                 })
                 .then(function (response) {
                // console.log(response.data);
                generateRolesInForm(response.data);
                })
                .catch(function (error) {
                // console.log(error);
                }); 
        }
        if(props.inputs!=undefined && firstTimeLoad==true){
            setFirstTimeLoad(false)
            setInputs(props.inputs)
            // console.log('i am not undefined'+JSON.stringify(props.inputs))
            setCurrentPage("update")
            // console.log('useeffect update condition called')
            generateRolesInUpdateForm(props.inputs.roles)
        }
    })

    const handleChange = (event) => {
        // console.log('handle change called')
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
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

    function getPrettifiedRoleName(name){
        let result=name;
        result=result.slice(5)
        let resultArr=result.split('_')
        let resultFinal=""
        for(let i=0;i<resultArr.length;i++){
            // resultFinal+=resultArr[i]+' '
            if(i==resultArr.length-1){
                resultFinal+=getPrettify(resultArr[i])
            }
            else{
                resultFinal+=getPrettify(resultArr[i])+' '
            }
        }
        /*here below function will do captilialize the first letter 
          and remaining letters will be lower case
        */
        function getPrettify(word){
            word=word.toLowerCase();
            word=word.charAt(0).toUpperCase() + word.slice(1);
            return word;
        }
        return resultFinal;
    }

    function generateRolesInUpdateForm(roles){
        let rolesPartOfForm=document.getElementById("rolesPartOfForm");
        /*because useEffect function is calling two times while loading.
          before creating child elements empty the before child elements.*/
        rolesPartOfForm.innerHTML=""
        let htmlString=''
        for(let i=0;i<roles.length;i++){
            if(roles[i].added){
                htmlString+=
                `<div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" name='${roles[i].name}' id='${roles[i].name}' checked/>
                    <label class="form-check-label" for="${roles[i].name}">${getPrettifiedRoleName(roles[i].name)}</label>
                </div>`
            }
            else{
                htmlString+=
                `<div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" name='${roles[i].name}' id='${roles[i].name}'/>
                    <label class="form-check-label" for="${roles[i].name}">${getPrettifiedRoleName(roles[i].name)}</label>
                </div>`
            }
           
        }
        rolesPartOfForm.innerHTML=htmlString
    }

    function generateRolesInForm(roles){
        let rolesPartOfForm=document.getElementById("rolesPartOfForm");
        /*because useEffect function is calling two times while loading.
          before creating child elements empty the before child elements.*/
        rolesPartOfForm.innerHTML=""
        let htmlString=''
        for(let i=0;i<roles.length;i++){
            htmlString+=
            `<div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" name='${roles[i].name}' id='${roles[i].name}'/>
                <label class="form-check-label" for="${roles[i].name}">${getPrettifiedRoleName(roles[i].name)}</label>
            </div>`
        }
        rolesPartOfForm.innerHTML=htmlString
    }

    function getUserObjFromForm(){
        let userObj={"roles":[]}
        const myInputs = document.getElementById("saveUserForm").elements;
        for (let i = 0; i < myInputs.length; i++) {
            if (myInputs[i].nodeName === "INPUT" && 
            (myInputs[i].type === "text"
            ||myInputs[i].type === "email"
            ||myInputs[i].type === "number"
            ||myInputs[i].type === "password"
            ||myInputs[i].type === "date"
            )) {
                userObj[myInputs[i].name]=myInputs[i].value 
            }
            if (myInputs[i].nodeName === "INPUT" && myInputs[i].type === "checkbox") {
                if(myInputs[i].checked){
                    userObj.roles.push({"name":myInputs[i].name})
                }
            }
        }
        return userObj;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        validateEmail(inputs.emailId,"emailIdError") 
        // getFormData()
        if(currentPage=="create"){
            validatePassword_BeforeSubmit(inputs.password)
            // let inputsStr=JSON.stringify(inputs);
            // console.log(inputsStr)
            let userObj=getUserObjFromForm();
            // console.log(userObj)
            axios.post('/user/create', JSON.stringify(userObj))
              .then(function (response) {
                // console.log(response);
                    if(response.data.created==="true"){
                    navigate("/util/success", { state: response.data });
                }
                if(response.data.created==="false"){
                    navigate("/util/failure", { state: response.data });
                }
              })
              .catch(function (error) {
                // console.log(error);
              });
        }
        if(currentPage=="update"){
            let userObj=getUserObjFromForm();
            axios({
                method: 'post',
                url: '/user/update',
                data:JSON.stringify(userObj),
              })
              .then(function (response) {
                // console.log(response.data);
                if(response.data.updated==true){
                    document.getElementById("createOrUpdateForm").innerHTML=
                    `<h6 class="text-success">User details updated successfully.</h6>`
                }
                if(response.data.updated==false){
                    document.getElementById("createOrUpdateForm").innerHTML=
                    `<h6 class="text-danger">User details doesn't exist.</h6>`
                }
              })
              .catch(function (error) {
                // console.log(error);
              });
        }
        
    }
    return(
    <div>
        <div className="container d-flex justify-content-center">
            <div id="createOrUpdateForm" className='patient-registration commonStyle'>
                <h3 className='text-center heading'>User Registration Form</h3>
                <p>Please fill this form to register</p>
                <form id="saveUserForm" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="username" className="form-label">Registration Number *</label>
                        <input type="text" className="form-control" id="username"
                        name='username'
                        value={inputs.username||""}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className={styles.fullName}>
                        <div className="mb-3 me-3">
                            <label for="firstName" className="form-label">First Name *</label>
                            <input type="text" className="form-control" id="firstName"
                            name='firstName'
                            value={inputs.firstName||""}
                            onChange={handleChange} required/>
                        </div>
                        <div className="mb-3 me-3">
                            <label for="middleName" className="form-label">Middle Name</label>
                            <input type="text" className="form-control" id="middleName"
                            name='middleName'
                            value={inputs.middleName||""}
                            onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label for="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName"
                            name='lastName'
                            value={inputs.lastName||""}
                            onChange={handleChange}/>
                        </div>
                    </div>
                  
                    <div className="mb-3">
                        <label for="emailId" className="form-label">Email *
                        <div id='emailIdError'></div>
                        </label>
                        <input type="email" className="form-control" id="emailId"
                        name='emailId'
                        value={inputs.emailId||""}
                        onChange={handleChange} required/>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label for="mobileNumber" className="form-label">Mobile</label>
                        <input type="number" className="form-control" id="mobileNumber"
                        name='mobileNumber'
                        value={inputs.mobileNumber||""}
                        onChange={handleChange}/>
                    </div>
                    {
                        (currentPage=="create") &&
                        <div className="mb-3 col-md-6">
                            <label for="password" className="form-label">Password *</label>
                            <input type="password" className="form-control" id="password"
                            name='password'
                            value={inputs.password||""}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    }
                    <div id="strongPasswordError"></div>

                      <div className="mb-3 col-md-6">
                        <label for="dateOfBirth" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dateOfBirth"
                        name='dateOfBirth'
                        value={inputs.dateOfBirth||""}
                        onChange={handleChange}/>
                    </div>

                      <div className="mb-3 col-md-6">
                        <label for="joiningDate" className="form-label">Joining Date</label>
                        <input type="date" className="form-control" id="joiningDate"
                        name='joiningDate'
                        value={inputs.joiningDate||""}
                        onChange={handleChange}/>
                    </div>

                      <div className="mb-3 col-md-6">
                        <label for="lastDate" className="form-label">Last Date</label>
                        <input type="date" className="form-control" id="lastDate"
                        name='lastDate'
                        value={inputs.lastDate||""}
                        onChange={handleChange}/>
                    </div>

                    <div className="mb-3 col-md-6">
                        <label for="expiryDate" className="form-label">Expiry Date</label>
                        <input type="date" className="form-control" id="expiryDate"
                        name='expiryDate'
                        value={inputs.expiryDate||""}
                        onChange={handleChange}/>
                    </div>

                    <p>Select one or more roles</p>
                    <div id='rolesPartOfForm'>
                        
                    </div>
                    
                    <br/><br/>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary submit">
                        {(currentPage=="create")?'Submit':'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default CreateUser;