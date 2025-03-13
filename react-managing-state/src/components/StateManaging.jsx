import React, { useReducer } from "react";
import { useState } from "react";

import Chat from './for-preserving-resetting-state/Chat';
import ContactList from "./for-preserving-resetting-state/ContactList";

import AddTask from './for-state-reducer/AddTask';
import TaskList from './for-state-reducer/TaskList';

import Heading from "./for-context-example/Heading";
import Section from "./for-context-example/Section";
import UpgradeSection from "./for-context-example/upgradeSection";
import UpgradeHeading from "./for-context-example/UpgradeHeading";

import ThroughHeading from './for-through-the-components/ThroughHeading.jsx';
import ThroughSection from './for-through-the-components/ThroughSection.jsx';

import AddTaskRC from "./for-reducer-context/AddTaskRC.jsx";
import TaskListRC from "./for-reducer-context/TaskListRC.jsx";

// Введение в управление состоянем
// Имспользуя React, мы не пишем комманды на подобии - "disable button", "show message" и т.д.
// Мы описываем пользовательский интерфейс, который хотим видеть для различных состояний компонента - 
// - начальное стотояние, состояние ввода, сотояние успешного выполнения. Затем, вызываем изменение состояния -
// - в ответ на ввод каких-либо данных пользователем.

// Форма опроса, использующая переменную состояния для включение/отключения кнопки, и отображения сообщения.
export default function StateManaging() {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('набор...');

    if (status === 'success') {
        return <p>Правильный ответ!</p>
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');

        try {
            await submitForm(answer);
            setStatus('success');
        } catch (err) {
            setStatus('набор...')
            setError(err);
        }
    }

    function handleTextAreaChange(e) {
        setAnswer(e.target.value);
    }

    return (
        <>
            <div className="intermediate-container">
                <h3>Городской опрос</h3>
                <p>
                    В каком городе есть рекламный щит, превращающий воздух в питьевую воду?
                </p>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        value={answer}
                        onChange={handleTextAreaChange}
                        disabled={status === 'submitting'}
                    />
                    <br></br>
                    <button disabled={
                        answer.length === 0 || status === 'submitting'
                    }
                    >
                    Submit
                    </button>
                    {error !== null && 
                        <p className="error">
                            {error.message}
                        </p>
                    }
                </form>
            </div>
        </>
    );
};

function submitForm(answer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let shouldError = answer.toLowerCase() !== 'lima'
            if (shouldError) {
                reject(new Error('Догадка хорошая, но это неправильный ответ. Попробуйте ещё раз'));
            } else {
                resolve();
            }
        }, 2000)
    });
};

// status - набор... - если текст набирается, или ещё не подтвержден в качетве ответа.
// answer - ответ, который воодит пользователь в textarea.

// error - обработка ошибки => в случае непрвильного ответа, промис в submitForm() возращается в стаутсе reject -
// - ошибка. 
// handleSubmit - асинхонная, ожидает выполение промиса - await sumnitForm() в блоке try-catch.
// Если промис выполнился с ошибкой => catch хватает ошибку, переводит status в набор..., в setError помещает err.

// Всё время, пока поле ввода отстается пустым, или ответ проверяется, textarea и button переводятся в состояние disabled -
// - благодаря переменной значения status.

// Если ответ пользователя оказался правильным => вернется <p>Правильный ответ</p> - вместо textarea и button.

// Выбор структурирования состояний 
// Наиболее важный принцип заключается в том, что состояние не должно содержать избыточной или дублирующей информации.
// Если есть ненужное состояние, легко забыть обновить его => приведет к ошибкам. Демонтсрация ниже.
export function ChoosingStateStructure() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [fullName, setFullName] = useState(''); // не обязятельная строка кода, в случае представленном ниже

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
        // setFullName(e.target.value + ' ' + lastName); // неправильно - handleLastNameChange содержит то же самое -
        // - в будущем может возникнуть ошибка
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
        // setFullName(firstName + ' ' + e.target.value); // неправильно - handleFirstNameChange содержит то же самое -
        // - в будущем может возникнуть ошибка
    }

    // Решение проблем выше
    const fullName = firstName + ' ' + lastName; // вычислится во время рендеринга

    return (
        <>
            <div className="state-structure-container">
                <h3>Давайте посмотрим как вас зовут</h3>
                <label>
                    Имя - {' '}
                    <input 
                        value={firstName}
                        onChange={handleFirstNameChange}
                    />
                </label>
                <label>
                    Фамилия - {' '}
                    <input 
                        value={lastName}
                        onChange={handleLastNameChange}
                    />
                </label>
                <p>Ваше полное имя - <b>{fullName}</b></p>
            </div>
        </>
    );
};
// const fullName = firstName + ' ' + lastName; - это кажется небольшим исправлением в коде, -
// - но именно таким образом иправляются многие ошибки в React-е.


// Сообщение, перенаправления состояния, между копмонентами. Как им (состоянием) можно делиться между компонентами.

// lifting state up - распространенной вещи, которую прилется делать на React-е. - 
// - Иногда требуется, чтобы состояние двух компонентов всегда менялось вместе(одновременно - ?). 
// Чтобы сделать это, нужно удалить состояние из них обоих копмонентов, 
// переместить его к их ближайшему общему родительскому элементу, 
// а затем передать это состояние компонентам, через props.
export function SharingState() {
    return (
        <>
            <div className="sharing-state-container">
                <h3>
                    Компонент, демонстрирующий передачу состояния в качестве пропса другому компеоненту - ниже
                </h3>
                <Accordion />
            </div>
        </>
    );
};

export function Accordion() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <>
            <h3>Алматы, Казахстан</h3>
            <Panel 
                title="Про город"
                isActive={activeIndex === 0}
                onShow={() => setActiveIndex(0)}
            >
                С населением около 2 миллионов человек Алматы является крупнейшим городом Казахстана. 
                С 1929 по 1997 год он был его столицей.
            </Panel>
            <Panel 
                title="Этимология" 
                isActive={activeIndex === 1}
                onShow={() => setActiveIndex(1)}
            >
                Имя произошло от <span lang="kk-KZ">алма</span>, 
                Казахское слово означает "яблоко" и часто переводится как "полное яблок". 
                Фактически, регион, окружающий Алматы, считается прародиной яблони,
                а дикий <i lang="la">Malus sieversii</i> 
                считается вероятным кандидатом на роль предка современного домашнего яблока.
            </Panel>
        </>
    );
};

function Panel({
    title,
    children,
    isActive,
    onShow
}) {
    return (
        <>
            <section className="panel">
                <p>{title}</p>
                {isActive ? (
                    <p>{children}</p>) : (
                    <button onClick={onShow}>Показать</button>
                )}
            </section>
        </>
    );
};
// Используем пропс isActive, в который предаём состояие activeIndex, всё предельно просто

// Сохранение и сброс состояния
// Когда мы перерисовываем компонент react-ту важно понять, какие элементы DOM отбросить или обновить, а какие оставить.
// По умолчанию React сохраняет те части дерева, которые "совпадают" с ранее отрисованным деревом компонентов.
// Стандартное поведение чаще всего отрабатывает хорошо, но его может быть недостаточно в ряде случаев.
// Пример-чат мессенджера. Для чата при наборе сообщения и последующем переключении получателя ввод не сбрасывается. 
// В результате пользователь может случайно отправить сообщение не тому человеку. (продемонстрировано ниже)
export function SaveAndResetState() {
    const [to, setTo]= useState(contacts[0]);

    return (
        <>
            <div className="save-and-preserve-container">
                    <ContactList 
                        contacts={contacts}
                        selectedContacts={to}
                        onSelect={(contact) => setTo(contact)}
                    />
                    {/* <Chat contact={to} /> */}
                    <Chat key={to.email} contact={to}/>
            </div>
        </>
    );
};

const contacts = [
    { name: 'Taylor', email: 'taylor@mail.com' },
    { name: 'Alice', email: 'alice@mail.com' },
    { name: 'Bob', email: 'bob@mail.com' },
];

// <Chat contact={to} /> - поле ввода сообщения не будет сбрасываться, так как компонент не сбрасывает своё состояние.
// React позволяет отменить поведение по умолчанию и принудить компонент сбросить свое состояние, -
// - передав ему другой key, например <Chat key={email} />.
// <Chat key={to.email} contact={to}/> - сообщает React-у о том, что если получатель чата другой, - 
// - он долженг рассматриваться как другой компонент Chat, который должен быть создан заново с новыми данными. 

// Извлечение логики состояния в редуктор 
// Компоненты с большим количеством обновлений состояния, распределенных по многим обработчикам событий, - 
// - могут стать непомерно сложными. 
// Reducer, значительно разгружает код, упрощает его чтение.
// В таких случаях мы можем объединить всю логику обновления состояния за пределами вашего компонента в одной функции, называемой редуктором
export function StateReducer() {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    )

    function handleAddTask(text) {
        dispatch({
            // выше type, идут поля для компонента.
            type: 'added',
            // остальные поля идут ниже type.
            nextId: nextId++,
            text: text
        })
    }

    function handleChangeTask(task) {
        dispatch({
            type: 'changed',
            task: task
        })
    }

    function handleDeleteTask(taskId) {
        dispatch({
            type: 'deleted',
            id: taskId
        })
    }

    return (
        <>
            <div className="state-reducer-container">
                <p>Пражская литература</p>
                <AddTask 
                    onAddTask={handleAddTask}
                />
                <TaskList 
                    tasks={tasks}
                    onChangeTask={handleChangeTask}
                    onDeleteTask={handleDeleteTask}
                />
            </div>
        </>
    );
};
// Первый шаг по интеграции reducer.
// Вместо того, что бы указывать React-у что делать, мы указываем, что пользователь что-то сделал ->
// Объект, который мы передаем в dispatch, называется action.
// Action-регулярный JavaScript объект, в который ма сами решаем, что помещать, но он должен ->
// -> должен содержать минимальнкю информацию о том, что произошло - ( type: 'changed','deleted' и т.д )
// По правилам, принято присваивать action строковый тип данных для описания действия. Пример выше

function tasksReducer(tasks, action) {
    // описание состояний, которые React будет возвращать следующими.
    switch (action.type) {
        case 'added' : {
            return [...tasks, {
                id: action.id,
                text: action.text,
                done: false
            }];
        }
        case 'changed': {
            return tasks.map(t => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter(t => t.id !== action.id);
        }
        default: {
            throw Error('Неопознанное действие' + action.type);
        }
    }
};
// Второй шаг по интеграции reducer.
// Функция reducer - фукция, где мы будет описывать логику для наших состояний. Она принимает ->
// -> два аргумента, 1-й - state (в нашем случае tasks), и 2-й - action.
// state - хранит текущее состояние.
// объект action - возвращает следующее сотояние.

// Мы перемещаем в reducer, логигику обработчиков событий наших сотояний -> 
// -> (что бы не описывать их в компонентах, а написать в одном месте) в 3 шага.
// 1. Объявляем текущее состояние (в нашем случае Tasks) в качестве первого аргумента функции.
// 2. Объявление action объекта в качестве второго аргумента.
// 3. Возвращаем следующее состояние из Reducer (редуктора).

// Reducer можно объявить всне нашего компонента, так как он приминает состояние ->
// -> в качестве аргумента (tasks, в нашем случае).

// В Reducer можно использовать и if/else конструкцию, но более читаемым будет вариант с switch/case.

// Использование Reducer,
// Импортируем хук reducer -- import { useReducer } from 'react'; --
// Заменяем useState в наших компонентах на useReducer. -- const [tasks, dispatch] = useReducer(tasksReducer, initialTasks); -- 
// Хук useReducer аналогичен хуку useState, мы должны передать ему начальное состояние, ->
// -> и он возвращает значение с сохранением состояния и способ установки состояния -> 
// -> (в данном случае, функцию dispatch), -> 
// -> но есть небольшие отличия Reducer от State:
// 1. Reducer принимает 2 аргумента: reducer-функцию, и начальное состояние.
// 2. Возвращает: значение с сохраненным состоянием, функцию отправки действий польщователя ->
// -> в Reducer (редуктор) - dispatch.

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];


// Глубокая передача данных с помощью контекста
// Передача информации с помощью пропсов может стать многословной и неудобной, если нам нужно передавать их через -
// множество компонентов или если многимкомпонентам нужнаодна и та же информация.
// Контекст, позволяет родительскому компоненту сделать некоторую информацию доступной для любого компонента в дереве под ним - 
// -независимо от глубины, без явной передачи ее через параметры (пропсы).

// Контекст позволяет родительскому компоненту предоставлять данные всему дереву под ним. 
export function ContextExample() {
    return (
        <>
            <div className="context-example-container">
                <Section level={1}>
                    <Heading>Название</Heading>
                    <Section level={2}>
                        <Heading>Заголовок</Heading>
                        <Heading>Заголовок</Heading>
                        <Heading>Заголовок</Heading>
                        <Section level={3}>
                            <Heading>Подзаголовок</Heading>
                            <Heading>Подзаголовок</Heading>
                            <Heading>Подзаголовок</Heading>
                            <Section level={4}>
                                <Heading>Под-под-заголовок</Heading>
                                <Heading>Под-под-заголовок</Heading>
                                <Heading>Под-под-заголовок</Heading>
                            </Section>
                        </Section>
                    </Section>
                </Section>
            </div>
        </>
    );
};
// !!! <Section level = {1}> РОДИТЕЛЬСКИЙ ДЛЯ <Section level = {2}> и т.д

// Heading.jsx - Вмещает в себя текст, контролируя его размер через <h></h>-теги с помощью level 
// (принимает level для своего размера). - 10 строчка.
// Section.jsx - Вмещает в себя дочерний элемент, в данном случае Heading.jsx. - 11 строчка.
// LevelContext.jsx - В этом файле создается контекст, который в дальшейшем будут использовать компоненты. - 12 строчка.

// <Section level={3}>
//      <Heading>About</Heading>
//      <Heading>Photos</Heading>
//      <Heading>Videos</Heading>
// </Section>
// Как Heading смодет узнать, параметр level - ? (нужно, что бы он запрашивал данные откуда-то выше). 
// Используем для этого контекст. 


//                 <Section level={1}>
//                      <Heading>Название</Heading>
//                 </Section> - пока что не будет рабоать, т.к React не знает где взять контекст. (мы его используем, но всё еще
// не предоставили). 

// !!! Здесь имеется ввиду, что пока компонент использует такое предоставление level компонентам, все заголовки будут = 1 -
// - как указано в дефолтном значении - const LevelContext = createContext(1). (1) - дефолтное значение.
// Для того, что бы такая структра заработала как надо, нужно предоставить контекст с помощью -
// - <LevelContext.Provider value={level}> в Section.jsx. !!!

// <LevelContext.Provider value={level}> - используется для того, чтобы можно было передать параметр в родительский компонент, и -
// - таким образом регулировать поведение дочерних компонентов, использующих этот параметр, не обращаясь к каждому из них по отдельности.

// ???!!! Но почему у меня всё работает корректно и с этой структурой, без <LevelContext.Provider> !!!???
// upd - так и не понял в чем проблема


// Использование и предоставление контекста из одного и того же компонента.
export function ContextExampleUpgrade() {
    return (
        <>
            <div className="upgraded-context-example-container">
                <UpgradeSection>
                    <UpgradeHeading>Название</UpgradeHeading>
                    <UpgradeSection>
                        <UpgradeHeading>Заголовок</UpgradeHeading>
                        <UpgradeHeading>Заголовок</UpgradeHeading>
                        <UpgradeHeading>Заголовок</UpgradeHeading>
                        <UpgradeSection>
                            <UpgradeHeading>Подзаголовок</UpgradeHeading>
                            <UpgradeHeading>Подзаголовок</UpgradeHeading>
                            <UpgradeHeading>Подзаголовок</UpgradeHeading>
                            <UpgradeSection>
                                <UpgradeHeading>Под-под-заголовок</UpgradeHeading>
                                <UpgradeHeading>Под-под-заголовок</UpgradeHeading>
                                <UpgradeHeading>Под-под-заголовок</UpgradeHeading>
                            </UpgradeSection>
                        </UpgradeSection>
                    </UpgradeSection>
                </UpgradeSection>
            </div>
        </>
    );
};
// Чтобы не вводить параметр level для каждой секции вручную -<Section level={4}>- используется конструкция из -
// - /components/UpgradeSection.jsx

// Между компонентом, который предоставляет контекст, и компонентом, который его использует, можно вставить сколько угодно компонентов.
// Прохождение контекста через промежуточные компоненты
export function ThroughTheComponents() {
    return (
        <>
            <div className="through-the-components-container">
                <ThroughSection>
                    <ThroughHeading>Мой профиль</ThroughHeading>
                    <Post 
                        title='Привет путешевственник'
                        body='Прочтите про мои приключения'
                    />
                    <AllPosts />
                </ThroughSection>
            </div>
        </>
    );
};

function AllPosts() {
    return (
        <>
            <ThroughSection>
                <ThroughHeading>Публикации</ThroughHeading>
                <RecentPosts />
            </ThroughSection>
        </>
    )
}

function RecentPosts() {
    return (
        <ThroughSection>
            <ThroughHeading>Последние публикации</ThroughHeading>
            <Post 
                title='Ароматы Лиссабона'
                body='... это Паштел-де-ната'
            />
            <Post 
                title='Буэнос-Айрес это ритм танго'
                body='я люблю это!'
            />
        </ThroughSection>
    );
};

function Post({ title, body }) {
    return (
        <ThroughSection isFancy={true}>
            <ThroughHeading>{title}</ThroughHeading>
            <p>
                <i>{body}</i>
            </p>
        </ThroughSection>
    );
}

// В этом примере один и тот же компонент Post отображается на двух разных уровнях вложенности. 
// <Heading> внутри него (Внутри Post) получает свой уровень автоматически от ближайшего <Section>.
// <Section> определяет контекст для дерева внутри нее, поэтому можно вставить <Heading> куда угодно, и он будет иметь правильный размер.

// Контекст позволяет писать компоненты, которые "адаптируются" к окружению, -> 
// и отображаются по разному в зависимости от того где, или, вернее, в каком контексте они отображаются. 

// !!! Работа контекста может напомнить вам наследование CSS свойств. 
// В CSS вы можете указать color: blue для div, и любой DOM-узел внутри него, независимо от глубины, унаследует этот цвет, ->
// -> если только какой-либо другой DOM-узел в середине не переопределит его с color: green. 
// Аналогично, в React единственный способ переопределить какой-то контекст, идущий сверху, - это обернуть дочерние элементы в провайдер контекста с другим значением.

// В CSS различные свойства, такие как color и background-color, не отменяют друг друга. Мы можем установить color всех div в красный цвет, не влияя на background-color.
// Аналогично, различные контексты React не отменяют друг друга. 
// Каждый контекст, который мы создаем с помощью createContext(), полностью отделен от других, и связывает вместе компоненты, -> 
// -> использующие и предоставляющие этот конкретный контекст. Один компонент может использовать или предоставлять множество различных контекстов без проблем.

// Прежде чем использовать контекст, можно использовать альтернативы в виде:
// 1.Передачи пропсов через дюжину компонентов вниз. Это более трудоемкая задача, но так становится ясно, какие компоненты используют те или иные данные.
// 2.Извлечение компонента и передача JSX как children к ним. Если мы передаем некоторые данные через множество уровней промежуточных компонентов, ->
// которые не используют эти данные (и передают их только дальше вниз), это часто означает, что мы забыли извлечь некоторые компоненты по пути.
// Например, мы передаём пропсы данных, такие как posts, визуальным компонентам, которые не используют их напрямую, например <Layout posts={posts} />. 
// Вместо этого, лучше заставить Layout принимать children в качестве пропса и выводить <Layout><Posts posts={posts} /></Layout>.
// Это уменьшает количество уровней между компонентом, задающим данные, и компонентом, которому они нужны.


// Масштабирование, расширение, используя Reducer и Context.
export default function ScalingUpWithReducerContext() {
    const [tasks, dispatch] = useReducer(
        tasksReducer,
        initialTasks
    );

    function handleAddTask(text) {
        dispatch({
            type: 'added',
            id: nextId++,
            text: text,
        });
    }

    function handleChangeTask(task) {
        dispatch({
            type: 'changed',
            task: task,
        });
    }

    function handleDeleteTask(taskId) {
        dispatch({
            type: 'deleted',
            id: taskId,
        });
    }

    return (
        <>
            <h1>Day off in Kyoto</h1>
            <AddTaskRC onAddTask={handleAddTask} />
            <TaskListRC
                tasks={tasks}
                onChangeTask={handleChangeTask}
                onDeleteTask={handleDeleteTask}
            />
        </>
    );
}

function tasksReducer(tasks, action) {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false,
                },
            ];
        }
        case 'changed': {
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter((t) => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

// код выше исппользует:
// let nextId = 3;
// const initialTasks = [
//  { id: 0, text: 'Visit Kafka Museum', done: true },
//  { id: 1, text: 'Watch a puppet show', done: false },
//  { id: 2, text: 'Lennon Wall pic', done: false }
// ];

// По мере роста вашего приложения мы можем столкнуться с другой трудностью. 
// Состояние tasks и функция dispatch доступны только в компоненте верхнего уровня TaskAppRC.
// Чтобы позволить другим компонентам читать список задач или изменять его, мы должны явно передать вниз текущее ->
// -> состояние и обработчики событий, которые изменяют его, как пропсы.
