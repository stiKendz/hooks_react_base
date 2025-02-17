import React from "react";
import Params from './components/Params';
import UsersPropsCards from "./components/UserPropsCards";

export default function PropsApp() {
    return(
        <>
            <h1>Третий набор компонентов</h1>
            <Params />
            <div className="user-props-cards-container">
                <h1>Вывод информации о пользователях, используя пропсы - чуть ниже</h1>
                <UsersPropsCards />
            </div>
        </>
    );
};