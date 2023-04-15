import { useLocation } from "react-router-dom";

export default function Failure(){
    const location = useLocation();
    return (
    <div>
        <div className="container d-flex justify-content-center">
            <div style={{"color":"red"}} className='patient-acknowledgement'>
                <h6 className="text-center">{location.state.message}</h6>
            </div>
        </div>
    </div>
    )
}