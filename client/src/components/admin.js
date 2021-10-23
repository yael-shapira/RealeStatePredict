 
 
import React ,{useEffect,useMemo,useState} from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import {handler, CleanDataAPI ,SaveCleanDataAPI} from "../api/realestateApi";

export default function Admin() {
   const [data,setData]=useState([]);
   const [isLoading,setIsloading] =useState(false);
 
  function cleanData ()
  {  
    CleanDataAPI().then(function(response){
      console.log(response)
      setData(response)
      setIsloading(true)
    });
  }  
  function SaveCleanData (data)
  {  
    SaveCleanDataAPI(data); 
  
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

     1.take all RealeState data from .xlsx file<br/>
     2.take all Locality data from .xlsx file<br/>
     3.Clean all the data<br/>
     4.put all clean data in the cleanTable<br/>

     5.train the model <br/>


     1.take all data from the and clean the data<br/>
     2.put all clean data in the cleanTable<br/>
     3. delete all rows from the newTable<br/>
     4.train the model 
     </p>
     <br/>
     <button onClick={cleanData}>Import File & Clean Data</button> <br/>
     <button  className="mt-4" onClick={() => SaveCleanData(data)}>Save Data to Table</button> <br/>
     <button className="mt-4" onClick={trainModel}>Train the Model</button>
       
</div></div>
      </div>
 </>
    
    );
  }



  
 
