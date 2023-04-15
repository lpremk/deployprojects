import { createContext, useState } from "react";


const ExitContext=createContext()
export default ExitContext;

export const ExitState=(props)=>{
    const [state, setState]=useState({description:"",
    exited:"no",
    exitPhotograph:""});

    return(
        <ExitContext.Provider value={{state,setState}}>
            {props.children}
        </ExitContext.Provider>
    )
}
