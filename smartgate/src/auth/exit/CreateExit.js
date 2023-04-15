import styles from './CreateExit.module.css'
import properties from '../../properties.json'
import axios from "axios";
import { useEffect, useState } from 'react';

export default function CreateExit(){

    const [jwt, setJwt]=useState();

    useEffect(()=>{
        let jwt;
        jwt=localStorage.getItem("jwt");
    
        if(jwt==null){
            setJwt(null)
        }
        else{
            setJwt(jwt)
        }
      },[])

      const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('submit called')
        const formData=new FormData()
        const myInputs = document.getElementById("createExitForm").elements;
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
        for (var entry of formData.entries()) {
            console.log(entry[0]+ ' -- ' + entry[1]); 
        }


            axios({
                method: 'post',
                url: properties.backend_url+'/exit/create',
                headers:{"Authorization":"Bearer "+jwt},
                data:formData
            })
            .then(function (response) {
                console.log(response.data);
                // alert(response.data.message)
                document.getElementById("createExitPage").innerHTML=
                `<p style="color:green;padding:40px;border:3px solid green;font-size:20px;">${response.data.message}</p>`
            })
            .catch(function (error) {
                // console.dir(error)
                document.getElementById("createExitError").innerHTML=
                `<p style="color:red;">${error.response.data.message}</p>`
            });
    

    }

    return (<div>
        <div id="createExitPage" className="container d-flex justify-content-center">
            <div className={`commonStyle ${styles.commonStyle}`}>
                <h3 className='text-center heading'>Exit Form</h3>

                <form id="createExitForm" onSubmit={handleSubmit}>
                  
                    <div className="mb-3">
                        <label for="uuUsername" className="form-label">Registration Id *
                        <div id="visitorMobileError"></div></label>
                        <input type="text" className="form-control" id="uuUsername"
                        name='uuUsername'
                        required/>
                    </div>

                    <div class="mb-3">
                        <label for="description" class="form-label">Description *</label>
                        <textarea class="form-control" id="description" rows="3" name='description'
                        required></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Upload exit photograph</label>
                        <input class="form-control" type="file" id="formFile" name="exitPhotograph" 
                        />
                    </div>

                    <span id="createExitError"></span>

                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}

//todo -- remove all onChange attributes except startDate, endDate