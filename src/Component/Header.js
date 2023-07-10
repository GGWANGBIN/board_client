import {Link, useNavigate} from "react-router-dom";
import "../custCSS.css";
import {useEffect} from "react";

function Header() {

    const navigate = useNavigate();

    useEffect(() => {
        const userid = sessionStorage.getItem("userid");

        if(userid == null) {
            alert("잘못된 접근입니다.");
            navigate("/");
        }
    },);

    const userid = sessionStorage.getItem("userid")
    const Logout = () => {
        alert("로그아웃 되었습니다.");
        sessionStorage.removeItem("userid");
        navigate("/");
    }

    return(
        <div>
          <Link to={"/Main"} className={"headerMenu"}>자유게시판</Link>
           <strong>│</strong>
          <Link to={"/MyWriting"} className={"headerMenu"}>나의 작성글</Link>
           <strong>│</strong>
          <Link to={"/MyComment"} className={"headerMenu"}>나에게 달린 댓글</Link>
          <div style={{float:"right"}}>
            <a>{userid}님 로그인 중입니다. </a>
            <button onClick={Logout}>로그아웃</button>
          </div>
        </div>

    )
}

export default Header;