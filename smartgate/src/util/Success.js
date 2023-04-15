import { useLocation } from "react-router-dom";

export default function Success(){
    const location = useLocation();
    return (<div className="container d-flex justify-content-center">
        <div className='patient-acknowledgement'>
            <h6 style={{"color":"green"}} className="text-center">{location.state.message}</h6>
        </div>
        </div>
)
}