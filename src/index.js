import React from "react";
import ReactDOM from "react-dom";
import FirstTask from "./components/FirstTask.jsx";
import SecondTask from "./components/SecondTask.jsx";
import ThirdTask from "./components/ThirdTask.jsx";

ReactDOM.render(
    <>
        <FirstTask taskNumber={1}/>
        <br/>
        <SecondTask taskNumber={2}/>
        <br/>
        <ThirdTask taskNumber={3}/>
        <br/>
    </>
, document.getElementById('root'))