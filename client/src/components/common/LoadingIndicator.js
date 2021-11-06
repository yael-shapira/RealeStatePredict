 
import React ,{useEffect,useMemo,useState} from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";
function LoadingIndicator(props) {
    const { promiseInProgress } = usePromiseTracker();
  
    return promiseInProgress && 
          <h1>Hey some async call in progress ! </h1>;
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
  };

  export default LoadingIndicator 