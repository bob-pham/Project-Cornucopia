import React from "react";
import logo from './logo.svg';
import './css/App.css';
import Homescreen from './Homescreen';
import Login from './Login';

// import {
//   Route,
//   BrowserRouter,
//   Switch,
//   Router,
//   Routes,
//   Navigate,
//   useLocation,
// } from "react-router-dom";

// const LoginRouteComponent = (props) => {
//   const location = useLocation();
//   return <div>{<Login from={location.state.from} />}</div>;
// };


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route 
    //       path="/login"
    //       element={this.LoginRouteComponent}
    //       />
    //     <Route/>
    //   </Routes>
    // </BrowserRouter>
    <Homescreen />

  );
}

export default App;
