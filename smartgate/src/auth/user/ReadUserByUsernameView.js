import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import { ReadUserByUsernameModel } from "./ReadUserByUsernameModel";
import { UpdateUserByUsernameModel } from "./UpdateUserByUsernameModel";

/*
********************************APP ADMIN :: Find User :: component path********************************************
ReadUserByUsernameView() ----(userModel as props)--->  ReadUserByUserId(props) ---(after submit button click)--->
ReadUserByUsernameModel() and UpdateUserByUsernameModel()
********************************************************************************************************************
*/


export default function ReadUserByUsernameView(){
    const [userModel,setUserModel]=useState({})
    const [showUser, setShowUser]=useState(false)

    /*refreshShowUser fuction is used to reload show user (i.e. ReadUserByUserId)
      component while clicking approve, exit or cancel buttons*/
    const refreshShowUser=()=>{
        // console.log('refreshShow called')
        setShowUser(false)
        setTimeout(() => {
            setShowUser(true)
        }, 50);
    }
   

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserModel(values => ({...values, [name]: value}))
        setShowUser(false)
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        // alert('form submitted')
        // console.log(JSON.stringify(userModel))
        
        setShowUser(true)

    }
    const handleReset=(event)=>{
        setUserModel({})
    }
    
    return(<>
       <div className="d-flex justify-content-center">
        <div>
            <br/>
            <form onSubmit={handleSubmit}>

            <div className="d-flex justify-content-center">
                <div class="me-4 ms-4">
                    <label for="username" class="form-label">Registation Id :  </label>
                    <input  style={{"width":"170px"}} type="text" class="form-control" id="username" name="username"
                    value={userModel.username || ""} 
                    onChange={handleChange}
                    required
                    />
                </div>
            </div>

            <br/> <br/>
            <div className='d-flex justify-content-center'>
                        <button type="submit" style={{"borderRadius":"0px"}} className="btn btn-primary me-3 submit">Submit</button>
                        <button type="button" style={{"borderRadius":"0px"}} onClick={handleReset} className="btn btn-primary submit">Reset</button>
            </div>
            <br/>
            </form>
        </div>
    </div>
{
        showUser &&
        <>
        <ReadUserByUserId userModel={userModel} refreshShowUser={refreshShowUser}/>
        <br/>
        
        </>
}   


    </>);
}

export function ReadUserByUserId(props){
    const [user, setUser]=useState({})
    const [username,setUsername]=useState(0)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [showUpdateDetails, setShowUpdateDetails]=useState(false)
    const [showUser,setShowUser]=useState(false)

    const viewDetailsHandler=()=>{
        setShowViewDetails(true)
    }
    const closeModelHandler=()=>{
        setShowViewDetails(false)
    }

    const viewUpdateDetailsHandler=()=>{
        setShowUpdateDetails(true)
    }
    const closeUpdateModelHandler=()=>{
        setShowUpdateDetails(false)
    }

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        // console.log('username--'+props.userModel.username)
        axios({
            method: 'post',
            url: '/user/read-id-by-username/'+props.userModel.username,
          })
        .then(res=>{
            setUser(res.data)
            // console.log('my user -- '+JSON.stringify(user))
            if(Object.keys(res.data).length === 0){
                setShowUser(false)
            }
            else{
                setShowUser(true)
            }
        })
        .catch(err=>{
            // console.log(err)
        })
    }



    return(<>
        <div className="container">
            <div className='commonStyle'>
            <h3 className='text-center heading'>User</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Registration Id</th>
                    <th scope="col">View Details</th>
                    <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        showUser &&
                   
                    <tr className="">
                        <th scope="row" >{user.username}</th>

                        <td><button className="btn btn-success submit" onClick={()=>{setUsername(user.username);viewDetailsHandler()}}
                        data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>

                        <td><button className="btn btn-success submit" onClick={()=>{setUsername(user.username);viewUpdateDetailsHandler()}}
                        data-bs-toggle="modal" data-bs-target="#updateDetailsModal">Edit</button></td>

                    </tr>
                     }
                </tbody>
                </table>
                </div>
                {/* <!-- Modal --> */}
                {   showViewDetails &&
                    <ReadUserByUsernameModel closeModelHandler={closeModelHandler} username={username}/>
                }

                {/* <!-- Modal --> */}
                {   showUpdateDetails &&
                    <UpdateUserByUsernameModel closeModelHandler={closeModelHandler} username={username}/>
                }

            </div>
        </div>  
    </>);
}

