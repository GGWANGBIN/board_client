import {useEffect, useState} from "react";
import axios from "axios";
import "../custCSS.css"
import {Link, useNavigate} from "react-router-dom";

function Login() {

    const [id, setId] = useState([]);
    const [password, setPassword] = useState([]);

    const navigate = useNavigate();

    const loginPro = () => {
        
        if(id.length == 0 || password.length == 0) {
            alert("정보 입력해랑.")
        } else {
            navigate("/Main")
        }
        
        
    }

    return (
        <div className={"loginForm"}>
            <h3>로그인</h3>
            
            <input value={id} onChange={(e) => {setId(e.target.value);}} placeholder="ID" style={{marginBottom:"5px"}}></input>
            <input value={password} onChange={(e) => {setPassword(e.target.value);}} placeholder={"Password"}></input>

                <Link to="/SignUp" className={"SingUpButton"}>회원가입</Link>

            <button className={"loginButton"} onClick={loginPro}>로그인</button>
        </div>
    )
}

export default Login

