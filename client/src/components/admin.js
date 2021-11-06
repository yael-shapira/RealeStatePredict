 
 
import React ,{useEffect,useMemo,useState} from 'react'
import { FaSave } from 'react-icons/fa';

import { Route, BrowserRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner';
import {handler, CleanDataAPI ,SaveCleanDataAPI,trainModelAPI} from "../api/realestateApi";
import LoadingIndicator from './common/LoadingIndicator'
export default function Admin() {
   const [data,setData]=useState([]);
   const [isLoading, setLoading] = useState(false);
 
   
  function cleanData ()
  {  
    setLoading(true)
    CleanDataAPI().then(function(response){
      console.log(response)
      setData(response)
      setLoading(false)
       
    });
  }  
  function SaveCleanData (data)
  {  
    SaveCleanDataAPI(data); 
  
  }  
  function trainModel (data)
  {  
    trainModelAPI().then(alert("train the Model!!!"));  
  }  
    return(
      <>
       
      <div className="container">
        <div className="col-12">
      <div className="row">
   <p className="text-left">

   
    
 
{isLoading &&
<>

  <div
    style={{
      width: "100%",
      height: "100",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  ><p>
     1.take all RealeState data from .xlsx file<br/>
     2.take all Locality data from .xlsx file<br/>
     3.Clean all the data<br/>
     4.put all clean data in the cleanTable<br/>
</p>
<br/>
    <Loader type="ThreeDots" color="#FFC107" height="100" width="100" />
  </div>
  </>
}

     
     </p>
     <br/>
     <FaSave />
     <button onClick={cleanData}>Import Files & Clean & Save Data</button> <br/>
      <button className="mt-4" onClick={trainModel}>Train the Model</button>
       
</div></div>
      </div>
 </>
    
    );
  }



  
 
