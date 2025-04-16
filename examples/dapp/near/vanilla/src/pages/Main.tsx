import React, { useEffect } from "react";
import { useNearDApp } from "../providers/NearDAppProvider";

const Main: React.FC = () => {
    return (
        <div className="main-container">
            <h1>Main Page</h1>
            <p>This is the main page of our application.</p>
        </div>
    );
};

export default Main;
