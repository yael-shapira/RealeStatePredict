import logo from './logo.svg';
import Car from './Car'
import './App.css';
import React from 'react' 
import { Route, Switch,BrowserRouter } from 'react-router-dom'
import Home from './components/home'
import Layout from './Layout';
 import addNew from './components/addNew'
function App() {
  
  return (
   
    <Layout>
    
    <div className="container mt-2" style={{ marginTop: 40 }}>
        <Switch>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route path="/AddNew">
          <addNew1 /><div>pppppppp</div>
          </Route>
        </Switch>
      </div>
      </Layout>
  );
}
export default App;
