 
 
import React ,{useState} from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import {handler, CleanDataAPI } from "../api/realestateApi";

export default function Admin() {
  
 
  function cleanData ()
  {  
    CleanDataAPI().then(alert("clean!!!")); 
  
  }  
  function trainModel (data)
  {  
    CleanDataAPI().then(alert("train the Model!!!"));  
  }  
    return(
      <>
      <div className="container">
        <div className="col-12">
      <div>
   <p className="text-left">
     1.take all data from new table and clean the data<br/>
     2.put all clean data in the cleanTable<br/>
     3. delete all rows from the newTable<br/>
     4.train the model 
     </p>
     <br/>
     <button onClick={cleanData}>Clean the Data</button> <br/>
     <button className="mt-4" onClick={trainModel}>Train the Model</button>
       
</div></div>
      </div>
 </>
    
    );
  }



  
 
