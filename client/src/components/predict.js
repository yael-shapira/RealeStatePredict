 import React ,{useEffect,useState} from 'react';
import { useForm } from "react-hook-form";
import {handler, AddNewRecord, AddRecordApi } from "../api/realestateApi";
import { yupResolver } from '@hookform/resolvers/yup';
import {GetAllCities} from '../api/realestateApi';
import * as Yup from 'yup';
import {PredictAPI} from "../api/realestateApi";

export default function Form() {
  // const [cities,setCities]=useState([]);
  // const [isLoading,setIsloading] =useState(false);
  
  
  // function getCities(){
  //   GetAllCities()
  //       .then(function(response){
  //         console.log(response)
  //         return response.json();
  //       })
  //       .then(function(myJson) {
  //         console.log(myJson);
  //         setCities(myJson)
  //         setIsloading(true)
  //       });
  //   }
  //   useEffect(()=>{
  //     if(cities.length===0 && !isLoading)
  //       getCities()
  //   },[cities])
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

function predictPrice (data)
  {  
    alert("pred");
    
    PredictAPI().then(function(response){
      console.log(response)
      
    });
  }  
 return (
  <div className="row">
    <div className="col"></div>
    <div className="col-4 ">
    <div className="form-group">
 
   <form onSubmit={handleSubmit(data => predictPrice(data))} >
     <h1 className="text-warning text-center">Predict</h1>
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
        <select name={"select"} placeholder='select a City' className="form-control">

      {/* { cities?.map(option => {
          return (
            <option key={option.CityName} value={option.CityName}>
              {option.CityName ?? option.CityName}
            </option>
          );
      })}  */}
    </select></div>
     <div class="col text-center">
 
     <input type="submit" value="Predict"  className="mt-4 text-center btn btn-warning"/>
  </div> </form>
  
   </div>
    </div>
    <div className="col"></div>
   </div>
 );
 

  }

 