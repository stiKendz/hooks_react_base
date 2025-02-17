import React from "react";

export function UserInfo({person, size = 350 }) {
    return(
        <>
            <div
                className="user-info"
                style={{
                    width: {size},
                    height: {size},
                    backgroundColor: 'lightgreen'
                }}
            >
            Имя пользователя : { person.name + person.surname }</div>
        </>
    );
};