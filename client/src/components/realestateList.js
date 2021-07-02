import React ,{useEffect,useMemo} from 'react';
import styled from 'styled-components'
import { useTable } from 'react-table'
import Table from '../components/common/Table'
import {RealestateApi} from '../api/realestateApi'

import Alert from 'react-bootstrap'

  
function RealeStateList () {
  const [realestates, setRealestates] = React.useState([]);

  useEffect(() => {
    async function fetchRealestate() {     
       const json = await RealestateApi()       
       setRealestates(json);    }
    fetchRealestate();
}  , []);
    
 
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
   <div className="row">
     <div className="col-12 pl-4 ml-4">
    <Table columns={columns} data={realestates} />  </div>
    </div>
  //<tablepa
 );
 }
export default RealeStateList;
  