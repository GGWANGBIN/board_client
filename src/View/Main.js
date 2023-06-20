import Header from "../Component/Header";
import {useNavigate} from "react-router-dom";
import Contents from "../Component/Contents";
import "../custCSS.css";

function Main() {

    const navigate = useNavigate();

    return (
        <div className={"mainFrame"}>
            <Header></Header>
            <Contents>ddd</Contents>
        </div>
    )
}

export default Main;