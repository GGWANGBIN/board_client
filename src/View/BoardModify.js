import Header from "../Component/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";

function BoardModify() {
  const location = useLocation();
  const userid = sessionStorage.getItem("userid");
  const [title,setTitle] = useState(location.state.title);
  const [content,setContent] = useState(location.state.content);
  const id = location.state.id;

  const navigate = useNavigate();

  const goModifyBoard = () => {
    if (title.length <= 0) {
      return alert("제목을 입력해주세요.")
    } else if(content.length <= 0) {
      return alert("내용을 입력해주세요.")
    }

    axios.post("/GoModifyBoard",{id:id, title:title, content:content})
        .then(r=> {
          alert("게시글 수정 완료.");
          navigate(-1);
        })
  }


  return (
      <div className={"mainFrame"}>
        <Header></Header>
        <h3 style={{marginTop: "15px"}}>게시글 수정</h3>

        <table className={"table table-bordered"}>
          <thead>
          <tr>
            <th style={{width:"70px"}}>글번호</th>
            <td>{id}</td>
          </tr>
          
          <tr>
            <th style={{width:"70px"}}>작성자</th>
            <td>{userid}</td>
          </tr>
          
          <tr>
            <th style={{paddingLeft:"17px",paddingBottom:"10px"}}>제목</th>
            <th><input style={{width:"100%"}} value={title} onChange={(e) => {setTitle(e.target.value);}}/></th>
          </tr>
          
          </thead>
          <tbody>
          <tr>
            <th style={{paddingLeft:"17px"}}>내용</th>
            <th><textarea style={{width:"100%",height:"500px"}} value={content} onChange={(e) => {setContent(e.target.value);}}></textarea></th>
          </tr>
          </tbody>
        </table>

        <button style={{float:"right",marginLeft:"10px"}} className={"btn btn-secondary"} onClick={(e)=>{navigate(-1)}}>수정취소</button>
        <button style={{float:"right"}} className={"btn btn-primary"} onClick={goModifyBoard}>수정하기</button>

      </div>
  )
} export default BoardModify