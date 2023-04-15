/*This component will read all visits which are presently available*/

import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import DateTime from "../../util/DateTime";
import {ReadVisitByIdModal} from "./ReadVisitById";

export default function ReadAllTodayPendingVisits(props){
    const [visits, setVisits]=useState([])
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [visitId,setVisitId]=useState(0)
    

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        axios
        .post('/visit/read-all-today-pending-visits')
        .then(res=>{
            setVisits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const approveHandler=(id)=>{
        // console.log('approve handler '+id)
        // window.location.reload(false)
        axios({
            method: 'post',
            url: '/visit/update-visit-approved-by-sa-to-true',
            data: {"id":id}
        })
        .then(res=>{
            if(res.data.updated==true){
                // console.log('updated true')
                loadInitialData(); 
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const cancelHandler=(id)=>{
        // console.log('approve handler '+id)
        // window.location.reload(false)
        axios({
            method: 'post',
            url: '/visit/update-canceled-by-sa-to-true',
            data: {"id":id}
        })
        .then(res=>{
            if(res.data.updated==true){
                // console.log('updated true')
                loadInitialData(); 
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const viewDetailsHandler=(id)=>{
        setShowViewDetails(true)
    }
    const closeModelHandler=(id)=>{
        setShowViewDetails(false)
    }

    return(<>
        <div className="container">
            <div className='commonStyle'>
            <h3 className='text-center heading'>Today Pending Visits</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">Visitor Name</th>
                    <th scope="col">Meeting Person Name</th>
                    <th scope="col">Approve Visit</th>
                    <th scope="col">Cancel</th>
                    <th scope="col">View Details</th>
                    <th scope="col">Approved By UOH SH</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        visits.map(
                            visit=>
                                <tr>
                                    <th scope="row" >{visit.id}</th>
                                    <td>{DateTime.getFormatDataTime(new Date(visit.createdTime))}</td>
                                    <td>{visit.visitorFirstName} {visit.visitorMiddleName} {visit.visitorLastName}</td>
                                    <td>{visit.meetingPersonName}</td>
                                    <td><button className="btn btn-success submit" onClick={()=>{approveHandler(visit.id);props.refreshShow();}}>Approve</button></td>
                                    <td><button className="btn btn-success submit" onClick={()=>{cancelHandler(visit.id);props.refreshShow();}}>Cancel</button></td>
                                    <td><button className="btn btn-success submit" onClick={()=>{setVisitId(visit.id);viewDetailsHandler(visit.id)}}
                                    data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>
                                    <td>{visit.visitApprovedByUu ? 'Approved':'Not Approved'}</td>
                                </tr>
                            ) 
                    }
                </tbody>
                </table>
            </div>  

                {/* <!-- Modal --> */}
                {   showViewDetails &&
                    <ReadVisitByIdModal closeModelHandler={closeModelHandler} visitId={visitId}/>
                }


            </div>
        </div>  
    </>);
}