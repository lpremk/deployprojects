import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import DateTime from "../../util/DateTime";
import { ReadVisitByIdModal } from "./ReadVisitById";

export default function ReadVisitByVisitIdView(){
    const [visitModal,setVisitModal]=useState({})
    const [showVisit, setShowVisit]=useState(false)

    /*refreshShowVisits fuction is used to reload show visit (i.e. ReadVisitByVisitId)
      component while clicking approve, exit or cancel buttons*/
    const refreshShowVisits=()=>{
        // console.log('refreshShow called')
        setShowVisit(false)
        setTimeout(() => {
            setShowVisit(true)
        }, 50);
    }
   

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setVisitModal(values => ({...values, [name]: value}))
        setShowVisit(false)
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        // alert('form submitted')
        // console.log(JSON.stringify(visitModal))
        setShowVisit(true)

    }
    const handleReset=(event)=>{
        setVisitModal({})
    }
    
    return(<>
       <div className="d-flex justify-content-center">
        <div>
            <br/>
            <form onSubmit={handleSubmit}>
            <label>Visit Id : 
            <input 
                type="number" 
                className="ms-1"
                style={{"width":"135px"}}
                name="id" 
                value={visitModal.id || ""} 
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
        </div>
    </div>
{
        showVisit &&
        <>
        <ReadVisitByVisitId visitModal={visitModal} refreshShowVisits={refreshShowVisits}/>
        <br/>
        <ReadCanceledVisitByVisitId visitModal={visitModal} refreshShowVisits={refreshShowVisits}/>
        <br/>
        </>
}   


    </>);
}

export function ReadVisitByVisitId(props){
    const [visit, setVisit]=useState({})
    // const [visitId,setVisitId]=useState(props.visitId)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [visitId,setVisitId]=useState(0)
    const [visitNormal,setVisitNormal]=useState(false)

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
        axios({
            method: 'post',
            url: '/visit/read-normal/'+props.visitModal.id,
          })
        .then(res=>{
            setVisit(res.data)
            // console.log('my visit -- '+JSON.stringify(visit))
            if(Object.keys(res.data).length === 0){
                setVisitNormal(false)
            }
            else{
                setVisitNormal(true)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const approveVisitHandler=(id)=>{
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

    const approveExitVisitHandler=(id)=>{
        axios({
            method: 'post',
            url: '/visit/update-exit-approved-by-sa-to-true',
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

    const approveCancelVisitHandler=(id)=>{
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


    return(<>
        <div className="container">
            <div className='commonStyle'>
            <h3 className='text-center heading'>Visit</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">View Details</th>
                    <th scope="col">Approve Visit</th>
                    <th scope="col">Approved By UOH SH</th>
                    <th scope="col">Exit Visit</th>
                    <th scope="col">Completed Visit</th>
                    <th scope="col">Cancel Visit</th>
                    <th scope="col">Expired</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        visitNormal &&
                   
                    <tr className="">
                        <th scope="row" >{visit.id}</th>
                        <td>{DateTime.getFormatDataTime(new Date(visit.createdTime))}</td>

                        <td><button className="btn btn-success submit" onClick={()=>{setVisitId(visit.id);viewDetailsHandler(visit.id)}}
                        data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>

                        <td><button className="btn btn-success submit" onClick={()=>{approveVisitHandler(visit.id);props.refreshShow();}}
                        disabled={visit.visitApprovedBySa}>Approve</button></td>
                        
                        <td>{visit.visitApprovedByUu ? 'Approved':'Not Approved'}</td>

                        <td><button className="btn btn-success submit" onClick={()=>{approveExitVisitHandler(visit.id);props.refreshShow();}}
                        disabled={!(visit.visitApprovedBySa && !visit.exitApprovedBySa)}>Exit </button></td>

                        <td>{(visit.visitApprovedBySa && visit.exitApprovedBySa) ?<p>Yes</p>:<p>No</p>}</td>

                        <td><button className="btn btn-success submit" onClick={()=>{approveCancelVisitHandler(visit.id);props.refreshShow();}}
                        disabled={visit.canceledBySa}>Cacel</button></td>

                        <td className={(new Date(visit.endTime)>(new Date()))?'bg-success':'bg-danger'}
                        style={{"borderRight":"2px solid white"}}>{(new Date(visit.endTime)<(new Date()))?<>Expired</>:<>Not Expired</>}</td>
                    </tr>
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

export function ReadCanceledVisitByVisitId(props){
    const [visit, setVisit]=useState({})
    // const [visitId,setVisitId]=useState(props.visitId)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [visitId,setVisitId]=useState(0)
    const [visitCanceled,setVisitCanceled]=useState(false)

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
        axios({
            method: 'post',
            url: '/visit/read-canceled/'+props.visitModal.id,
          })
        .then(res=>{
            setVisit(res.data)
            if(Object.keys(res.data).length === 0){
                setVisitCanceled(false)
            }
            else{
                setVisitCanceled(true)
            }
            // console.log('empty cancel visit '+(Object.keys(visit).length === 0))
            // console.log('empty cancel visit '+visit.id)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(<>
        <div className="container d-flex justify-content-center">
            <div className='commonStyle'>
            <h3 className='text-center heading'>Canceled Visit</h3> 
            
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
                    { visitCanceled &&
                    <tr className="">
                        <th scope="row" >{visit.id}</th>
                        <td>{DateTime.getFormatDataTime(new Date(visit.createdTime))}</td>

                        <td><button className="btn btn-success submit" onClick={()=>{setVisitId(visit.id);viewDetailsHandler(visit.id)}}
                        data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>

                    </tr>
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
