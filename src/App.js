import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/home"
import "./style.scss";
import { BrowserRouter,Routes,Route, Navigate, } from "react-router-dom"; 
import { useContext, } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  const {currentUser}  = useContext(AuthContext);
  
  // if user not had login , then from home page user will be redirected to login page - 
  const ProtectedRoute = ({children})=>
  {
    if(!currentUser)
    {
      return(<Navigate to="/login/"/>);
    }
    return  children
  }


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={
        <ProtectedRoute>      
        <Home/>
        </ProtectedRoute>
        }></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  );
}
export default App;