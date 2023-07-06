import Header from "../Component/Header";
import {useEffect, useState} from "react";
import axios from "axios";
import "../custCSS.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router";


function BoardDetail() {
  const location = useLocation();
  let [comment, setComment] = useState("");
  let [boardDetail, setBoardDetail] = useState("");
  let [commentList, setCommentList] = useState("");
  let [dd, setDd] = useState("");
  const [receiveText,setReceiveText] = useState("");
  const navigate = useNavigate();
  const [viewModifyComment,setViewModifyComment] = useState("hideModifyComment");
  const [modifyCommentNo,setModifyCommentNo] = useState("");

  const id = location.state.value;

  const loginUser = sessionStorage.getItem("userid");

  useEffect(() => {
    axios.get("/BoardDetail", {params: {id: id}})
        .then((r) => {
          console.log(r.data)
          setBoardDetail(r.data[0]);
        })
  }, [])

  useEffect(() => {
    axios.get("/GetComment",{params: {id: id}})
        .then((r) => {
          setCommentList(r.data);
        })
  }, [dd])

  console.log(commentList)

  const goMain = () => {
    navigate(-1);
  }

  const goBoardModify = (boardDetail) => {
    navigate("/BoardModify",{ state: { id: id, title:boardDetail.title, content:boardDetail.content}});
  }

  const modifyComment = (content) => {
    setReceiveText(content.content);
    setModifyCommentNo(content.id);
    setViewModifyComment("openModifyComment");
  }

  const goCommentModify = () => {
    if(receiveText.length == 0) {
      return alert("수정할 내용을 입력해주세요.")
    }
    axios.post("ModifyComment",{id:modifyCommentNo, content:receiveText})
        .then(r => {
          alert("댓글이 수정되었습니다.");
          setDd(dd+1);
          setViewModifyComment("hideModifyComment");
        });
  }

  const goComment = () => {
    if(comment.length == 0) {
      return alert("댓글 내용을 입력해주세요.");
    }

    axios.post("/AddComment",{writer: loginUser, content:comment , id:id})
        .then(r => {
          setComment("");
          setDd(dd+1);
    })
  }

  const deleteComment = (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios.delete("/DeleteComment",{data:{id:id}})
          .then((r) => {
            alert("삭제되었습니다.");
            setDd(dd+1);
          })
    } else {
      return false;
    }
  }

  const deleteBoard = (boardNo) => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      axios.delete("/DeleteBoard",{data:{id:boardNo}})
          .then((r) => {
            alert("삭제되었습니다.");
            navigate("/Main");
          })
    } else {
      return false;
    }
  }


  return (
      <div className={"mainFrame"}>
        <Header></Header>
        <h3 style={{marginTop: "15px"}}>게시글 상세페이지</h3>
        <div>
        <table className={"table table-bordered table-secondary"}>
          <tbody>
          <tr>
            <th style={{width: "15%"}}>글번호</th>
            <td>{boardDetail.id}</td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{boardDetail.writer}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td className={"boardDetailTitle"}>{boardDetail.title}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td className={"boardContent"}>{boardDetail.content}</td>
          </tr>
          <tr>
            <th>조회수</th>
            <td>{boardDetail.hit}</td>
          </tr>
          <tr>
            <th>작성일자</th>
            <td>{boardDetail.createDate}</td>
          </tr>
          </tbody>
        </table>
        <button type={"button"} className={"btn btn-sm btn-dark me-2"} onClick={goMain}>뒤로가기</button>
          { boardDetail.writer == loginUser ?
              <>
              <button type={"button"} className={"btn btn-sm btn-primary me-2"} onClick={(e) => {goBoardModify(boardDetail)}}>수정</button>
              <button type={"button"} className={"btn btn-sm btn-secondary"} onClick={(e) => {deleteBoard(boardDetail.id)}}>삭제</button>
              </>
              : null
          }
        </div>
        <div style={{marginTop: "20px"}}>
          <form>
            <div className="input-group mb-2">
              <span className="input-group-text" id="inputGroup-sizing-default">댓글</span>
              <input type="text" value={comment} className="form-control" onChange={(e) => {setComment(e.target.value);}}/>
              <button type={"button"} className={"btn btn-dark"} onClick={goComment}>등록</button>
            </div>
          </form>
        </div>

        <h4 style={{margin:"20px 0 10px 0"}}>댓글목록</h4>


        <div className={viewModifyComment}>
          <div className={"input-group mb-2"}>
            <span className="input-group-text" id="inputGroup-sizing-default">댓글수정</span>
            <input className="form-control" value={receiveText} onChange={(e) => {setReceiveText(e.target.value);}}></input>
            <button className={"btn btn-success me-1 ms-1"} onClick={(e) => {goCommentModify()}} style={{borderRadius:"5px"}}>수정</button>
            <button className={"btn btn-secondary"} onClick={(e) => {setViewModifyComment("hideModifyComment")}} style={{borderRadius:"5px"}}>취소</button>
          </div>
        </div>

        <div className={"commentFrame"}>
        <table>
          <thead className={"commentMenuFrame"}>
          <tr>
            <th style={{width: "130px"}} className={"commentMenu"}>작성자</th>
            <th style={{width: "610px",paddingLeft:"250px"}}>내용</th>
            <th style={{paddingLeft:"40px"}}>작성시기</th>
            <th style={{border:"1px solid white"}}></th>
          </tr>
          </thead>

          <tbody style={{borderBottom:"solid 1px darkgrey"}}>
          {commentList && commentList.map((commentList)=>(
          <tr>
            <td className={"commentText"}>{commentList.writer}</td>
            {commentList.secret == '공개' ?
            <td className={"commentContent"}>{commentList.content}</td> :
            <td style={{color:"red"}}>게시글 작성자에 의해 블라인드 처리 되었습니다.</td>
            }
            <td>{commentList.createDate.substr(0,16)}</td>
            <td style={{border:"1px white solid"}}>
              {commentList.writer === loginUser ?
              <>
              <button className={"btn btn-sm btn-primary me-1 ms-1"} onClick={(e) => modifyComment(commentList)}>수정</button>
              <button className={"btn btn-sm btn-secondary"} onClick={(e) => {deleteComment(commentList.id)}}>삭제</button>
              </> : null
              }
            </td>
          </tr>
          ))}
          </tbody>
        </table>
        </div>

      </div>
  )
}

export default BoardDetail;