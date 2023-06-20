import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

function PwdChange() {

    const [id, setId] = useState([]);
    const [currentPassword, setCurrentPassword] = useState([]);
    const [newPassword, setNewPassword] = useState([]);
    const [checkNewPassword, setCheckNewPassword] = useState([]);

    const navigate = useNavigate();
    const { handleSubmit } = useForm();

    useEffect( () => {
        console.log(id,currentPassword,newPassword,checkNewPassword);
    })
    
    const pwdChange = () => {

        if(newPassword != checkNewPassword) {
            return alert("신규 비밀번호 입력이 일치하지 않습니다.")
        }

        axios.get("/MemberCheck",{params:{id: id, password: currentPassword}})
            .then((r) => {
                if(r.data === "missmatch") {
                    return alert("일치하는 회원정보가 없습니다.")
                } else if(r.data === "match") {
                    changePassword();
                }
            })
    }

    const changePassword = () => {
        axios.post("/ChangePassword",{id: id, password: newPassword})
            .then((r) => {
                if (r.status === 200) {
                    alert("비밀번호가 변경되었습니다.");
                    navigate("/");
                }
            })
    }

    return (
        <fieldset className={"pwdChangeForm"}>
            <legend style={{fontSize: "25px", fontWeight: "bold"}}>비밀번호 변경</legend>
            <div>
                <form onSubmit={handleSubmit(pwdChange)}>
                <p><label>아이디 </label><input value={id} style={{marginLeft: "60px"}} onChange={(e) => {setId(e.target.value)}} required/></p>
                <p><label>현재 비밀번호 </label><input type={"password"} value={currentPassword} style={{marginLeft: "10px"}} onChange={(e) => {setCurrentPassword(e.target.value)}} required/></p>
                <p><label>신규 비밀번호 </label><input type={"password"} value={newPassword} style={{marginLeft: "10px"}} onChange={(e) => {setNewPassword(e.target.value)}} required/></p>
                <p style={{marginRight: "70px"}}><label>비밀번호 확인 </label><input type={"password"} value={checkNewPassword} onChange={(e) => {setCheckNewPassword(e.target.value)}} style={{marginLeft: "10px"}} required/></p>
                <button type={"submit"} className={"pwdChangeButton"}>비밀번호 변경하기</button>
                </form>
            </div>
        </fieldset>
    )
}

export default PwdChange