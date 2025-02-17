import React from "react";
import PackingList from "./conponents/PackingList";

export default function AppFourRendering() {
    return(
        <>
            <h1 className="root-4-text">4й набор компонентов - рендеринг - находится чуть ниже</h1>
            <div className="root-4-rendering-container">
                <PackingList />
            </div>
        </>
    );
};