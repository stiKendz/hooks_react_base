import React, { useContext } from "react";
import { LevelContext } from "./LevelContent"; 

export default function ThroughSection({ children, isFancy }) {
    const level = useContext(LevelContext);
    return (
        <>
            <section
                className={'section' + (isFancy ? 'fancy' : '')}
            >
                <LevelContext.Provider value={level + 1}>
                    {children}
                </LevelContext.Provider>
            </section>
        </>
    )
}


// !!! разбор по кусочкам !!!
//                 <LevelContext.Provider value={level + 1}>
//                      {children}
//                  </LevelContext.Provider>

// Кусок-1
// LevelContext.Provider - компонент, предоставляющий значение контекста для всех дочерних компонентов, которые подписаны на этот контекст. 
// В данном случае передаст level + 1 во все дочерние компоненты, подписанные на него.

// Кусок-2
// value={level + 1}
// level - переменная, созданная для передачи туда контекста 
// level + 1 - значение, котрое будет передано в контекст.

// Кусок-3
// {children} - пропс, который содержит в себе все ддочерние элементы, переданные в компонент.
// Все дочерние компоненты, которые находятся внутри LevelContext.Provider, будут иметь доступ к значению level + 1 через контекст.

