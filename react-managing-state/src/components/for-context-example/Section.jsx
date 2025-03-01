import React from "react";
import { LevelContext } from "./LevelContext";

export default function Section({ level, children }) {
    return (
        <>
            <LevelContext.Provider value={level}> 
                <section className="section">{ children }</section>
            </LevelContext.Provider>
        </>
    )
}
// <LevelContext.Provider value={level}></LevelContext.Provider> - предоставление контекста
// Объяснение: если какой-либо компонент внутри этой <Section> запрашивает LevelContext, дайте ему этот level.
// Нужно для корректной работы, чтобы не объявлять level для каждого heading отдельно в -
//                           <Section level={1}>
                                // <Heading>Title</Heading>
                            // <Section>
// Heading (из Heading.jsx) будет запрашивать ближайшее значение LevelContext выше с помощью useContext(LevelContext).

