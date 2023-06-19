import React, {useEffect, useState} from 'react';

function PwdChange() {

    const [id, setId] = useState([]);
    const [currentPassword, setCurrentPassword] = useState([]);
    const [newPassword, setNewPassword] = useState([]);
    const [checkNewPassword, setCheckNewPassword] = useState([]);

    useEffect( () => {
        console.log(id,currentPassword,newPassword,checkNewPassword);
    })
    
    const pwdChange = () => {
        alert("ㅇㅇㅇ")
    }

    return (
        <fieldset className={"pwdChangeForm"}>
            <legend style={{fontSize: "25px", fontWeight: "bold"}}>비밀번호 변경</legend>
            <div>
                <p><label>아이디 </label><input value={id} style={{marginLeft: "60px"}} onChange={(e) => {setId(e.target.value)}}/></p>
                <p><label>현재 비밀번호 </label><input value={currentPassword} style={{marginLeft: "10px"}} onChange={(e) => {setCurrentPassword(e.target.value)}}/></p>
                <p><label>신규 비밀번호 </label><input value={newPassword} style={{marginLeft: "10px"}} onChange={(e) => {setNewPassword(e.target.value)}}/></p>
                <p style={{marginRight: "70px"}}><label>비밀번호 확인 </label><input value={checkNewPassword} onChange={(e) => {setCheckNewPassword(e.target.value)}} style={{marginLeft: "10px"}}/></p>
                <button type={"button"} onClick={pwdChange} className={"pwdChangeButton"}>비밀번호 변경하기</button>
            </div>
        </fieldset>
    )
}

export default PwdChange