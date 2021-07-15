import React ,{useEffect,useMemo,useState} from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table'
import Table from '../components/common/Table'
import {RealestateApi} from '../api/realestateApi'
import Alert from 'react-bootstrap'
 

function RealeStateList() {
  const [data,setData]=useState([]);
  const [isLoading,setIsloading] =useState(false);
  const getData=()=>{
  RealestateApi()
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
        setIsloading(true)
      });
  }
  useEffect(()=>{
    if(data.length===0)
      getData()
  },[])

  const columns = useMemo(
      () => [
        {
              Header: 'Area',
              accessor: 'Area',
            },
            {
              Header: 'Num Building',
              accessor: 'Num_Building',
            },
          
            {
              Header: 'Part Sold',
              accessor: 'Part_Sold',
            },
            {
              Header: 'Rooms',
              accessor: 'Rooms',
            },
            {
              Header: 'Sale Quarter',
              accessor: 'Sale_Quarter',
               
            },
            {
              Header: 'Sale Year',
              accessor: 'Sale_Year',
            },
            {
              Header: 'Sale value in shekels',
              accessor: 'Sale_value_in_shekels',
            },
           
          
        
      ],
      []
    ) 
  return (
    <div className="App">
     {
        <Table columns={columns} data={data} />  
     
     }
    </div>
  );
} 
export default RealeStateList;
  