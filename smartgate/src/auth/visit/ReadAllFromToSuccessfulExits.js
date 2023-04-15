import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import DateTime from "../../util/DateTime";

export default function ReadAllFromToSuccessfulExits(props){
    const [visits, setVisits]=useState([])
    const [dates,setDates]=useState(props.dates)

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        axios({
            method: 'post',
            url: '/visit/read-all-from-to-successful-exits',
            data: dates
          })
        .then(res=>{
            setVisits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(<>
        <div className="container">
            <div className='commonStyle'>
            <h3 className='text-center heading'>Today Completed Visits</h3> 
            <div class="table-responsive">
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">Visitor Name</th>
                    <th scope="col">Meeting Person Name</th>
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