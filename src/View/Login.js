import {useEffect, useState} from "react";
import axios from "axios";
import "../custCSS.css"
import {Link, useNavigate} from "react-router-dom";
import PwdChange from "./PwdChange";

function Login() {

    const [id, setId] = useState([]);
    const [password, setPassword] = useState([]);

    const navigate = useNavigate();

    const loginPro = () => {

        if (id.length == 0 || password.length == 0) {
            alert("정보 입력해랑.")
        } else {
            navigate("/Main")
        }

    }

    return (
        <div className={"loginForm"}>
            <img src={require("../img/logo.jpg")} className={"logo"}/>

            <input value={id} className={"loginInput"} onChange={(e) => {setId(e.target.value);
            }} placeholder="ID" style={{marginBottom: "5px"}}></input>
            <input value={password} className={"loginInput"} onChange={(e) => {
                setPassword(e.target.value);
            }} placeholder={"Password"}></input>
            <div className={"loginMenu"}>
                <input type={"checkbox"} id={"idCheck"} className={"idCheck"}/>
                <label for={"idCheck"} className={"LoginMenuText"}>아이디 저장</label>
                <strong>│</strong>
                <Link to="/PwdChange" className={"LoginMenuText"}>비밀번호 변경</Link>
                <strong>│</strong>
                <Link to="/SignUp" className={"LoginMenuText"}>회원가입</Link>
            </div>
            <button className={"loginButton"} onClick={loginPro}>로그인</button>

        </div>


    )
}

export default Login

