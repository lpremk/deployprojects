import { Route, Routes } from 'react-router-dom';

import CreateUser from './auth/user/CreateUser';
import Login from './un-auth/login/Login';
import CreateVisit from './un-auth/visit/CreateVisit';


import Success from './util/Success';
import Failure from './util/Failure';
import OverallTodayVisits from './auth/visit/OverallTodayVisits';
import OverallFromToVisits from './auth/visit/OverallFromToVisits';
import { ReadVisitByIdSearch } from './auth/visit/ReadVisitById';
import { ReadAllVisitsByMobileNumberView } from './auth/visit/ReadAllVisitsByMobileNumber';
import ReadVisitByVisitIdView from './auth/visit/ReadVisitByVisitIdView';
import { ReadAllVisitsByRegistrationIdView } from './auth/visit/ReadAllVisitsByRegistrationIdView';
import { ReadAllVisitsByAuthenticatedUserView } from './auth/visit/ReadAllVisitsByAuthenticatedUserView';
import ReadUserByUsernameView from './auth/user/ReadUserByUsernameView';
import Authenticated from './auth/main/Authenticated';
import Protected from './Protected';
import UnAuthenticated from './un-auth/main/UnAuthenticated';
import ReadUserAuthenticatedView from './auth/user/ReadUserAuthenticatedView';
import UpdatePasswordView from './auth/user/UpdatePasswordView';
import ForgotPassword from './un-auth/login/ForgotPassword';
import ResetPassword from './un-auth/login/ResetPassword';
import CreateExit from './auth/exit/CreateExit';
import {ReadAllExitsByRegistrationIdView} from './auth/exit/ReadAllExitsByRegistrationIdView';

export default function Routing(){
    let jwt;
    jwt=localStorage.getItem("jwt");
    function signInCheck(jwt){
      if(jwt==null){
        return false;
      }
      else{
        return true;
      }
    }
    // function signInStatus(){
    //   console.log('signInStatus '+signInCheck(jwt))
    // }
    return(<>

      <Routes>
      <Route path="/" element={<UnAuthenticated/>} />
      {/* -----------------------------------home------------------------------ */}
      <Route path="/un-auth/login/login" element={<Login/>} />
      <Route path="/un-auth/visit/create-visit" element={<CreateVisit />} />
      <Route path="/un-auth/login/forgot-password" element={<ForgotPassword />} />
      <Route path="/un-auth/login/reset-password" element={<ResetPassword />} />
      {/* -----------------------------------auth------------------------------- */}
      {/* authenticated home */}
      <Route path="/authenticated" 
      element={
       <Protected isSignedIn={signInCheck(jwt)}>
        <Authenticated />
      </Protected>} />
      {/* <Route path="/authenticated" element={<Authenticated />} /> */}
      {/* --------------------------------user---------------------------------- */}
      <Route path="/auth/user/read-user-by-username"
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <ReadUserByUsernameView/>
      </Protected>} />
    
      <Route path="/auth/user/create-user" 
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
      <CreateUser/>
      </Protected>} />
      <Route path="/auth/user/read-user-authenticated-view" 
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
          <ReadUserAuthenticatedView/>
      </Protected>} />
      <Route path="/auth/user/update-password-view" 
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
      <UpdatePasswordView/>
      </Protected>} />
      {/* -------------------------------visit--------------------------------------- */} 
      {/* <Route path="/auth/visit/create-visit" element={<CreateVisit />} /> */}
      <Route path="/auth/visit/overall-today-visits"
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <OverallTodayVisits />
      </Protected>} />
      <Route path="/auth/visit/overall-from-to-visits" 
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <OverallFromToVisits />
      </Protected>} />
      <Route path="/auth/visit/read-visit-by-id-search"
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <ReadVisitByIdSearch />
      </Protected>} />
      <Route path="/auth/visit/read-all-visits-by-mobile-number-view"
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <ReadAllVisitsByMobileNumberView/>
      </Protected>} />
      <Route path="/auth/visit/read-visit-by-visit-id-view"
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
      <ReadVisitByVisitIdView/>
      </Protected>} />
      <Route path="/auth/visit/read-all-visits-by-registration-id-view" 
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <ReadAllVisitsByRegistrationIdView/>
      </Protected>} />
      <Route path="/auth/visit/read-all-visits-by-authenticated-user-view" 
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <ReadAllVisitsByAuthenticatedUserView/>
      </Protected>} />
      {/* -----------------------exit--------------------------- */}

      <Route path="/auth/exit/create-exit" 
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <CreateExit/>
      </Protected>} />

      <Route path="/auth/exit/read-all-exits-by-registration-id-view" 
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <ReadAllExitsByRegistrationIdView/>
      </Protected>} />

      {/* -----------------------util-------------------------- */}
      <Route path="/util/success"
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <Success />
      </Protected>} />
      <Route path="/util/failure"
      element={
        <Protected isSignedIn={signInCheck(jwt)}>
       <Failure />
      </Protected>} />
    </Routes>
    {/* <button onClick={signInStatus}>check sign in status</button> */}
 
    </>);
}