import './App.css';
import {Homepage} from './Homepage';
import {Userdetails} from './Userdetails';
import {Navigationbar} from './Navigationbar';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
   <h3 className="m-3 d-flex justify-content-center">
              iamNEO TALENT CENTER
              
    </h3>

  
<Navigationbar/>
      <Routes>
        <Route path="home" element={<Homepage/>}/>
        <Route path="users" element={<Userdetails/>}/>

      </Routes>

      
    </div>
    </BrowserRouter>
  );
}

export default App;
