import Header from "../Component/Header";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Paging from "../Component/Paging";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../custCSS.css";

function MyComment() {

  const navigate = useNavigate();
  const [commentList,setCommentList] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [secretText, setSecretText] = useState("");
  const postPerPage = 15;
  const count = commentList.length;
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = commentList.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    axios.get("/MyComment")
        .then((r) => {
          if (r.status === 200) {
            setCommentList(r.data)
          }
        });
  },[secretText]);

  const setPage = (e) => {
    setCurrentPage(e);
  };

  const boardDetail = (id) => {
    navigate("/BoardDetail", { state: { value: id } });
  }

  const secretChange = (commentList) => {

    if(commentList.secret === "공개") {
      if (window.confirm("비공개로 전환하시겠습니까?")) {
        axios.put("/SecretYtoNComment",{id:commentList.commentId
        }).then((r)=>{
          setSecretText(commentList.id+"비공개");
        })
      } return false;
    } else {
      if (window.confirm("전체공개로 전환하시겠습니까?")) {
        axios.put("/SecretNtoYComment",{id:commentList.commentId
        }).then((r)=>{
          setSecretText(commentList.id+"공개");
        })
      } return false;
    }
  }


  return (
      <div className={"mainFrame"}>
        <Header></Header>
        <h3 style={{marginTop: "15px"}}>나에게 달린 댓글</h3>
        <div className={"boardFrame"}>
        <table className={"table table-bordered table-hover"}>
          <thead>
          <tr>
            <th className={"boardNo"} style={{width:"7%"}}>글 번호</th>
            <th className={"boardTitle"} style={{width:"20%"}}>글 제목</th>
            <th className={"boardWriter"} style={{width:"23%"}}>댓글내용</th>
            <th className={"boardWriter"} style={{width:"10%"}}>작성자</th>
            <th className={"boardDate"} style={{width:"13%"}}>게시일</th>
            <th className={"boardSecret"} style={{width:"8%"}}>비밀댓글</th>
          </tr>
          </thead>
          <tbody>
          {currentPosts && currentPosts.map((commentList)=>(
              <tr>
                <td align="center" key={commentList.id}>{commentList.id}</td>
                <td align="left" onClick={()=>boardDetail(commentList.id)}>
                  <div style={{display:"flex"}}>
                    <span className={"parentTitles"}>
                      {commentList.title}
                    </span>
                    { commentList.commentCnt > 0 ?
                        <span className={"commentCnt"}> [{commentList.commentCnt}]</span> : null
                    }
                  </div>
                </td>
                <td align="left" className={"ChildCommentContent"}>{commentList.content}</td>
                <td align="center">{commentList.writer}</td>
                <td align="center">{commentList.createDate.substr(0,16).replace('T',' ')}</td>
                { commentList.secret == '공개' ?
                    <td align="center">
                      <button className={"SecretButtonY"} value={secretText} onClick={(e)=>{secretChange(commentList)}}>{commentList.secret}</button></td> :
                    <td align="center">
                      <button className={"SecretButtonN"} value={secretText} onClick={(e)=>{secretChange(commentList)}}>{commentList.secret}</button></td>
                }
              </tr>
          ))}
          </tbody>
        </table>
        </div>
        <Paging page={currentPage} count={count} setPage={setPage}></Paging>
      </div>
  )
}

export default MyComment