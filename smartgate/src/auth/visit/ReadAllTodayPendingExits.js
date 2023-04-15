import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import DateTime from "../../util/DateTime";


export default function ReadAllTodayPendingExits(props){
    const [visits, setVisits]=useState([])
    

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        axios
        .post('/visit/read-all-today-pending-exits')
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


    return(<>
        <div className="container">
            <div className='commonStyle'>
            <h3 className='text-center heading'>Today Pending Exits</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">Visitor Name</th>
                    <th scope="col">Meeting Person Name</th>
                    <th scope="col">Approve Exit</th>
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
                                    <td><button title="Indent for pharmacy 2" className="btn btn-success submit" onClick={()=>{approveHandler(visit.id);props.refreshShow();}}>Exit</button></td>
                                </tr>
                            ) 
                    }
                </tbody>
                </table>
            </div>
            </div>
        </div>  
    </>);
}