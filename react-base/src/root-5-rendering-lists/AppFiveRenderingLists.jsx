import React from "react";
import AllLists from "./components/Lists";

export default function AppFiveRenderingLists() {
    return(
        <>
            <h1 className="module-five-text">Часть 5 - рендеринг списков</h1>
            <div className="lists-component">
                <AllLists />
            </div>
        </>
    );
};