

import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import DateTime, { getDateFromDateTime } from "../../util/DateTime";
import ReadExitByIdModal from "./ReadExitByIdModal";
// import { ReadExitByIdModal } from "./ReadExitById";
import styles from "./ReadAllExitsByRegistrationIdView.module.css"

export function ReadAllExitsByRegistrationIdView(){
    const [exitModal,setExitModal]=useState({})
    const [showExits, setShowExits]=useState(false)

    useEffect(()=>{
        const currentDateTime = new Date();
        const milliSecondsInADay=1000*60*60*24;
        let fromDateTime=new Date(currentDateTime-10*milliSecondsInADay);
        setExitModal({"fromDate":getDateFromDateTime(fromDateTime),
                        "toDate":getDateFromDateTime(currentDateTime)})
    },[])

    /*refreshShowExits fuction is used to reload show exits (i.e. ReadAllVisitsByRegistrationId)
      component while clicking approve, exit or cancel buttons*/
    const refreshShowExits=()=>{
        // console.log('refreshShow called')
        setShowExits(false)
        setTimeout(() => {
            setShowExits(true)
        }, 50);
    }
   

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setExitModal(values => ({...values, [name]: value}))
        setShowExits(false)
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        // alert('form submitted')
        console.log(exitModal)
        setShowExits(true)

    }
    const handleReset=(event)=>{
        setExitModal({})
    }
    
    return(<>
       <div className="d-flex justify-content-center">
        <div>
            <br/>
            <form onSubmit={handleSubmit}>
            


            <div className={styles.dates}>
                
                <div class="me-4 ms-4">
                <label for="fromDate" class="form-label">From Date : </label>
                <input type="date" class="form-control" id="fromDate" name="fromDate"
                 value={exitModal.fromDate || ""} 
                 onChange={handleChange}
                 required
                />
                </div>


                <div class="me-4 ms-4">
                <label for="toDate" class="form-label">To Date : </label>
                <input type="date" class="form-control" id="toDate" name="toDate"
                 value={exitModal.toDate || ""} 
                 onChange={handleChange}
                 required
                />
                </div>
                
            </div>

            <br/> 
            <div className="d-flex justify-content-center">
                <div class="me-4 ms-4">
                    <label for="uuUsername" class="form-label">Registation Id :  </label>
                    <input  style={{"width":"170px"}} type="text" class="form-control" id="uuUsername" name="uuUsername"
                    value={exitModal.uuUsername || ""} 
                    onChange={handleChange}
                    required
                    />
                </div>
            </div>

            

            <br/>
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
        showExits &&
        <>
        <ReadAllExitsByRegistrationId exitModal={exitModal} refreshShowExits={refreshShowExits}/>
        <br/>
        <ReadAllCanceledExitsByRegistrationId exitModal={exitModal} refreshShowExits={refreshShowExits}/>
        <br/>
        </>
}   


    </>);
}

export default function ReadAllExitsByRegistrationId(props){
    const [exits, setExits]=useState([])
    const [exitModal,setExitModal]=useState(props.exitModal)
    const [anyMobileNumber,setAnyMobileNumber]=useState(props.anyMobileNumber)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [exitId,setExitId]=useState(0)

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
        console.log('ReadAllExitsByRegistrationId '+JSON.stringify(exitModal))
        axios({
            method: 'post',
            url: '/exit/read-all-by-username',
            data: exitModal
          })
        .then(res=>{
            setExits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const approveExitHandler=(id)=>{
        axios({
            method: 'post',
            url: '/exit/update-exit-approved-by-sa-to-true',
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

    const approveHandler=(id)=>{
        axios({
            method: 'post',
            url: '/exit/update-approved-by-ea-to-true',
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
        axios({
            method: 'post',
            url: '/exit/update-canceled-by-ea-to-true',
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
            <h3 className='text-center heading'>Exits</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Exiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">View Details</th>
                    <th scope="col">Approve Exit</th>
                    <th scope="col">Cancel Exit</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        exits.map(
                            exit=>
                                <tr className="">
                                    <th scope="row" >{exit.id}</th>
                                    <td>{DateTime.getFormatDataTime(new Date(exit.createdTime))}</td>

                                    <td><button className="btn btn-success submit" onClick={()=>{setExitId(exit.id);viewDetailsHandler(exit.id)}}
                                    data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>

                                    <td><button className="btn btn-success submit" onClick={()=>{approveHandler(exit.id);props.refreshShow();}}
                                    disabled={exit.approvedByEa}>Approve</button></td>
                                    
                                    <td><button className="btn btn-success submit" onClick={()=>{cancelHandler(exit.id);props.refreshShow();}}
                                    disabled={exit.canceledByEa}>Cancel</button></td>

                                </tr>
                            ) 
                    }
                </tbody>
                </table>
            </div>
                {/* <!-- Modal --> */}
                {   showViewDetails &&
                    <ReadExitByIdModal closeModelHandler={closeModelHandler} exitId={exitId}/>
                }

            </div>
        </div>  
    </>);
}

export function ReadAllCanceledExitsByRegistrationId(props){
    const [exits, setExits]=useState([])
    const [exitModal,setExitModal]=useState(props.exitModal)
    const [anyMobileNumber,setAnyMobileNumber]=useState(props.anyMobileNumber)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [exitId,setExitId]=useState(0)

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
        console.log('ReadAllExitsByRegistrationId '+JSON.stringify(exitModal))
        axios({
            method: 'post',
            url: '/exit/read-all-canceled-by-username',
            data: exitModal
          })
        .then(res=>{
            setExits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(<>
        <div className="container">
            <div className='commonStyle'>
            <h3 className='text-center heading'>Canceled Exits</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Exiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">View Details</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        exits.map(
                            exit=>
                                <tr className="">
                                    <th scope="row" >{exit.id}</th>
                                    <td>{DateTime.getFormatDataTime(new Date(exit.createdTime))}</td>

                                    <td><button className="btn btn-success submit" onClick={()=>{setExitId(exit.id);viewDetailsHandler(exit.id)}}
                                    data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>

                                </tr>
                            ) 
                    }
                </tbody>
                </table>
            </div>
               {/* <!-- Modal --> */}
               {   showViewDetails &&
                    <ReadExitByIdModal closeModelHandler={closeModelHandler} exitId={exitId}/>
                }

            </div>
        </div>  
    </>);
}
