import React from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import {
      BrowserRouter as Router,
      Switch,
      Route,
      useParams,
    } from "react-router-dom";

 import Home from './components/home'
 import AddNew from './components/addNew'
 import Predict from './components/predict'
 import RealestateList from './components/realestateList'
const NavigationBar=()=>{ 
           return(
                         <Router>
                              <Navbar className="bg-warning text-dark ont-weight-bold" expand="lg" sticky="top">
                                  <Navbar.Brand href="#home">Predict Real estate price  </Navbar.Brand>
                                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                  <Navbar.Collapse id="basic-navbar-nav">
                                      <Nav className="mr-auto">
                                      <Nav.Link href="/home">Home</Nav.Link>
                                      <Nav.Link href="/realestatelist">Realestate List</Nav.Link>
                                      <Nav.Link href="/AddNew">Add New Details</Nav.Link>
                                      <Nav.Link href="/Predict">Predict</Nav.Link>
                                      <Nav.Link href="/Admin">Admin</Nav.Link>
                                       <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                          <NavDropdown.Divider />
                                          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                      </NavDropdown> 
                                      </Nav>
                                      {/* <Form inline>
                                      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                      <Button variant="outline-success">Search</Button>
                                      </Form> */}
                                  </Navbar.Collapse>
                              </Navbar>
                              <br />
                               <Switch>
                                  <Route exact path="/">
                                       <Home/>
                                  </Route>
                                  <Route path="/home">
                                      <Home/>
                                  </Route>
                                  <Route path="/addNew">
                                      <AddNew/>
                                  </Route>
                                  <Route path="/predict">
                                      <Predict/>
                                  </Route>
                                  <Route path="/realestateList">
                                      <RealestateList/>
                                  </Route>
                              </Switch> 
                          </Router> 
                     
          )  
      }
 
   
export default NavigationBar