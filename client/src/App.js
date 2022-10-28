import './index.css'
import TodoLocalhost from './Container/TodoLocalhost';
import Navber from './Container/Navber';
import { Routes, Route } from "react-router-dom";
import Login from './Container/Login';
import Register from './Container/Register';

function App() {
    return (
        <>
           <Navber/>
        <Routes>
           <Route path='/' element={<TodoLocalhost/>} />
           <Route path='/login' element={<Login/>} />
           <Route path='/register' element={<Register/>} />
        </Routes>
        </>
    )
}

export default App;