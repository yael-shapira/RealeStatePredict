 
 
import React ,{useEffect,useMemo,useState} from 'react'
import { FaSave ,FaTrain} from 'react-icons/fa';
import { Route, BrowserRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner';
import {handler, CleanDataAPI ,SaveCleanDataAPI,trainModelAPI} from "../api/realestateApi";
import LoadingIndicator from './common/LoadingIndicator'
import { Wave1 ,Wave2} from './common/animation';
import Alert from 'react-bootstrap/Alert';
import AlertMessageBox from './common/AlertMessageBox';
 export default function Admin() {
   const [data,setData]=useState([]);
   const [trainData,setTrainData]=useState([]);
   const [isCleanData, CleanData] = useState(false);
   const [isTrainModel, TrainModel] = useState(false);
 

  function cleanData ()
  {  
    CleanData(true)
    CleanDataAPI().then(function(response){
      console.log(response)
      setData(response)
      CleanData(false)
       
    });
  }  
  
  function trainModel (data)
  {  
    TrainModel(true)
    trainModelAPI().then(function(response){
    setTrainData(response)
    console.log(response)
      
    TrainModel(false)
  
       
    });
  }  
    return(
  
  <>
  <div className="col-12 pt-4">
      <div className="row">
      <div className="col"> </div>
      <div className="col-5 square border border-warning pb-4">
         <h1 className="pt-2 pb-4 font-weight-bold text-center text-warning">Admin </h1>
    <div className="col text-center mb-3">
    <FaSave />
     <button onClick={cleanData} className="btn btn-warning">Clean Data.</button> <br/>
     </div>
     <div className="col text-center">

     <FaTrain/>
       <button  className="btn btn-warning " onClick={trainModel}>Train Model</button>
    </div> {trainData.score  && !isTrainModel  &&
      <h3 className="text-center mt-4 font-weight-bold ">The Score is {trainData.score?.toFixed(2) }</h3>}
     {(isCleanData || isTrainModel) &&
 <>

 <div 
   style={{
     width: "100%",
     height: "100",
     display: "flex",
     justifyContent: "center",
     alignItems: "center" 
   }}
 >
<br/>
   <Loader type="ThreeDots" color="#FFC107" height="100" width="100" />
 </div> 
 <div className="row">
 {isCleanData && 
 <>
 <p className="text-center">
 <Wave1 text="Take all RealeState data from Local file." className="text-warning"></Wave1></p>
 <p className="text-center"><Wave1 text="Take all Locality data from Local file."></Wave1></p>
 <p className="text-center"><Wave1 text="Prepare all the data."></Wave1></p>
 <p className="text-center"><Wave1 text="Store the clean data in RealEstateInfoNew Table."></Wave1>
    
</p></>}

{isTrainModel && 
 <>
 <p>
 <Wave1 text="Train Model." className="text-warning"></Wave1></p>
  
     </>}

 </div>
 </>
}
      </div>
      <div className="col">
       
      </div>
      </div>
    </div>
    
     
    </>
    );
  }



  
 
