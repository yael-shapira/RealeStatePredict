 
 
import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
// import Carousel from 'react-material-ui-carousel'
import Carousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

 
import { Paper, Button } from '@mui/material'
export default function home() {
 
 

    return(
       
   <div className="pt-0 mt-0 bg-warning mb-0 pb-0">
       
      <Carousel />
      </div>
     
 
    
    );
  }
 

