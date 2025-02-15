import React from "react";
import { useState } from "react";

export default function App() {
    const [value, valueChange] = useState(0);

    return (
        <div>
            {value}
            <button onClick={() => valueChange(value + 1)}>
                Значение увеличится на 1
            </button>
        </div>
    );
};