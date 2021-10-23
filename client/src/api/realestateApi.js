//import { handleResponse,handleError } from "./apiUtils";
import axios from "axios"

const baseURL = "http://127.0.0.1:8000/api/";

 export async function  RealestateApi ()
{   
    const response = await fetch(`${baseURL}GetRealestateInfo`);
    const json = await response;
    return json;     
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
  const content = await response.json().then(alert("Data Cleaned!!!")); 
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
    const content = await response.json().then(alert("Save Successfully!!!")); 
    console.log(content);
    } 

export async function handler (event) {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": baseURL+"/addNewRecord",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify(event),
    };
    return response;
};

export default RealestateApi;