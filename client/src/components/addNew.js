import React from "react";
import { useForm } from "react-hook-form";
import {handler, AddNewRecord, AddRecordApi } from "../api/realestateApi";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
 
export default function Form() {
 const { register, handleSubmit ,formState: { errors }
} = useForm({
  resolver: yupResolver(validationSchema)
});
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Fullname is required'),
  username: Yup.string()
    .required('Username is required')
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must not exceed 20 characters'),
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must not exceed 40 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required')
});
 return (
   <form onSubmit={handleSubmit(data => AddNewRecord(data))} >
     <h1>New Order</h1>
     <label>Sale_value_in_shekels</label>
     <input name="Sale_value_in_shekels" 
     {...register('Sale_value_in_shekels', { required: true })}  className={`form-control ${
      errors.confirmPassword ? 'is-invalid' : ''
    }`}/>



     <label>Area</label>
     <input name="Area" {...register('Area', { required: true })} />
     <label>Num_Building</label>
     <input name="Num_Building" {...register('Num_Building', { required: true })} />
     <label>Part_Sold</label>
     <input name="Part_Sold" {...register('Part_Sold', { required: true })} />
     <label>Rooms</label>
     <input name="Rooms" {...register('Rooms', { required: true })} />
     <label>Sale_Quarter</label>
     <input name="Sale_Quarter" {...register('Sale_Quarter', { required: true })} />
     <label>Sale_Year</label>
     <input name="Sale_Year" {...register('Sale_Year', { required: true })} />
     <input type="submit"/>
   </form>
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