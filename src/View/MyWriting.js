import Header from "../Component/Header";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Paging from "../Component/Paging";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyWriting() {

  const navigate = useNavigate();
  const [boardList,setBoardList] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 15;
  const [secretText, setSecretText] = useState("");
  const count = boardList.length;
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = boardList.slice(indexOfFirstPost, indexOfLastPost);
  const [searchText, setSearchText] = useState("");
  const [searchMenu, setSearchMenu] = useState("");

  useEffect(() => {
    axios.get("/MyBoardList")
        .then((r) => {
          if (r.status === 200) {
            setBoardList(r.data);
          }
        });
  },[secretText]);

  const goSearch = (e) => {
    e.preventDefault();

    axios.get("/MyBoardList",{params:{searchMenu:searchMenu,searchText:searchText}})
        .then((r) => {
          if (r.status === 200) {
            setBoardList(r.data);
          }
    });
  }

  const setPage = (e) => {
    setCurrentPage(e);
  };

  const boardDetail = (id) => {
    navigate("/BoardDetail", { state: { value: id } });
  }

  const secretChange = (boardList) => {

    if(boardList.secret === "공개") {
      if (window.confirm("비공개로 전환하시겠습니까?")) {
         axios.put("/SecretYtoN",{id:boardList.id
        }).then((r)=>{
          setSecretText(boardList.id+"비공개");
         })
      } return false;
    } else {
      if (window.confirm("전체공개로 전환하시겠습니까?")) {
        axios.put("/SecretNtoY",{id:boardList.id
        }).then((r)=>{
          setSecretText(boardList.id+"공개");
        })
      } return false;
    }
  }

  return (
      <div className={"mainFrame"}>
        <Header></Header>
          <h3 style={{marginTop: "15px"}}>나의 게시글</h3>
        <div className={"boardFrame"}>
        <table className={"table table-bordered table-hover"}>
          <thead>
          <tr>
            <th className={"boardNo"}>글번호</th>
            <th className={"boardTitle"}>제목</th>
            <th className={"boardWriter"}>작성자</th>
            <th className={"boardDate"}>게시일</th>
            <th className={"boardHit"}>조회수</th>
            <th className={"boardSecret"}>비밀글</th>
          </tr>
          </thead>
          <tbody>
          {currentPosts && currentPosts.map((boardList)=>(
              <tr>
                <td align="center" key={boardList.id}>{boardList.id}</td>
                <td align="left" onClick={()=>boardDetail(boardList.id)}>
                  <div style={{display:"flex"}}>
                    <span className={"boardTitles"}>
                      {boardList.title}
                    </span>
                    { boardList.commentCnt > 0 ?
                        <span className={"commentCnt"}> [{boardList.commentCnt}]</span> : null
                    }
                  </div>
                </td>
                <td align="center">{boardList.writer}</td>
                <td align="center">{boardList.createDate.substr(0,16)}</td>
                <td align="center">{boardList.hit}</td>
                { boardList.secret == '공개' ?
                <td align="center">
                  <button className={"SecretButtonY"} value={secretText} onClick={(e)=>{secretChange(boardList)}}>{boardList.secret}</button></td> :
                <td align="center">
                  <button className={"SecretButtonN"} value={secretText} onClick={(e)=>{secretChange(boardList)}}>{boardList.secret}</button></td>
                }
              </tr>
          ))}
          </tbody>
        </table>
        </div>
        <Paging page={currentPage} count={count} setPage={setPage}></Paging>
        <form style={{display:"flex"}}>
          <select className={"form-select form-select-sm"} style={{width:"90px",marginRight:"5px"}} onChange={(e)=>{setSearchMenu(e.target.value);}}>
            <option selected value={""}>전체</option>
            <option value={"title"}>글제목</option>
            <option value={"writer"}>작성자</option>
          </select>
          <input className={"form-control"} style={{width:"250px"}} onChange={(e)=>{setSearchText(e.target.value);}}/>
          <button className={"form-control btn btn-secondary"} style={{width:"45px", marginLeft:"5px"}} onClick={(e)=>{goSearch(e)}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search"
                 viewBox="0 0 16 16">
              <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </form>
      </div>
  )
}

export default MyWriting