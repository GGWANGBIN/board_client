import "../custCSS.css"
import {useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function SignUp() {

    const [name, setName] = useState([]);
    const [id, setId] = useState([]);
    const [password, setPassword] = useState([]);
    const [passwordCheck, setPasswordCheck] = useState([]);
    const [idCheckState, setIdCheckState] = useState(false);
    const [finalId, setFinalId] = useState("");

    const navigate = useNavigate();
    const { handleSubmit } = useForm();

    const idDoubleCheck = () => {

        if(id.length === 0) {
            return alert("아이디를 입력해주세요.");
        }

        axios.get("/IdDoubleCheck", {
            params:{id : id}
        })
             .then((r) => {
                 if (r.status === 200) {
                     if (r.data === 'pass') {
                         alert("이미사용중인 아이디 입니다.");
                     } else {
                         alert("사용가능한 아이디 입니다.");
                         setIdCheckState(true);
                         setFinalId(id);
                     }
                 }
             })
    }

    const signUp = () => {

        const passwordRegEx = /^(?=.*[\W]).{8,}$/;

        if(password != passwordCheck) {
            return alert("비밀번호가 일치하지 않습니다.")
        }

        if(idCheckState == false || finalId != id) {
            return alert("아이디 중복체크를 해주세요.")
        }

        if(password.match(passwordRegEx) == null) {
            return alert("비밀번호는 특수문자를 포함하면서 8자리 이상이어야 합니다.");
        }

        axios.post("/SignUp", {name: name, id:id, password:password})
            .then((r) => {
                if(r.status === 200) {
                    alert("가입성공");
                    navigate("/");
                }
        })
    }

    return (
        <fieldset className={"SignUpForm"}>
            <legend style={{fontSize: "25px", fontWeight: "bold"}} className={"signUpTitle"}>회원가입</legend>
            <button onClick={idDoubleCheck} className={"idDoubleCheckButton btn btn-dark btn-sm"}>중복확인</button>
            <form onSubmit={handleSubmit(signUp)}>
                <p><label>이름 </label><input onChange={(e) => {setName(e.target.value)}} style={{marginLeft: "73px"}} required/></p>
                <p><label>아이디 </label><input onChange={(e) => {setId(e.target.value)}} style={{marginLeft: "58px"}} required/></p>
                <p style={{marginRight: "70px"}}><label>비밀번호 </label><input type={"password"} onChange={(e) => {setPassword(e.target.value)}} style={{marginLeft: "42px"}} required/></p>
                <p style={{marginRight: "70px"}}><label>비밀번호 확인 </label><input type={"password"} onChange={(e) => {setPasswordCheck(e.target.value)}} style={{marginLeft: "5px"}} required/></p>
                <button className={"signUpButton btn btn-primary"} type={"submit"}>가입하기</button>
                <button className={"signUpCancleButton btn btn-secondary"} type={"submit"} onClick={(e) => {navigate(-1)}}>취소하기</button>
            </form>
        </fieldset>
    );
}