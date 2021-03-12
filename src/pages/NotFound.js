import React from "react";
import "../App.css";

function NotFound() {
    return (
        <div className="main-div-layout">
            <div className="not-found">
                <h1 className="page-not-found-title">404</h1>
            <h1 className="page-not-found">Page Not Found</h1>
                <h1 className="not-found-message">The page you were looking for does not exist.</h1>
            </div>
        </div>
    );
}

export default NotFound;
