import React ,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import {handler, AddNewRecord, AddRecordApi, PredictAPI, GetAllCities } from "../api/realestateApi";
import { yupResolver } from '@hookform/resolvers/yup';
import Popup from 'reactjs-popup';
import * as Yup from 'yup';
import RealeStateList from "./realestateList";
 
export default function Form() {
  const [realestates, setRealestates] = useState([]);
  const [cities,setCities]=useState([]);
  const [selectedCity,setSelectedCity]=useState([]);
  const [isLoading,setIsloading] =useState(false);
  const [predictData,setPredictData]=useState([]);
  const [isPredict, setIsPredicct] = useState(false);

  const validationSchema = Yup.object().shape({
      Area: Yup.string()
      .required('Area is required'), 
      Num_Building: Yup.string()
      .required('Num Building is required'),       
      Part_Sold: Yup.string()
      .required('Part Sold is required')      ,
      Rooms: Yup.string()
      .required('Rooms is required')      ,
      Sale_Quarter: Yup.string()
      .required('Sale Quarter is required')      ,
      Sale_Year: Yup.string()
      .required('Sale Year is required')      

  });
 const { register, handleSubmit ,formState: { errors }
} = useForm({
  resolver: yupResolver(validationSchema)
});
function handleChange(event) {
    let value = event.target.value;
    setSelectedCity(value);
}

function predictPrice (data)
{  
    const dataWithCity = {...data,city:selectedCity};
  PredictAPI(dataWithCity).then(function(response){
   
    setPredictData(response);
    setIsPredicct(true);
 });
}  
  function getCities(){
    GetAllCities()
        .then(function(response){
          console.log(response)
          return response.json();
        })
        .then(function(myJson) {
          console.log(myJson);
          setCities(myJson)
          setIsloading(true)
        });
    }
    useEffect(()=>{
      if(cities.length===0 && !isLoading)
        getCities()
    },[cities])
 return (
  <div className="row">
    <div className="col"></div>
    <div className="col-5 ">
    <div className="form-group">
   <form onSubmit={handleSubmit(data => predictPrice(data))}>
      <h1 className="text-center text-warning">Predict Details</h1>
   
       <label>Area</label>
     <input name="Area" {...register('Area', { required: true })} 
      className={`form-control ${
        errors.Area ? 'is-invalid' : ''
      }`}/>
     <div className="invalid-feedback">{errors.Area?.message}</div>
     <label>Num_Building</label>
     <input name="Num_Building" {...register('Num_Building', { required: true })} 
      className={`form-control ${
        errors.Num_Building ? 'is-invalid' : ''
      }`}/>
     <div className="invalid-feedback">{errors.Num_Building?.message}</div>
     <label>Part_Sold</label>
     <input name="Part_Sold" {...register('Part_Sold', { required: true })} 
      className={`form-control ${
        errors.Part_Sold ? 'is-invalid' : ''
      }`}/>
     <div className="invalid-feedback">{errors.Part_Sold?.message}</div>
     <label>Rooms</label>
     <input name="Rooms" {...register('Rooms', { required: true })} 
      className={`form-control ${
        errors.Rooms ? 'is-invalid' : ''
      }`}/>
     <div className="invalid-feedback">{errors.Rooms?.message}</div>
     <label>Sale_Quarter</label>
     <input name="Sale_Quarter" {...register('Sale_Quarter', { required: true })} 
      className={`form-control ${
        errors.Sale_Quarter ? 'is-invalid' : ''
      }`}/>
     <div className="invalid-feedback">{errors.Sale_Quarter?.message}</div>
     <label>Sale_Year</label>
     <input name="Sale_Year" {...register('Sale_Year', { required: true })} 
      className={`form-control ${
        errors.Sale_Year ? 'is-invalid' : ''
      }`}/>
     <div className="invalid-feedback">{errors.Sale_Year?.message}</div>
    
     <div> 
     <label>City</label>
        <select name="select" onChange={(e) => handleChange(e)} placeholder='select a City' className="form-control">
        <option key={1} value="select a city">select a city</option>
       { cities?.filter((x)=>x.CityName!=null).map(option => {
          return (
            <option key={option.CityName} value={option.CityName}>
              {option.CityName ?? option.CityName}
            </option>
          );
      })}  
    </select></div>
    <div class="col text-center">
     <input type="submit" value="Predict" className="mt-4 btn btn-warning"/>
     </div>
   </form>
   </div>
   <div> {isPredict &&
      <h3 className="text-center mt-4 font-weight-bold ">The Predict Price is : {predictData.value}
        
         </h3>
   }
 </div>
    </div>
      <div className="col"></div> 
   </div>
 );
 

  }


 