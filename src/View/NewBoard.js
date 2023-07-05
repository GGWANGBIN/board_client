import Header from "../Component/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function NewBoard() {

  const userid = sessionStorage.getItem("userid");
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const navigate = useNavigate();

  const goNewBoard = () => {
    if (title.length <= 0) {
      return alert("제목을 입력해주세요.")
    } else if(content.length <= 0) {
      return alert("내용을 입력해주세요.")
    }

    axios.post("/GoNewBoard",{writer:userid, title:title, content:content})
        .then(r=> {
          alert("게시글 작성 완료.");
          navigate("/Main");
        })
  }


  return (
      <div className={"mainFrame"}>
        <Header></Header>
        <h3 style={{marginTop: "15px"}}>신규 게시글 작성</h3>

        <table className={"table table-bordered"}>
          <thead>
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

        <button style={{float:"right",marginLeft:"10px"}} className={"btn btn-secondary"} onClick={(e) =>{navigate(-1)}}>작성취소</button>
        <button style={{float:"right"}} className={"btn btn-primary"} onClick={goNewBoard}>등록하기</button>

      </div>
  )
} export default NewBoard