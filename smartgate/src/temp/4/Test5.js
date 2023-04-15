// import axios from "axios"
import axios from "../AxiosInstance";


export default function Test5(){
    function getImage(){
        // var img1 = document.createElement("img");
        // img1.src = "http://localhost:8080/image/id/1";
        // document.body.appendChild(img1);
        // document.getElementById("imageLocation").src='http://localhost:8080/image/id/1'
        // axios({
        //     method: 'get',
        //     url: 'http://localhost:8080/image/id/1',
        //     // data:JSON.stringify(inputs)
        //     })
        //     .then(function (response) {
        //         console.log(response);
        //         // document.getElementById("imageLocation").append(response.data)
        //         img1.src = ''+Window.btoa(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        //     // img1.src = "http://localhost:8080/image/id/1";
        //     document.body.appendChild(img1);
    
        // fetch('http://localhost:8080/image/id/1')
        // .then(res=>{
        //     console.log(res);
        //     return res.blob()})
        // .then(
        //     blob=>{
        //         console.log(blob)
        //         const imageUrl = URL.createObjectURL(blob);
        //         var img1 = document.createElement("img");
        //         img1.src = imageUrl;
        //         document.body.appendChild(img1);
        //     }
        // )

        axios({
            method: 'get',
            url: 'http://localhost:8080/image/id/1',
            responseType: "blob"
            })
            .then(function (response) { 
                const imageUrl = URL.createObjectURL(response.data);
                var img1 = document.createElement("img");
                img1.src = imageUrl;
                document.body.appendChild(img1);
            })
            .catch(function (error) {
                console.log(error);
            });
            
        // axios({
        //     method: 'get',
        //     url: '/visitor-photograph/download/1702',
        //     responseType: "blob"
        //     })
        //     .then(function (response) { 
        //         const imageUrl = URL.createObjectURL(response.data);
        //         // var img1 = document.createElement("img");
        //         // img1.src = imageUrl;
        //         // document.body.appendChild(img1);
        //         document.getElementById("myimage").src=imageUrl
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }
    
    return(<>
        <button onClick={getImage}>Get Image</button>
        <button onClick={getImage}>Get Visitor Image</button>
        <div id="imageLocation"></div>
        <img id="myimage" />
    </>)
}