import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import DateTime, { getDateFromDateTime } from "../../util/DateTime";
import { ReadVisitByIdModal } from "./ReadVisitById";

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
       <div className="d-flex justify-content-center" style={{"min-width":"700px"}}>
        <div>
            <br/>
            <form onSubmit={handleSubmit}>
            <label>From Date : 
            <input 
                type="date" 
                name="fromDate" 
                className="ms-1"
                value={visitModal.fromDate || ""} 
                onChange={handleChange}
                required
            />
            </label>
            <label>To Date : 
            <input 
                type="date" 
                name="toDate" 
                className="ms-1"
                value={visitModal.toDate || ""} 
                onChange={handleChange}
                required
            />
            </label>
            <br/> <br/>
            <div className='d-flex justify-content-center'>
                        <button type="submit" style={{"borderRadius":"0px"}} className="btn btn-primary me-3 submit">Submit</button>
                        <button type="button" style={{"borderRadius":"0px"}} onClick={handleReset} className="btn btn-primary submit">Reset</button>
            </div>
            <br/>
            </form>
        {/* <div>
        {dateTimes.fromDate} {dateTimes.toDate}

        </div> */}
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


    </>);
}

export default function ReadAllVisitsByRegistrationId(props){
    const [visits, setVisits]=useState([])
    const [visitModal,setVisitModal]=useState(props.visitModal)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [showExitDetails,setShowExitDetails]=useState(false)
    const [visitId,setVisitId]=useState(0)
    const [exitVisitObj,setExitVistiObj]=useState({})

    const viewDetailsHandler=(id)=>{
        setShowViewDetails(true)
    }
    const closeModelHandler=(id)=>{
        setShowViewDetails(false)
    }
    function refreshShowExit(){
        setShowExitDetails(false)
        setShowExitDetails(true)
    }
    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        // console.log('ReadAllVisitsByRegistrationId '+JSON.stringify(visitModal))
        axios({
            method: 'post',
            url: '/visit/read-all-by-authenticated-user',
            data: visitModal
          })
        .then(res=>{
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
        <div className="container d-flex justify-content-center">
            <div className='commonStyle'>
            <h3 className='text-center heading'>Visits</h3> 
            
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
                                    // onClick={()=>{
                                    //     setExitVistiObj({
                                    //         "id":visit.id,
                                    //         "description":"",
                                    //         "exit":"no"
                                    //     });
                                    //     refreshShowExit();
                                    //     }}
                                    disabled={visit.exitApprovedByUu}
                                    data-bs-toggle="modal" data-bs-target={'#exitModal'+visit.id}>Exit</button></td>

                                    <td><button className="btn btn-success submit" 
                                    onClick={()=>{setVisitId(visit.id);viewDetailsHandler(visit.id)}}
                                    data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>


                                    <td>{visit.visitApprovedBySa ? 'Approved' : 'Not Approved'}</td>
                                    
                                    <td>{visit.exitApprovedBySa ? 'Exited' : 'Not Exited'}</td>

                                    <td>{(visit.visitApprovedBySa && visit.exitApprovedBySa) ?<p>Yes</p>:<p>No</p>}</td>

                                    <td className={(new Date(visit.endTime)>(new Date()))?'bg-success':'bg-danger'}
                                    style={{"borderRight":"2px solid white"}}>{(new Date(visit.endTime)<(new Date()))?<>Expired</>:<>Not Expired</>}</td>
                                </tr>
                                <ExitVisitByIdModel visitObj={{
                                            "id":visit.id,
                                            "description":"",
                                            "exit":"no"
                                        }}/>
                                </>
                            ) 
                    }
                </tbody>
                </table>
                
                {/* <!-- Modal --> */}
                {   showViewDetails &&
                    <ReadVisitByIdModal closeModelHandler={closeModelHandler} visitId={visitId}/>
                }

                {/* <!-- Modal --> */}
                {
                    showExitDetails &&
                //     <ExitVisitByIdModel visitObj={{"id":visitId,
                // "description":"",
                // "exit":"no"}}/>
                // <ExitVisitByIdModel visitObj={exitVisitObj}/>
                <></>
                }
            </div>
        </div>  
    </>);
}

export function ExitVisitByIdModel(props){
    const [exit, setExit] = useState(props.visitObj.exit);
    const [description,setDescription]=useState(props.visitObj.description)

    useEffect(()=>{resetFormVisibility()},[])

    const approveExitByUuHandler=(event)=>{
        event.preventDefault();
        console.log(('visit id '+props.id))
        
        axios({
            method: 'post',
            url: '/visit/update-exit-approved-by-uu-to-true',
            data: { 
                    "id":props.visitId,
                    "description":description
                }
        })
        .then(res=>{
            console.log(res.data)
            document.getElementById("approveExitByUuForm").style.display="none";
            document.getElementById("approveExitByUuMsg").style.display="block";
            document.getElementById("approveExitByUuMsg").innerHTML=`<h5 style="color:green;padding:15px">Exit Successfully submitted For VisitId: ${res.data.message}.</h5>`
        })
        .catch(err=>{
            console.log(err)
        })
    }
    // resetFormVisibility();
    function resetFormVisibility(){
        document.getElementById("approveExitByUuForm").style.display="block";
        document.getElementById("approveExitByUuMsg").style.display="none";
    }
    return(<>
         <div class="modal fade" id={"exitModal"+props.visitObj.id} tabindex="-1" aria-labelledby="exitModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exitModalLabel">Exit the Visit For [visit id: {props.visitObj.id} {props.visitObj.description}]</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={()=>{
                            resetFormVisibility();
                        }}></button>
                    </div>
                    <div id="approveExitByUuMsg"></div>
                    <form id="approveExitByUuForm" onSubmit={approveExitByUuHandler}>
                    <div class="modal-body">
                        <p>Do you want to take any things out side university ?</p>
                        
                        <select class="form-select" aria-label="Default select example" value={exit}
                        onChange={(e) => setExit(e.target.value)}>
                            <option selected>Select below option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        {exit==="yes" && <>
                            <br/>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Write Description</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                        </>}
                       
                        
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                     </form>
                    </div>
                </div>
                </div>
    </>)
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
