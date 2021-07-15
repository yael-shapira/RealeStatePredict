import React from "react";
import { useForm } from "react-hook-form";
import {handler, AddNewRecord, AddRecordApi } from "../api/realestateApi";
import { yupResolver } from '@hookform/resolvers/yup';
import Popup from 'reactjs-popup';
import * as Yup from 'yup';
import RealeStateList from "./realestateList";
 
export default function Form() {
  const [realestates, setRealestates] = React.useState([]);
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
function test (data)
{  
  AddNewRecord(data).then(setRealestates(([data,...realestates])));  
  if(true)
    return <RealeStateList></RealeStateList>

}  
 return (
  <div className="form-group">
   <form onSubmit={handleSubmit(data => test(data))}>
   {/* {handleSubmit(data => AddNewRecord(data).then(setRealestates(([...realestates, data])); */}
     <h1>New RelaeState Info</h1>
     <label>Sale_value_in_shekels</label>
     <input name="Sale_value_in_shekels" 
     {...register('Sale_value_in_shekels', { required: true })} 
      className={`form-control ${
      errors.Sale_value_in_shekels ? 'is-invalid' : ''
    }`}/>
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
     <input type="submit"/>
   </form>
   </div>
 );
 

  }



// import React ,{useEffect,useState} from 'react';
// import styled from 'styled-components'
// import { useTable } from 'react-table'
// import { Button, FormGroup,Form, FormControl, ControlLabel } from "react-bootstrap";
// import { AddRecordApi } from '../api/realestateApi';
// function addNew() {
//   //const [formData, updateFormData] = useState(initialFormData);
  
  
//   const handleSubmit = event => {
    
   
//     console.log(event);
//     alert(
//       "ss"
//     );
//     //   .then(res=>{
//     //     console.log(res);
//     //     console.log(res.data);
//     //     window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
//     //   })
//   }
//   return (
//     <>
//     <h2>Add New Record</h2>
//     <Form className="pt-1 pl-4 pr-4 pb-0" onSubmit={handleSubmit}>
//   <Form.Group controlId="Sale_value_in_shekels" >
//     <Form.Label>Sale value in shekels</Form.Label>  
//     <Form.Control type="text"   />  
//   </Form.Group>

//   <Form.Group controlId="Area" className="pt-4">
//     <Form.Label>Area</Form.Label>
//     <Form.Control type="text"   />
//   </Form.Group>
//   <Form.Group controlId="Num_Building" className="pt-4">
//   <Form.Label>Num Building</Form.Label>
//     <Form.Control type="text" label="Num Building" />
//   </Form.Group>
//   <Form.Group controlId="Part_Sold" className="pt-4">
//   <Form.Label>Part Sold</Form.Label>
//     <Form.Control type="text" label="Part Sold" />
//   </Form.Group>

//   <Form.Group controlId="Rooms" className="pt-4">
//   <Form.Label>Rooms</Form.Label>
//     <Form.Control type="text" label="Rooms" />
//   </Form.Group>
  
//   <Form.Group controlId="Sale_Quarter" className="pt-4">
//   <Form.Label>Sale Quarter</Form.Label>
//     <Form.Control type="text" label="Sale Quarter" />
//   </Form.Group>

//   <Form.Group controlId="Sale_Year" className="pt-4">
//   <Form.Label>Sale Year</Form.Label>
//     <Form.Control type="text" label="Sale Year" />
//   </Form.Group>
 
//   <Button variant="primary" type="submit" onSubmit={alert('Form submitted!')} >
//     Add Record
//   </Button>
// </Form>
 
//  </>
//   );
// }

// export default addNew;