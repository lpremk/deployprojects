import { useEffect, useState } from "react";
import axios  from "../../AxiosInstance";

export default function ReadUserAuthenticatedView(){
   const[user,setUser]=useState({})
    useEffect(()=>{
        axios({
            method: 'get',
            url: '/user/read-by-authenticated',
             }).then(function (response) {
            // console.log(response.data);
            setUser(response.data)
            })
            .catch(function (error) {
            // console.log(error);
            }); 
         },[])
    return(<>
    <div className="container d-flex justify-content-center">
        <table style={{"maxWidth":"700px"}} class="table">
        <tbody>
            <tr>
            <td>Registration Id</td>
            <td>{user.username}</td>
            </tr>
            <tr>
            <td>Name</td>
            <td>{user.firstName} {user.middleName} {user.lastName}</td>
            </tr>
            <tr>
            <td>Email</td>
            <td>{user.emailId}</td>
            </tr>
            <tr>
            <td>Mobile Number</td>
            <td>{user.mobileNumber}</td>
            </tr>
            <tr>
            <td>Date Of Birth</td>
            <td>{user.dateOfBirth}</td>
            </tr>
            <tr>
            <td>Joining Date</td>
            <td>{user.joiningDate}</td>
            </tr>
            <tr>
            <td>Last Date</td>
            <td>{user.joiningDate}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </>);
}