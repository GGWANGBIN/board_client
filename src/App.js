import './App.css';
import Login from "./View/Login";
import SignUp from "./View/SignUp";
import Main from "./View/Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PwdChange from "./View/PwdChange";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/SignUp" element={<SignUp/>}></Route>
                    <Route path="/Main" element={<Main/>}></Route>
                    <Route path="/PwdChange" element={<PwdChange/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
