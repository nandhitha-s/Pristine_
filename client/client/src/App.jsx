import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login  from './Login.jsx';
import Signup from "./Signup.jsx";
import Dashboard from "./dashboard.jsx"
// import Navbar from "./components/Navbar.jsx";
import  "./index.css";

function App() {

  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/signin' element={<Login/>}/>\
        <Route path='/signup' element={<Signup/>}/>
        {/* <Route path='/' element={<Navbar/>}/> */}
        <Route path="/dashboard" element={<Dashboard />} />

        
      </Routes>
    </BrowserRouter>
  )
}

export default App
