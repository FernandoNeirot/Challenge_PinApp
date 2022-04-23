import React from 'react'
import { ToastContainer } from 'react-toastify';
import RoutesList from './routes/RoutesList';

function App() {
  return (
    <React.Fragment>
    <ToastContainer/>
      <RoutesList />
    </React.Fragment>
    
  );
}

export default App;
