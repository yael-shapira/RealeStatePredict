//import { handleResponse,handleError } from "./apiUtils";
import axios from "axios"

const baseURL = "http://127.0.0.1:8000/api/";

 export async function  RealestateApi ()
{   
    const response = await fetch(`${baseURL}GetRealestateInfo`);
    const json = await response;
    return json;     
}

export async function  GetAllCities ()
{   
    const response = await fetch(`${baseURL}GetCityies`);
    const json = await response;
    return json;     
}



export async function PredictAPI (predictData) {
  const response = await fetch(`${baseURL}predict`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Content-Type': 'application/json'     
    },
    body:JSON.stringify(predictData),    
 });
  const content = await response.json().then(alert("The prediction completed successfully!")); 
  return content;
  } 

export async function AddNewRecord (newRecord) {
  const rawResponse = await fetch(`${baseURL}addNewRecord`, {
    method: 'POST',
    headers: {       
      'Content-Type': 'application/json'         
    },
    body:JSON.stringify(newRecord),    
  });
  const content = await rawResponse.json().then(alert("New Information has benn added to the Data")); 
  console.log(content);
} 
      
export async function CleanDataAPI () {
  const response = await fetch(`${baseURL}cleanData`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Content-Type': 'application/json'     
    },
 });
  const content = await response.json().then(alert("The transaction completed successfully!")); 
  return content;
  } 

export async function SaveCleanDataAPI (data) {
    const response = await fetch(`${baseURL}saveToCleanTable`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json'     
      },
      body:JSON.stringify(data),    
   });
    const content = await response.json().then(alert("The transaction completed successfully!")); 
    console.log(content);
    } 

 
export async function trainModelAPI (data) {
  const response = await fetch(`${baseURL}trainModel`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Access-Control-Allow-Origin' : '*',
      'Content-Type': 'application/json'     
    },       
 });
  const content = await response.json().then(alert("The transaction completed successfully!")); 
  console.log(content);
  return content;
  } 

 

export default RealestateApi;