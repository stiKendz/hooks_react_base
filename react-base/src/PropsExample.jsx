import React from "react";

export default function PropsExample(otchestvo, familiya = 'sir') {
    return (
        'Ego otchestvo' + otchestvo + familiya + '"serious"' 
    );
};

// остается под впросом, для чего нужно вот это