import React from "react";
import { useEffect, useLayoutEffect } from "react";

export default function Effect({data}) {
    useEffect(() => {
        console.log('someone')
    }, []);

    return null;
}