import React from "react";
import { useState } from 'react'

// Массив данных для тестов
const sculptureList = [{
    name: 'Homenaje a la Neurocirugía',
    artist: 'Marta Colvin Andrade',
    description: 'Although Colvin is predominantly known for abstract themes that allude to pre-Hispanic symbols, this gigantic sculpture, an homage to neurosurgery, is one of her most recognizable public art pieces.',
    url: 'https://i.imgur.com/Mx7dA2Y.jpg',
    alt: 'A bronze statue of two crossed hands delicately holding a human brain in their fingertips.'  
  }, {
    name: 'Floralis Genérica',
    artist: 'Eduardo Catalano',
    description: 'This enormous (75 ft. or 23m) silver flower is located in Buenos Aires. It is designed to move, closing its petals in the evening or when strong winds blow and opening them in the morning.',
    url: 'https://i.imgur.com/ZF6s192m.jpg',
    alt: 'A gigantic metallic flower sculpture with reflective mirror-like petals and strong stamens.'
  }, {
    name: 'Eternal Presence',
    artist: 'John Woodrow Wilson',
    description: 'Wilson was known for his preoccupation with equality, social justice, as well as the essential and spiritual qualities of humankind. This massive (7ft. or 2,13m) bronze represents what he described as "a symbolic Black presence infused with a sense of universal humanity."',
    url: 'https://i.imgur.com/aTtVpES.jpg',
    alt: 'The sculpture depicting a human head seems ever-present and solemn. It radiates calm and serenity.'
}]

// Демонстрация работы useState 
export default function ComponentsMemory() {
    const [index, setIndex] = useState(0);

    function handleClick() {
        setIndex(index + 1);
    }

    let sculpture = sculptureList[index];

    return (
        <>
            <div className="sculptures">
                <button onClick={handleClick}>Next</button>
                <h2>
                    <i>{sculpture.name}</i> by  {sculpture.artist}
                </h2>
                <h3>
                    ({index + 1} of {sculptureList.length})
                </h3>
                <img 
                    src={sculpture.url}
                    alt={sculpture.alt}
                />
                <p>
                    {sculpture.description}
                </p>
            </div>
        </>
    );
};
// Демонстрация работы хука useState() - нужен для сохранения состояния в компоненте и его рендера
// const [index, setIndex] = useState(0); - объявление хука (также, используется деструктуризация массива)
// index - переменная состояния, в которой хранится запомненное значение
// setIndex() - функция сеттер, вызываемая для обновления переменной состояния,
// и запускающая(триггерящая) React для повторного рендеринга компонента.(что бы отобразить новый результат)
// useState(0) - сам хук - в скобках (0) - начальное занчение для index
// Все функции в React, начинающиеся с use - назваются хуками

// Хуки - это специальные функции, доступные только во время рендеринга React.
// Они позволяют нам “подключаться, внедряться” к различным функциям React. 
// Могут вызываться только на верхнем уровне компонентов или собственных хуках.

// Когда мы вызываем useState() мы говорим React-у, что бы компонент,
// в котором мы вызываем useState, запомнил что-то.
// В данном примере --- const [index, setIndex] = useState(0); --- мы хотим, что React запомнил index

// !!! Этапы работы --- const [index, setIndex] = useState(0); --- 
// -1. Компонент отображается в первый раз. Поскольку мы передаем 0 в useState в качестве начального значения для index, useState вернет [0, setIndex]. 
// React запомнит, что 0 - это последнее значение переменной состояния (присвоит 0 переменной index).
// -2. Обновление состояния. Когда мы нажимает кнопку, вызывается setIndex(index + 1). 
// index = 0 на момент прибавления к нему 1 => после setIndex(index + 1) => setIndex(1). 
// Эти операции говорят React-у запомнить, что index теперь равен 1, после этого запускается процесс рендеринга.\.
// -3. Второй рендеринг компонента. React по-прежнему видит, что значение по умолчанию все ещё 0 - useState(0).
// Но React помнит, что мы установили index = 1, вместо [0, setIndex] он возвращает [1, setIndex] .
// 0 передался в index после первого рендеринга компонента, так как useState(0).

// демонстрация работы useState хука, который работает с несколькими переменными состояний 
export function MultipleState() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    function handleNextClick() {
        setIndex(index + 1);
    }

    function handleMoreClick() {
        setShowMore(!showMore); // не false => showMode становится true
    }

    let sculpture = sculptureList[index];

    return (
        <>
            <div className="more-sculptures">
                <button onClick={handleNextClick}>
                    Next
                </button>
                <h2>
                    <i>{sculpture.name} </i> 
                    by {sculpture.artist}
                </h2>
                <h3>  
                    ({index + 1} of {sculptureList.length})
                </h3>
                <button onClick={handleMoreClick}>
                    {showMore && <p>{sculpture.description}</p>}
                    Details
                </button>
                <img 
                    src={sculpture.url} 
                    alt={sculpture.alt}
                />
            </div>
        </>
    );
};
// В данном примере работают те же самые примеры правила и конструкции, что и в предидущем.
// Но всё это уже использованием 2-ух пемеременных состояния 

// как useState узнаёт, какую переменную состояния ему вернуть - ???
// Ответ: полагаются на стабильный порядок вызовов (в каком объявляли, в таком и вызываем) - ???

// header.textContent = output.header - конструкция, использующаяся под капотом в setIndex и setShowMore, находящихся в useState
// служит для обновления данных в элементах ---> используется в компоненте под капотом вышеописанных функций

// !!! Состояние является локальным(индивидуальным) для экземпляра компонента на экране. 
// Если мы рендерим один и тот же компонент дважды, каждая копия будет иметь полностью изолированное(индивидуальное) состояние.
// Изменение одного из них не повлияет на другое. !!!
// Демонстрация работы в компоненте ниже
export function PrivateAndIsolated() {
    return (
        <>
            <MultipleState />
            <MultipleState />    
        </>
    );
};
// Изменение состояний одного компонента не влияет на изменение состояний другого компонента 
// (состояния разные у комнентов)