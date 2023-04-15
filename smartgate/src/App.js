import './App.css';
import React, { createContext, useEffect, useState } from 'react'
import Routing from './Routing';
import AuthNavbar from './auth/main/AuthNavbar';
import UnAuthNavbar from './un-auth/main/UnAuthNavbar';

export const JwtContext=createContext()

function App() {


  const [state, setState]=useState({jwt:null,authenticated:false});

  useEffect(()=>{
      let jwt;
      jwt=localStorage.getItem("jwt");
  
      if(jwt==null){
          setState({...state,jwt:null})
          setState({...state,authenticated:false})
      }
      else{
          setState({...state,jwt:jwt})
          setState({...state,authenticated:true})
      }
    },[])

  return (
    <>
      <JwtContext.Provider value={state}>
         <div className='home-page'> 
         {state.authenticated && <>
          <AuthNavbar/><br/>
         </>}
         {!state.authenticated && <>
          <UnAuthNavbar/><br/>
         </>}
          <Routing/> 
        </div> 
        </JwtContext.Provider>
    </>
       
  );
}

export default App;
