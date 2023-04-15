import axios from "../AxiosInstance";

export default function Test4(){

    const testMe=()=>{
        const data = { username: "example" };

        // fetch("demo/accesswithadmin", {
          // fetch("demo/accesswithadmin", {
        // fetch("http://localhost:8080/demo/accesswithadmin", {
        // method: "GET", // or 'PUT'
        // // mode: "no-cors",
        // mode: 'cors',
        // headers: {
        //     "Content-Type": "application/json",
        //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9NQU5BR0VSIl0sInN1YiI6ImFkbWluYW5kbWFuYWdlciIsImlhdCI6MTY3ODUxMjI2NCwiZXhwIjoxNjgwMjQwMjY0fQ.-0fXtwJn7PVAcV5xCFG4Jt9p1dalBBnn7et9SFN9dA0'
        // },
        // // body: JSON.stringify(data),
        // })
        // .then((response) => response.json())
        // .then((data) => {
        //     console.log("hello")
        //     console.log("Success:", data);
        // })
        // .catch((error) => {
        //     console.error("Error:", error);
        // });

        fetch("http://ec2-15-207-87-18.ap-south-1.compute.amazonaws.com:8080/")
        // fetch("http://localhost:8080/")
        .then((response) => response.text())
        .then((data) => console.log(data));


        // axios({
        //     method: 'get',
        //     url: '/demo/accesswithadmin',
        //     // headers: {
        //     //     // "Content-Type": "application/json",
        //     //     // 'Authorization': 'Bearer ' + 
        //     //     // 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIiwiUk9MRV9NQU5BR0VSIl0sInN1YiI6ImFkbWluYW5kbWFuYWdlciIsImlhdCI6MTY3ODUxMjI2NCwiZXhwIjoxNjgwMjQwMjY0fQ.-0fXtwJn7PVAcV5xCFG4Jt9p1dalBBnn7et9SFN9dA0'
        //     //   }
        // }).then(function (response) {
        //     console.log(response.data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   }); 
    }

    return(<>
    <p>I am from test4</p>
    <button onClick={testMe}>Test me</button>
    </>);
}