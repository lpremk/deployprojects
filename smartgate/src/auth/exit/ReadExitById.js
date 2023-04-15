import { useEffect, useState } from "react";
import axios from "../../AxiosInstance";
import styles from "./ReadExitById.module.css";

export default function ReadExitById(props){
    const [exit, setExit]=useState()
    useEffect(()=>{
        axios({
            method: 'post',
            url: '/exit/read-by-id',
            data:JSON.stringify({
                id: props.exitId
            })
        })
        .then(function (response) {
            console.log(response.data);
            setExit(response.data);
            // alert(response.data.message)
            document.getElementById("createExitPage").innerHTML=
            `<p style="color:green;padding:40px;border:3px solid green;font-size:20px;">${response.data.message}</p>`
        })
        .catch(function (error) {
            // console.dir(error)
            document.getElementById("createExitError").innerHTML=
            `<p style="color:red;">${error.response.data.message}</p>`
        });
    },[])

    return(<>
    {
        (exit!==undefined) &&
        <div className="container d-flex justify-content-center">
            <div>
                <p><spna className={styles.name}>Exit Admin Registration Id </spna> <span className={styles.value}> : {exit.eaUsername}</span></p>
                <p><span className={styles.name}>University User Registration Id</span> <span className={styles.value}>: {exit.uuUsername}</span></p>
                <p><span className={styles.name}>Description</span> <span className={styles.value}>: {exit.description}</span></p>
                <p><span className={styles.name}>Created Time</span> <span className={styles.value}>: {exit.createdTime}</span></p>
                <p><span className={styles.name}>Exit Approved By Ea</span> <span className={styles.value}> : {exit.exitTimeByEa}</span></p>
            </div>
        </div>
    }
    </>);
}