//import { handleResponse,handleError } from "./apiUtils";

const baseURL = "http://127.0.0.1:5000/api/";//GetRealestateInfo";

 export async function  RealestateApi ()
{   
    const response = await fetch(`${baseURL}GetRealestateInfo`);
    const json = await response.json();     
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
    const content = await rawResponse.json();
  
    console.log(content);
  } 
export async function  AddRecordApi(newRecord) 
{   
    const response = await fetch(`${baseURL}addNewRecord`,
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // headers:{"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"},
        // // header.Add("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
        // headers: {"Access-Control-Allow-Headers": 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'}, // <-- Specifying the Content-Type          
        body:{ "Sale_value_in_shekels":"1",
        "Rooms":"1",
        "Part_Sold":"1",
        "Area":"1",
        "Sale_Quarter":"1",
        "Sale_Year":"1",
        "Num_Building":"1"
        
    },
        
      });
      const result = await response.text;     
      return result;   
      
    //   .then((response) => response.text())
    //   .then((responseText) => {
    //     alert(responseText);
    //   })
    //   .catch((error) => {
    //       console.error(error);
    //   });

    
    // );
    // const json = await response.json();     
    // return json;   
  
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