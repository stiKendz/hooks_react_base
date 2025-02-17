import React from "react";
import {UserInfo} from './UserInfo';

function UserCard({ children }) {
    return(
        <div className="children" style={{
            display: "column",
            alignItems: "center",
            justifyContent: "start",
            

            width: 300,
            height: 200,    

            backgroundColor: 'black',

            fontSize: 16
        }}
        >
            {children}
        </div>
    );
};

export default function UsersPropsCards() {
    return(
        <UserCard>
            <UserInfo
                size={500}
                person={{
                    name: 'Subaru',
                    surname: 'Impreza'
                }}
            />
            <UserInfo
                size={450}
                person={{
                    name: 'Subaru',
                    surname: 'Levorg'
                }}
            />
            <UserInfo
                person={{
                    name: 'Subaru',
                    surname: 'Forester'
                }}
            />

        </UserCard>
    );
};

// UserInfo - children элемент в UserCard, котрой лежит в UserPropsCards