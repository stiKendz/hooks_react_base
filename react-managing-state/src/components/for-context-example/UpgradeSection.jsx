import React from 'react';
import { useContext } from 'react';
import { UpgradeLevelContent } from "./UpgradeLevelContent";

// Поскольку контекст позволяет вам читать информацию из компонента выше, каждый Section мог бы читать level из Section выше, - 
// - и передавать level + 1 вниз автоматически.

// !!! <Section level = {1}> РОДИТЕЛЬСКИЙ ДЛЯ <Section level = {2}> и т.д => контекст будет передаваться от старшего к младшему вниз. !!!

// Чтобы не передавать параметр level в UpgradeSection или Heading ->
// -> <section className="section">
//  <UpgradeLevelContent.Provider value={level + 1}></UpgradeLevelContent.Provider>...
export default function UpgradeSection({ children }) {
    const level = useContext(UpgradeLevelContent); // default - 1
    return (
        <>
            <section className="section">
                <UpgradeLevelContent.Provider value={level + 1}>
                    { children }
                </UpgradeLevelContent.Provider>
            </section>
        </>
    )
}
// Теперь и Heading, и Section читают UpgradeLevelContent, чтобы определить, насколько "глубоко" они находятся. 
// А Section оборачивает свои дочерние компоненты в UpgradeLevelContent, чтобы указать, что все, что находится внутри него, -> 
// -> находится на более "глубоком" уровне.

