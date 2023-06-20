import {useNavigate} from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    const userid = sessionStorage.getItem("userid")
    const Logout = () => {
        alert("로그아웃 되었습니다.");
        sessionStorage.removeItem("userid");
        navigate("/");
    }

    return(
        <>
          <a style={{marginLeft:"720px"}}>{userid}님 로그인 중입니다. </a>
          <button onClick={Logout}>로그아웃</button>
        </>

    )
}

export default Header;