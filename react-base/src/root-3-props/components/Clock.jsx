import React from "react";

export default function Clock({ color, time }) {
    return(
        <>
            <h1 style={{ color: color }}>
                {time}
            </h1>
        </>
    );
};

// Пропсы в данном примере могут быть не только статичными, но и динамичными.
// time - может меняться каждую секунду 
// color - меняется при изменениии цвета