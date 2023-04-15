import { useEffect, useState } from "react";
import  { getInputDateTimeFromJSDateTime } from "../../util/DateTime";
import properties from '../../properties.json'
import axios from "axios";
import { validateMobileNumber } from "../../util/ValidationUtil";
import styles from "./CreateVisit.module.css"

export default function CreateVisit3(){
    const [inputs, setInputs] = useState({});

    useEffect(()=>{
        const currentDateTime = new Date();
        const milliSecondsInAnHour=1000*60*60*1;
        let toDateTime=new Date(currentDateTime.getTime()+3*milliSecondsInAnHour);
        setInputs({
                    "startTime":getInputDateTimeFromJSDateTime(new Date()),
                    "endTime":getInputDateTimeFromJSDateTime(toDateTime)
                })
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        validateMobileNumber(inputs.visitorMobileNumber,"visitorMobileError")
        validateMobileNumber(inputs.meetingPersonMobileNumber,"meetingPersonMobileError")
        // console.log('submit called')
        const formData=new FormData()
        const myInputs = document.getElementById("createVisitForm").elements;
        for (let i = 0; i < myInputs.length; i++) {
            if (myInputs[i].nodeName === "INPUT" && myInputs[i].type === "file") {
                if(myInputs[i].files[0]==undefined){
                    formData.append(myInputs[i].name,new Blob())
                }
                else{
                    formData.append(myInputs[i].name,myInputs[i].files[0])
                }
            }
            else{
                if (!(myInputs[i].type === "submit")){
                    if ((myInputs[i].type === "number")){
                        if(myInputs[i].value==""){
                            formData.append(myInputs[i].name,-1)
                        }
                        else{
                            formData.append(myInputs[i].name,myInputs[i].value)
                        }
                    }
                    else{
                        formData.append(myInputs[i].name,myInputs[i].value)
                    }
                }
            }
          }
        // for (var entry of formData.entries()) {
        //     console.log(entry[0]+ ' -- ' + entry[1]); 
        // }


            axios({
                method: 'post',
                url: properties.backend_url+'/visit/create',
                data:formData
            })
            .then(function (response) {
                console.log(response.data);
                // alert(response.data.message)
                document.getElementById("createVisitPage").innerHTML=
                `<p style="color:green;padding:40px;border:3px solid green;font-size:20px;">${response.data.message}</p>`
            })
            .catch(function (error) {
                console.log('error '+error)
            });
    

    }

    return (<div>
        <div id="createVisitPage" className="container d-flex justify-content-center">
            <div className='commonStyle'>
                <h3 className='text-center heading'>Visit Form</h3>

                <form id="createVisitForm" onSubmit={handleSubmit}>
                <div className={styles.fullName}>
                        <div className="mb-3 me-3">
                            <label for="visitorFirstName" className="form-label">First Name *</label>
                            <input type="text" className="form-control" id="visitorFirstName"
                            name='visitorFirstName'
                            value={inputs.visitorFirstName||""}
                            onChange={handleChange}
                            required/>
                        </div>
                        <div className="mb-3 me-3">
                            <label for="visitorMiddleName" className="form-label">Middle Name</label>
                            <input type="text" className="form-control" id="visitorMiddleName"
                            name='visitorMiddleName'
                            value={inputs.visitorMiddleName||""}
                            onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label for="visitorLastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="visitorLastName"
                            name='visitorLastName'
                            value={inputs.visitorLastName||""}
                            onChange={handleChange}/>
                        </div>
                    </div>
                  
                    <div className="mb-3 col-md-6">
                        <label for="visitorMobileNumber" className="form-label">Visitor Mobile Number * 
                        <div id="visitorMobileError"></div></label>
                        <input type="number" className="form-control" id="visitorMobileNumber"
                        name='visitorMobileNumber'
                        value={inputs.visitorMobileNumber||""}
                        onChange={handleChange}
                        required/>
                    </div>
                    
                    <div className="mb-3 col-md-6">
                        <label for="meetingPersonMobileNumber" className="form-label">Meeting Person Mobile Number
                        <div id="meetingPersonMobileError"></div></label>
                        <input type="number" className="form-control" id="meetingPersonMobileNumber"
                        name='meetingPersonMobileNumber'
                        value={inputs.meetingPersonMobileNumber||""}
                        onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 me-3">
                            <label for="location" className="form-label">Location</label>
                            <input type="text" className="form-control" id="location"
                            name='location'
                            value={inputs.location||""}
                            onChange={handleChange}/>
                    </div>


                    <div className="mb-3 me-3">
                            <label for="meetingPersonUsername" className="form-label">Meeting Person Registration Number</label>
                            <input type="text" className="form-control" id="meetingPersonUsername"
                            name='meetingPersonUsername'
                            value={inputs.meetingPersonUsername||""}
                            onChange={handleChange}/>
                    </div>

                    <div className="mb-3 me-3">
                            <label for="meetingPersonName" className="form-label">Meeting Person Name *</label>
                            <input type="text" className="form-control" id="meetingPersonName"
                            name='meetingPersonName'
                            value={inputs.meetingPersonName||""}
                            onChange={handleChange}
                            required/>
                    </div>
               
                    <div class="mb-3">
                        <label for="purpose" class="form-label">Purpose of visit *</label>
                        <textarea class="form-control" id="purpose" rows="3" name='purpose'
                        value={inputs.purpose||""}
                        onChange={handleChange} required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Upload visitor photograph</label>
                        <input class="form-control" type="file" id="formFile" name="visitorPhotograph" 
                     value={inputs.visitorPhotograph}
                     onChange={handleChange}/>
                    </div>
                    <div className="mb-3 me-3">
                            <label for="vehicleNumber" className="form-label">Vehicle Number</label>
                            <input type="text" className="form-control" id="vehicleNumber"
                            name='vehicleNumber'
                            value={inputs.vehicleNumber||""}
                            onChange={handleChange}/>
                        </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Upload vehicle photograph</label>
                        <input class="form-control" type="file" id="formFile" name="vehiclePhotograph" 
                     value={inputs.vehiclePhotograph}
                     onChange={handleChange}/>
                    </div>

                    <div className={styles.time}>
                        <div className="mb-3 me-3">
                            <label for="startTime" className="form-label">Sart Time</label>
                            <input type="datetime-local" className="form-control" id="startTime"
                            name='startTime'
                            value={inputs.startTime||""}
                            onChange={handleChange}
                            required/>
                        </div>
                        <div className="mb-3 me-3">
                            <label for="endTime" className="form-label">End Time</label>
                            <input type="datetime-local" className="form-control" id="endTime"
                            name='endTime'
                            value={inputs.endTime||""}
                            onChange={handleChange}
                            required/>
                        </div>
                    </div>
                    
                    

                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

//todo -- remove all onChange attributes except startDate, endDate