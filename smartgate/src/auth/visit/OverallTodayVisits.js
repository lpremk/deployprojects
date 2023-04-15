import { useState } from "react";
import ReadAllTodayPendingExits from "./ReadAllTodayPendingExits";
import ReadAllTodayPendingVisits from "./ReadAllTodayPendingVisits";
import ReadAllTodaySuccessfulExits from "./ReadAllTodaySuccessfulExits";


export default function OverallTodayVisits(){
    const [show, setShow]=useState(true)
    const refreshShow=()=>{
        // console.log('refreshShow called')
        setShow(false)
        setTimeout(() => {
            setShow(true)
        }, 50);
    }
    return(<>
    <br/> <br/> 
    <div className="container">
        <div>

        <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="visit-tab" data-bs-toggle="tab" data-bs-target="#visit-tab-pane" type="button" role="tab" aria-controls="visit-tab-pane" aria-selected="true">Pending Visits</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="exit-tab" data-bs-toggle="tab" data-bs-target="#exit-tab-pane" type="button" role="tab" aria-controls="exit-tab-pane" aria-selected="false">Pending Exits</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="completed-tab" data-bs-toggle="tab" data-bs-target="#completed-tab-pane" type="button" role="tab" aria-controls="completed-tab-pane" aria-selected="false">Completed Visits</button>
        </li>
        </ul>
        <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="visit-tab-pane" role="tabpanel" aria-labelledby="visit-tab" tabindex="0">
        {
            show &&
            <ReadAllTodayPendingVisits refreshShow={refreshShow}/>
        }
            </div>
        <div class="tab-pane fade" id="exit-tab-pane" role="tabpanel" aria-labelledby="exit-tab" tabindex="0">
        {
            show &&
            <ReadAllTodayPendingExits refreshShow={refreshShow}/>
        }
            </div>
        <div class="tab-pane fade" id="completed-tab-pane" role="tabpanel" aria-labelledby="completed-tab" tabindex="0">
        {
            show &&
            <ReadAllTodaySuccessfulExits/>
        }
            </div>
        </div>

        </div>
    </div>




    </>);
}