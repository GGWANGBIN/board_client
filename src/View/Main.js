import Header from "../Component/Header";
import {Link, useNavigate} from "react-router-dom";
import "../custCSS.css";
import {useEffect, useState} from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Paging from "../Component/Paging";
import SearchBar from "../Component/SearchBar";


function Main() {

    const navigate = useNavigate();
    const [boardList,setBoardList] = useState("");
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(15);
    const [searchText, setSearchText] = useState("");
    const [searchMenu, setSearchMenu] = useState("");

    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState(0);

    useEffect(() => {
      setCount(boardList.length);
      setIndexOfLastPost(currentPage * postPerPage);
      setIndexOfFirstPost(indexOfLastPost - postPerPage);
      setCurrentPosts(boardList.slice(indexOfFirstPost, indexOfLastPost));
    }, [currentPage, indexOfFirstPost, indexOfLastPost, boardList, postPerPage]);

    useEffect(() => {
        axios.get("/BoardList")
            .then((r) => {
                if (r.status === 200) {
                    setBoardList(r.data);
                }
            });
    },[]);

    const setPage = (e) => {
      setCurrentPage(e);
    };

    const goSearch = (e) => {
      e.preventDefault();

      axios.get("/MyBoardList",{params:{searchMenu:searchMenu,searchText:searchText}})
          .then((r) => {
            if (r.status === 200) {
              setBoardList(r.data);
            }
          });
    }

    const boardDetail = (id) => {
       navigate("/BoardDetail", { state: { value: id } });
    }

    const newBoard = () => {
      navigate("/NewBoard");
    }

    return (
        <div className={"mainFrame"}>
            <Header></Header>
            <div style={{display:"flex"}}>
            <h3 style={{marginTop: "15px"}}>게시글 리스트</h3>
            <button className={"newBoardBtn"} onClick={newBoard}>글쓰기</button>
            </div>
            <div className={"boardFrame"}>
            <table className={"table table-bordered table-hover"}>
                <thead>
                <tr>
                    <th className={"boardNo"}>글번호</th>
                    <th className={"boardTitle"}>제목</th>
                    <th className={"boardWriter"}>작성자</th>
                    <th className={"boardDate"}>게시일</th>
                    <th className={"boardHit"}>조회수</th>
                </tr>
                </thead>
                <tbody>
                    {currentPosts && currentPosts.map((boardList)=>(
                        <tr>
                        <td align="center" key={boardList.id}>{boardList.id}</td>
                        <td align="left" onClick={(e)=>boardDetail(boardList.id)}>
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

export default Main;