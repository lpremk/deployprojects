import { useContext, useEffect, useState } from "react";
// import axios from "../../../AxiosInstance";
import axios from "axios";
import ExitContext from "../context/ExiContext";

import properties from "../../../properties.json"

export function ExitModel(props){

    //for exit state
    const state=useContext(ExitContext)

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


    const approveExitByUuHandler=(event)=>{
        event.preventDefault();
        validateDescription(state.state)
        // console.log('submit called')
        
        const formData=new FormData()
        formData.append("id",state.state.id)
        const myInputs = document.getElementById("approveExitByUuForm").elements;
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
                if (!(myInputs[i].type === "submit")&&
                !(myInputs[i].type === "select-one")){
                    formData.append(myInputs[i].name,myInputs[i].value)
                }
            }
          }
            
        // for (var entry of formData.entries()) {
        //     console.log(entry[0]+ ' -- ' + entry[1]); 
        // }
        // console.log(jwt)
        axios({
            method: 'post',
            url: properties.backend_url+'/visit/exit-by-ea',
            data: formData,
            // headers:{"jwt":"Bearer "+jwt}
            headers:{"Authorization":"Bearer "+jwt}
        })
        .then(res=>{
            console.log(res.data)
            
            document.getElementById("approveExitByUuForm").style.display="none";
            document.getElementById("approveExitByUuMsg").style.display="block";
            document.getElementById("approveExitByUuMsg").innerHTML=`<h5 style="color:green;padding:15px">Exit Successfully submitted For VisitId: ${res.data.message}.</h5>`
           
        })
        .catch(err=>{
            document.getElementById("approveExitByUuForm").style.display="none";
            document.getElementById("approveExitByUuMsg").style.display="block";
            document.getElementById("approveExitByUuMsg").innerHTML=`<h5 style="color:red;padding:15px">${err.response.data.message}.</h5>`
            console.log(err)
        })
        
        fetch(properties.backend_url+'/visit/exit-by-ea',{
            method: "POST",
            body: formData,
            
            headers:{
                // "Content-Type": "multipart/form-data",
            "Authorization":"Bearer "+"eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VOSVZFUlNJVFlfVVNFUiIsIlJPTEVfU0VDVVJJVFlfQURNSU4iLCJST0xFX0FQUF9BRE1JTiIsIlJPTEVfRVhJVF9BRE1JTiJdLCJzdWIiOiJhY2Nlc3NhbGwiLCJpYXQiOjE2ODEwOTY2NTgsImV4cCI6MTY4MjgyNDY1OH0.l9I0AjSfGH2PLOcprQiV3B2WgLrL2R4L5QKX4QloKnI",},
        })
        .then(res=>console.log('res '+res.json()))
        .catch(err=>console.log('err'+err))
    }
    function validateDescription(exitState){
        if(exitState.exited==="no"){
            //do nothing
        }
        if(exitState.exited==="yes"){
            if(exitState.description.trim()===""){
                throw new Error();
            }
        }
    }
    return(<>
         <div class="modal fade" id={"exitOfVisitModal2"} tabindex="-1" aria-labelledby="exitOfVisitModal2Label" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exitOfVisitModal2Label">Exit the Visit</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={()=>{
                            document.getElementById("approveExitByUuForm").style.display="block";
                            document.getElementById("approveExitByUuMsg").style.display="none";
                        }}></button>
                    </div>
                    <div id="approveExitByUuMsg"></div>
                    <form id="approveExitByUuForm" onSubmit={approveExitByUuHandler}>
                    <div class="modal-body">
                        <p>Do you want to take any things out side university ?</p>
                        
                        <select class="form-select" aria-label="Default select example" name="exited"
                        onChange={(e) => state.setState({...state.state,exited:e.target.value,})} value={state.state.exited}>
                            <option selected>Select below option</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        {state.state.exited==="yes" && <>
                            <br/>
                            <div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Write Description</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="description"
                                onChange={(e) => state.setState({...state.state,description:e.target.value,})} value={state.state.description}></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Upload Exit photograph</label>
                                <input class="form-control" type="file" id="formFile" name="exitPhotograph" 
                                value={state.state.exitPhotograph}
                                onChange={(e) => state.setState({...state.state,exitPhotograph:e.target.value,})}/>
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