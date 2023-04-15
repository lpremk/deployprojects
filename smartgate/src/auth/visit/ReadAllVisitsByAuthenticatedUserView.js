import styles from "./ReadAllVisitsByAuthenticatedUserView.module.css"
import axios from "../../AxiosInstance";
import { useContext, useEffect, useState } from "react";
import DateTime, { getDateFromDateTime } from "../../util/DateTime";
import { ReadVisitByIdModal } from "./ReadVisitById";

import { ExitModel } from "./ExitOfVisit/ExitModel";
import ExitContext, { ExitState } from "./context/ExiContext";

export function ReadAllVisitsByAuthenticatedUserView(){
    const [visitModal,setVisitModal]=useState({})
    const [showVisits, setShowVisits]=useState(false)

    useEffect(()=>{
        const currentDateTime = new Date();
        const milliSecondsInADay=1000*60*60*24;
        let fromDateTime=new Date(currentDateTime-10*milliSecondsInADay);
        setVisitModal({"fromDate":getDateFromDateTime(fromDateTime),
                        "toDate":getDateFromDateTime(currentDateTime)})
    },[])

    /*refreshShowVisits fuction is used to reload show visits (i.e. ReadAllVisitsByRegistrationId)
      component while clicking approve, exit or cancel buttons*/
    const refreshShowVisits=()=>{
        // console.log('refreshShow called')
        setShowVisits(false)
        setTimeout(() => {
            setShowVisits(true)
        }, 50);
    }
   

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setVisitModal(values => ({...values, [name]: value}))
        setShowVisits(false)
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        // alert('form submitted')
        // console.log(visitModal)
        setShowVisits(true)

    }
    const handleReset=(event)=>{
        setVisitModal({})
    }
    
    return(<>
    <ExitState>
       <div className="d-flex justify-content-center">
        <div>
            <br/>
            <form onSubmit={handleSubmit}>
            <div className={styles.dates}>
                
                <div class="me-4 ms-4">
                <label for="fromDate" class="form-label">From Date : </label>
                <input type="date" class="form-control" id="fromDate" name="fromDate"
                 value={visitModal.fromDate || ""} 
                 onChange={handleChange}
                 required
                />
                </div>


                <div class="me-4 ms-4">
                <label for="toDate" class="form-label">To Date : </label>
                <input type="date" class="form-control" id="toDate" name="toDate"
                 value={visitModal.toDate || ""} 
                 onChange={handleChange}
                 required
                />
                </div>
                
            </div>
           
            <br/>
            <div className='d-flex justify-content-center'>
                        <button type="submit" style={{"borderRadius":"0px"}} className="btn btn-primary me-4 ms-4 submit">Submit</button>
                        <button type="button" style={{"borderRadius":"0px"}} onClick={handleReset} className="btn btn-primary me-4 ms-4 submit">Reset</button>
            </div>
            <br/>
            </form>
        </div>
    </div>
    {
        showVisits &&
        <>
        <ReadAllVisitsByRegistrationId visitModal={visitModal} refreshShowVisits={refreshShowVisits}/>
        <br/>
        <ReadAllCanceledVisitsByRegistrationId visitModal={visitModal} refreshShowVisits={refreshShowVisits}/>
        <br/>
        </>
    }   

    </ExitState>
    </>);
}

export default function ReadAllVisitsByRegistrationId(props){
    const [visits, setVisits]=useState([])
    const [visitModal,setVisitModal]=useState(props.visitModal)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [visitId,setVisitId]=useState(0)
    //for exit
    const [showExitModel,setShowExitModel]=useState(false)
    const state=useContext(ExitContext)

    const viewDetailsHandler=(id)=>{
        setShowViewDetails(true)
    }
    const closeModelHandler=(id)=>{
        setShowViewDetails(false)
    }

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        console.log('visitModal '+JSON.stringify(visitModal))
        axios({
            method: 'post',
            url: '/visit/read-all-by-authenticated-user',
            data: JSON.stringify(visitModal)
          })
        .then(res=>{
            console.log(res.data)
            setVisits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const approveVisitByUuHandler=(id)=>{
        axios({
            method: 'post',
            url: '/visit/update-visit-approved-by-uu-to-true',
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



    return(<>
        
        <div className="container">
            <div className={`commonStyle ${styles.commonStyle}`}>
            <h3 className='text-center heading'>Visits</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">Approved By Me</th>
                    <th scope="col">Exit By Me</th>
                    <th scope="col">View Details</th>
                    <th scope="col">Approve Visit By Sa</th>
                    <th scope="col">Exit Visit By Sa</th>
                    <th scope="col">Completed Visit</th>
                    <th scope="col">Expiry Status</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        visits.map(
                            visit=>
                            <>
                                <tr className="">
                                    <th scope="row" >{visit.id}</th>

                                    <td>{DateTime.getFormatDataTime(new Date(visit.createdTime))}</td>

                                    <td><button className="btn btn-success submit" 
                                    onClick={()=>{approveVisitByUuHandler(visit.id);props.refreshShow();}}
                                    disabled={visit.visitApprovedByUu}>Approve</button></td>
                                    
                                    <td><button className="btn btn-success submit" 
                                    onClick={()=>{
                                        state.setState({...state.state,id:visit.id, 
                                            exited:"no",description:"",exitPhotograph:""})
                                        setShowExitModel(false);
                                        setTimeout(() => {
                                            setShowExitModel(true);
                                        }, 500);
                                    }}
                                    disabled={visit.exitApprovedByUu}
                                    data-bs-toggle="modal" data-bs-target={"#exitOfVisitModal2"}>Exit</button></td>

                                    <td><button className="btn btn-success submit" 
                                    onClick={()=>{setVisitId(visit.id);viewDetailsHandler(visit.id)}}
                                    data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>


                                    <td>{visit.visitApprovedBySa ? 'Approved' : 'Not Approved'}</td>
                                    
                                    <td>{visit.exitApprovedBySa ? 'Exited' : 'Not Exited'}</td>

                                    <td>{(visit.visitApprovedBySa && visit.exitApprovedBySa) ?<p>Yes</p>:<p>No</p>}</td>

                                    <td className={(new Date(visit.endTime)>(new Date()))?'bg-success':'bg-danger'}
                                    style={{"borderRight":"2px solid white"}}>{(new Date(visit.endTime)<(new Date()))?<>Expired</>:<>Not Expired</>}</td>
                                </tr>
                            </>
                            ) 
                    }
                </tbody>
                </table>
               
            </div>    
            </div>
                {/* <!-- Modal --> */}
                {   showViewDetails &&
                    <ReadVisitByIdModal closeModelHandler={closeModelHandler} visitId={visitId}/>
                }
                   {/* <!-- Modal --> */}
                   <ExitModel visitObj={{"id":visitId,"exit":"no","description":""}} refreshShowVisits={props.refreshShowVisits}/>
        </div>  
    </>);
    
}



export function ReadAllCanceledVisitsByRegistrationId(props){
    const [visits, setVisits]=useState([])
    const [visitModal,setVisitModal]=useState(props.visitModal)
    const [anyMobileNumber,setAnyMobileNumber]=useState(props.anyMobileNumber)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [visitId,setVisitId]=useState(0)

    const viewDetailsHandler=(id)=>{
        setShowViewDetails(true)
    }
    const closeModelHandler=(id)=>{
        setShowViewDetails(false)
    }

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        // console.log('ReadAllVisitsByRegistrationId '+JSON.stringify(visitModal))
        axios({
            method: 'post',
            url: '/visit/read-all-canceled-by-authenticated-user',
            data: visitModal
          })
        .then(res=>{
            setVisits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(<>
        <div className="container d-flex justify-content-center">
            <div className='commonStyle'>
            <h3 className='text-center heading'>Canceled Visits</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">View Details</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        visits.map(
                            visit=>
                                <tr className="">
                                    <th scope="row" >{visit.id}</th>
                                    <td>{DateTime.getFormatDataTime(new Date(visit.createdTime))}</td>

                                    <td><button className="btn btn-success submit" onClick={()=>{setVisitId(visit.id);viewDetailsHandler(visit.id)}}
                                    data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>

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
// ------------------------------------------------
// visit  disabled(visit)  

// true    true           
// true    false          
// false   true           
// false   true            
// -----------------------------------------------
// visit exit disabled(exit)  completed    status

// true true    true            yes     -- completed
// true false   false           no      -- exit
// false true   true            no      -- not exist
// false false  true            no      --  visited