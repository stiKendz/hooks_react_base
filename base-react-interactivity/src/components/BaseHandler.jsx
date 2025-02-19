import React from "react";

// первый вариант обработки события
function EasyButton() {
    // обработчик события, при нажатии на кнопку, передвется как пропс в <button></button>
    function handleClick() {
        alert('Ты нажал на кнопку');
    };

    return(
        <button onClick={ handleClick }>
            Я что-то делаю
        </button>
    );
};

// второй вариант обработки события
function EasyButtonVariantTwo() {
    return(
        <button onClick={ function handleClick() {
            alert('Ты нажал на меня');
        }}>
            Я что-то делаю
        </button>

        // или вот так
        // <button onClick={() => {
        //     alert('Ты нажал на меня');
        // }}>
        //     Я что-то делаю
        // </button>

        // будет вызываться при каждои рендеринге
        // <button onClick={alert('You clicked me!')}></button>
    );
};
// функция должна передаваться как обработчик события, а не вызываться внутри него
// правильно - <button onClick={handleClick}> - запустится только при клике на кнопку (передача функции)
// непрвильно - <button onClick={handleClick()}> - будет запускаться каждый раз, когда компонент будет рендерится

// демонстрация взаимодействия пропсов и функций 
function PropsButton({message, children}) {
    return(
        <>
            <button onClick={() => {
                alert(message)
            }}>
                {children}
            </button>
        </>
    );
};

// кнока для примера передачи обработчика событий как пропса
function ButtonForOthers({ onClick, children }) {
    return(
        <>
            <button onClick={ onClick }>
                { children }
            </button>
        </>
    );
};
 
function PlayFilmButton({ movieName }) {
    function handlePlayButton() {
        alert(`Идет просмотр фильма ${movieName}`)
    }

    return(
        <>
            <ButtonForOthers onClick={handlePlayButton}>
                Play "{ movieName }"
            </ButtonForOthers>
        </>
    );
};

function UploadImageButton() {
    return(
        <>
            <ButtonForOthers onClick={() => {alert('Фотография загружается')}}>
                Загрузить фоторафию
            </ButtonForOthers>
        </>
    );
};

// Создание собственных имен для обработчиков событий
// по аналогии onClick = { onClick } --- onClick = { onSmash }
function NamedHandler({ onSmash, children }) {
    return(
        <>
            <button onClick={onSmash}>
                {children}
            </button>
        </>
    );
};
// в button нужен onClick, но в компоненте нужен onSmash, (который будет триггерить onClick - ???, upd - 
// почти угадал onSmash передается как обработчик событий onClick)

// ещё один пример создания обработчиков событий со своими именами
// демонстрируется то, что передача навзвания поддерживает несколько итераций среди компонентов (как я понял)
function SecondNamedHandler({ onToKnowCar, onToPushCar}) {
    return(
        <>
            <ButtonForOthers onClick={ onToKnowCar }>
                Название машины - кликни чтобы узнать
            </ButtonForOthers>
            <ButtonForOthers onClick={ onToPushCar }>
                Кликни, что бы толкнуть машину
            </ButtonForOthers>
        </>
    );
};

// задачка на дедукцию - в каком порядке будут вызываться обработчики событий - ?
function InterestingQuest() {
    return(
        <div className="toolbar"
            onClick={() => {
                alert('Ты нажал на панель инструментов')
            }}
        >
            <button onClick={() => {alert('Subaru Legacy')}}>
                Название машины - кликни чтобы узнать
            </button>
            <button onClick={() => {alert('Subaru Legacy улетела в космос')}}>
                Кликни, что бы толкнуть машину
            </button>
        </div>
    );
};
// при нажатии на любую из кнопок, сначала отработает onClick кнопки, а затем, onClick элемента <div></div>
// Данный компонент демонстрирует иерархию вызовов обработчиков событий - 
// - при вызове события в дочернем элементе, вызов передается по цепочке вверх - к родительскому (как я понимаю)  -
// - и вызывает срабатывание обработчика событий родительского элемента


export default function BaseHandler() {
    return(
        <>
            <div className="handler-container">
                <h2>Простенький обработчик события ниже</h2>
                <EasyButton />
                <h2>Его другой вариант</h2>
                <EasyButtonVariantTwo />
                <hr></hr>
                <h2>Обработчик, взаимодействующий с пропсами</h2>
                <PropsButton message={'Просматривается'}>
                    Посмотреть фильм
                </PropsButton>
                <PropsButton message={'Загружается'}>
                    Загрузить фотографию
                </PropsButton>
                <hr></hr>
                <h2>Передача обработчика события как пропса - ниже</h2>
                <PlayFilmButton movieName={'Звездыне Войны'} />
                <UploadImageButton/>
                <hr></hr>
                <h2>Создание обработчика событий с собственным именем</h2>
                <NamedHandler onSmash={() => alert('Привет')}>
                    Приветственное сообщение
                </NamedHandler>
                <NamedHandler onSmash={() => alert('Пока')}>
                    Прощальное сообщение
                </NamedHandler>
                <hr></hr>
                <h2>Ещё один пример создания обработчика событий с собственным именем</h2>
                <SecondNamedHandler 
                    onToKnowCar={() => alert('Subaru Levorg')}
                    onToPushCar={() => alert('Subaru Levorg улетел в космос')}
                />
                <hr></hr>
                <h2>Порядок вызовов</h2>
                <InterestingQuest />
            </div>
        </>
    );
};