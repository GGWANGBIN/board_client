import './App.css';
import {useEffect, useState} from 'react';
import axios from "axios";
import Login from "./View/Login";
import SignUp from "./View/SignUp";

function App(){

    const no = 1;

    useEffect(() => {
        axios.post('/hello',{no})
            .then(response => setFf(response.data))
    }, [])

    const [ff,setFf] = useState([]);

    return(
        <Login>
        </Login>
    );
}

export default App;
