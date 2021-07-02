export function handleError(error){
    console.log("API CALL ERROR");
}
export async function handleResponse(response){
    if (Response.OK) return Response.Json();

    if (Response.Status===4000) 
    {
        const error = response.text();
        throw new Error(error);
    }
    
}