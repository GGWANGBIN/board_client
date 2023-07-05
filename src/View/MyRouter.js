import Login from "./Login";
import SignUp from "./SignUp";
import Main from "./Main";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PwdChange from "./PwdChange";
import MyWriting from "./MyWriting";
import BoardDetail from "./BoardDetail";
import NewBoard from "./NewBoard";
import BoardModify from "./BoardModify";
import MyComment from "./MyComment";

function MyRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/SignUp" element={<SignUp/>}></Route>
                    <Route path="/Main" element={<Main/>}></Route>
                    <Route path="/PwdChange" element={<PwdChange/>}></Route>
                    <Route path="/MyWriting" element={<MyWriting/>}></Route>
                    <Route path="/BoardDetail" element={<BoardDetail/>}></Route>
                    <Route path="/NewBoard" element={<NewBoard/>}></Route>
                    <Route path="/BoardModify" element={<BoardModify/>}></Route>
                    <Route path="/MyComment" element={<MyComment/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default MyRouter;
