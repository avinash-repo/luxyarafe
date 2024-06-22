import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Col } from "react-bootstrap";

import "./Loader.scss";
const Loader = ({ size }) => {
  return <div style={{ width: size, height: size }} className="loader"></div>;
};
export const Loader1 = ({ size }) => {
  return <div style={{ width: size, height: size }} className="loader1"></div>;
};
export const Loader2 = ({ size }) => {
  return <div style={{ width: size, height: size }} className="loader2"></div>;
};
export const Loader4 = ({ size }) => {
  return <div style={{ width: size, height: size }} className="loader4"></div>;
};
export const Loader3 = () => {
  return (
    <div md={8} style={{  display: "flex", flexDirection:"column" }}>
      <div style={{  display: "flex", }}>
        <Skeleton height={"60%"} width={"30%"} />
        <Skeleton height={"60%"} width={"30%"} />
      </div>
      <div style={{  display: "flex", }}>
        <Skeleton height={"60%"} width={"30%"} />
        <Skeleton height={"60%"} width={"30%"} />
      </div>
      <div style={{  display: "flex", }}>
        <Skeleton height={"60%"} width={"30%"} />
        <Skeleton height={"60%"} width={"30%"} />
      </div>
      
     
    </div>
  );
};
export const Loader5 = () => {
  return (
    <div style={{display:"flex", width:"100%",justifyContent:"center",alignItems:"center"}}>
       <div style={{ width:"90%",textAlign:"center"}}>
        <Skeleton width={"90%"}  style={{ lineHeight: 12, margin:"45px 0", padding:"0px 20px"}}/>  
       </div>
       <div style={{ width:"90%",textAlign:"center"}}>
        <Skeleton width={"90%"}  style={{ lineHeight: 12, margin:"45px 0",padding:"0 20px"}}/>  
        
       </div>
    </div>
   
  );
};
export const Loader6 = () => {
  return (
    <div style={{display:"flex",flexDirection:"column", width:"70%",justifyContent:"center",alignItems:"center"}}>
       <div style={{ width:"90%",textAlign:"center"}}>
        <Skeleton width={"90%"}  style={{ lineHeight: 12, margin:"10px 0", padding:"0px 20px"}}/>  
       </div>
       <div style={{ width:"90%",textAlign:"center"}}>
        <Skeleton width={"90%"}  style={{ lineHeight: 12, margin:"10px 0",padding:"0 20px"}}/>  
        
       </div>
    </div>
   
  );
};




export default Loader;
