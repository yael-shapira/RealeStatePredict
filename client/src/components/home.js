 
 
import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
export default function home() {
  
  

    return(
      <>
      <Alert variant="bg-warning">
      <Alert.Heading>Hey, nice to see you !!!</Alert.Heading>
      <p>
      Do you know How much is your apartment worth?
      </p>
      <hr />
      <button  >click me!</button>
      <p className="mb-0">
        
      </p>
    </Alert>
 </>
    
    );
  }
 
