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
// почти угадал onSmash передается как обработчик событий для onClick)

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

// пример оставовки, предотвращения срабытывания обработчиков событий у родительских элементов
// stopPropagation - предотвращает попадание события в родительские элементы
function StopHandlerButton({ onClick, children }) {
    return(
        <>
            <button onClick={e => {
                e.stopPropagation();
                onClick();
            }}>
                {children}
            </button>
        </>
    )
}
// e - единственный аргумент обработчика событий onClick

function StopHandler() {
    return(
        <>
            <div className="toolbar"
                onClick={() => {
                    alert('Ты нажал на панель инструментов')
            }}>
                <StopHandlerButton onClick={() => {alert('Subaru Legacy')}}>
                    Название машины - кликни чтобы узнать
                </StopHandlerButton>
                <StopHandlerButton onClick={() => {alert('Subaru Legacy улетела в космос')}}>
                    Кликни, что бы толкнуть машину
                </StopHandlerButton>
            </div>
        </>
    );
};
// onClick={() => {alert('Subaru Legacy')} - всё это один пропс, который изначальноо объявлялся в onClick -
// - кнопки StopHandlerButton --- function StopHandlerButton({ onClick ... , и в дальнейшем -
// - вызывался как функция в <button></>button> (после e.stopPropagation(); --onClick()--), если я правильно понял
// данные для onClick() передаются в родительском элементе -
// - <StopHandlerButton onClick= начало передачи---{() => {alert('Subaru Legacy улетела в космос')}}> ---
// --- (не забывать фигурные скобки)

// Впримерах выше, описана альтернатива распространению событий до верхних уровней,
// шаблон действий с e.stopPropagation(), позволяет дочернему компоненту обрабатывать событие,
// в то же время позволяя родительскому компоненту указывать некоторое дополнительное поведение. 
// В отличие от распространения, это не происходит автоматически. 
// Но преимущество этого шаблона в том, что вы можете четко проследить всю цепочку кода, 
// который выполняется в результате какого-то события.
// В случае в оаспространением проледить цепочку событий невозможно

// Так же, можно добавить какой-либо код в промежуток между e.stopPropagation и onClick()

// Prevent dafult - поведение по умолчанию, ниже - случай, при котором оно сработает (страница обновится)
function PreventDefaultExample() {
    return(
        <>
            <form onSubmit={() => alert('Вы подписаны!')}>
                <input />
                <button>Отправить форму</button>
            </form>
        </>
    );
};

// Пример остановки поведения по умолчанию (страница не будет обновляться при нажатии на кнопку)
function StopPreventDefault() {
    return(
        <>
            <form onSubmit={e => {
                e.preventDefault();
                alert('Форма отправлена');
            }}>
                <input />
                <button>Отправить форму</button>
            </form>
        </>
    );
};

// e.stopPropagation() - останавливает запуск обработчиков событий, прикрепленных к родительским компонентам, компонентам выше.
// e.preventDefault() - предотвращает поведение браузера по умолчанию для элементов и событий, у которых оно есть.

// !!! В отличие от функций рендеринга, обработчики событий не обязательно должны быть прямыми, читыми.
// Обработчик события - отличное место, что бы что-то изменить - например: Изменить список в ответ на нажатие кнопки
// Изменить входное значение в ответ на ввод текста. !!!
// Чтобы изменить некоторую информацию, нам нужен какой-то способ ее сохранения. 
// В React это делается с помощью состояния, памяти компонента. (state, componenent memory);

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
                <h2>Пример порядка вызовов обработчиков событий по цепочке</h2>
                <InterestingQuest />
                <hr></hr>
                <h2>Пример остановки порядка вызовов по цепочке</h2>
                <StopHandler />
                <hr></hr>
                <h2>Prevent default - поведение по умолчанию</h2>
                <h3>Срабатывание поведения по умолчанию ниже</h3>
                <PreventDefaultExample />
                <h3>Отмена срабатывания поведения по умолчанию ниже</h3>
                <StopPreventDefault />
            </div>
        </>
    );
};