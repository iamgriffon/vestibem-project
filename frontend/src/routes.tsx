import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';


const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} exact path="/" />
      <Route component={Register} path="/add-point" />
    </BrowserRouter>
  )
}
export default Routes;