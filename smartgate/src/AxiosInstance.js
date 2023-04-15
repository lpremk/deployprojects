import axios from "axios";
import properties from './properties.json'

const instance = axios.create({
    baseURL:properties.backend_url,
    headers: {'Content-Type': 'application/json'}
})


initialize()
function initialize(){
   
    // console.log('hello axios instance....')
    let jwt;
    jwt=localStorage.getItem('jwt')

    if(jwt==null){
        instance.defaults.headers.common['Authorization']=''
    }
    else{
        instance.defaults.headers.common['Authorization']='Bearer '+jwt;
    }

}

export default instance;
