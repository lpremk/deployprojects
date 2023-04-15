import { useEffect, useState } from "react";
import axios from "../../AxiosInstance";
import CreateUser from "./CreateUser";

export default function UpdateUserByUsername(props){
    const [user,setUser]=useState();

    useEffect(()=>{
        axios({
            method: 'post',
            url: '/user/read-id-by-username/'+props.username,
          })
        .then(res=>{
            // console.log("i am ReadUserByUsername"+props.username)
            // console.log(res.data)
            setUser(res.data)
        })
        .catch(err=>{
            // console.log(err)
        })
    },[]);
    return(<>
      
        {
            (user!=undefined) &&
            <>
                <CreateUser inputs={user}/>
                {/* <p>Registration Id : {user.username} </p>
                <div className="d-flex justify-content-between">
                    <p>Name : {user.firstName} {user.middleName} {user.lastName}</p>
                </div>
                <p>Email : {user.email}</p>
                <p>Mobile Number : {user.mobileNumber}</p>
                <p>Date of Birth : {user.dateOfBirth}</p>
                <p>Joining Date : {user.joiningDate}</p>
                <p>Last Date : {user.lastDate}</p>
                <p>Expiry Date : {user.expiryDate}</p>
                <p>CreatedTime : {user.createdTime}</p> */}
                       
            </>
        }
        
    </>);
}

export function UpdateUserByUsernameModel(props){
    return(<>
    <div class="modal fade" id="updateDetailsModal" tabindex="-1" aria-labelledby="viewDetailsModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h1 class="modal-title fs-5 text-center" id="viewDetailsModalLabel">User Details</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>props.closeModelHandler()}></button>
                        </div>
                        <div class="modal-body" style={{"width":"auto"}}>
                            <UpdateUserByUsername username={props.username}/>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                    </div>
                </div>
    </>);
}
