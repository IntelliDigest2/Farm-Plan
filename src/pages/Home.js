import React from "react";
import "../App.css";
import WelcomeMessage from "../components/Welcome";

function Home() {
    return (
        <div className="main-div-layout">
            <WelcomeMessage title="Hello, and Welcome to this Food Waste Tracker Platform!"
            message="This website is currently under constuction, please come back soon to find out what it's all about!"/>
        </div>
    );
}

export default Home;
