import {useEffect, useState} from "react";
import axios from "axios";
import "../custCSS.css"
import {Link, useNavigate} from "react-router-dom";
import PwdChange from "./PwdChange";
import {useForm} from "react-hook-form";
import {useCookies} from "react-cookie";

function Login() {

    const [cookies, setCookie, removeCookie] = useCookies(["rememberId"]);
    const [id, setId] = useState([]);
    const [password, setPassword] = useState([]);
    const [isRemember, setIsRemember] = useState(false);
    const { handleSubmit } = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (cookies.rememberId !== undefined) {
            setId(cookies.rememberId);
            setIsRemember(true);
        }
    },[]);

    const handleOnChange = (e) => {
        setIsRemember(e.target.checked);
    };

    const loginPro = () => {

        if(isRemember){
            setCookie('rememberId', id, {maxAge: 2000});
        } else {
            removeCookie('rememberId');
        }

        axios.get("/Login",{params:{id: id, password: password}})
            .then((r => {
                if(r.data == "Login") {
                    alert(id + '님 환영합니다.');
                    sessionStorage.setItem("userid", id);
                    navigate("/main");
                } else {
                    return alert("회원정보가 일치하지 않습니다.")
                }
            }))
    }

    return (
        <div className={"loginForm"}>
            <img src={require("../img/logo.jpg")} className={"logo"}/>
            <form onSubmit={handleSubmit(loginPro)} style={{width:"90%"}}>
            <input value={id} className={"loginInput"} onChange={(e) => {setId(e.target.value);}} placeholder="ID" style={{marginBottom: "5px"}} required></input>
            <input type={"password"} value={password} className={"loginInput"} onChange={(e) => {setPassword(e.target.value);}} placeholder={"Password"} required></input>
            <div className={"loginMenu"}>
                <input type={"checkbox"} id={"idCheck"} className={"idCheck"} onChange={handleOnChange} checked={isRemember}/>
                <label for={"idCheck"} className={"LoginMenuText"}>아이디 저장</label>
                <strong>│</strong>
                <Link to="/PwdChange" className={"LoginMenuText"}>비밀번호 변경</Link>
                <strong>│</strong>
                <Link to="/SignUp" className={"LoginMenuText"}>회원가입</Link>
            </div>
            <button className={"loginButton"} type={"submit"}>로그인</button>
            </form>

        </div>


    )
}

export default Login

