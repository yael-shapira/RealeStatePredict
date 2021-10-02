import React from "react";
import { useForm } from "react-hook-form";
import {handler, AddNewRecord, AddRecordApi } from "../api/realestateApi";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
 
export default function Form() {
  const validationSchema = Yup.object().shape({
    Sale_value_in_shekels: Yup.string()
    .required('Sale value is required'),    
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

 return (
  <div className="form-group">
   <form onSubmit={handleSubmit(data => AddNewRecord(data))} >
     <h1>New RelaeState Info</h1>
      
     
    <div className="invalid-feedback">{errors.Sale_value_in_shekels?.message}</div>
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
     <input type="submit" value="Predict"/>
   </form>
   </div>
 );
 

  }

 