import React from "react";

function ParamsForParams({ person, size = 100 }) {
    return(
        <>
            <img 
                className="person-info"
                src="src"
                alt={person.name + person.surname}
                width={size}
                height={size}
            >
            </img>
        </>
    );
};

export default function Params() {
    return(
        <>
            <div className="for-params">
                <ParamsForParams 
                    person={{
                        name: 'Mikhail',
                        surname: 'Semenov'
                    }}
                    size={100}
                />
                <ParamsForParams 
                    person={{
                        name: 'Daniil',
                        surname: 'Makarenko'
                    }}
                    size={50}
                />
                <ParamsForParams 
                    person={{
                        name: 'Semenov',
                        surname: 'Sisters'
                    }}
                    size={25}
                />
                <ParamsForParams 
                    person={{
                        name: 'Semenov',
                        surname: 'Sisters'
                    }}
                />
            </div>
        </>
    );
};

// можно передать пропсы так
function Profile(person, size, isSepia, thickBorder) {
    return(
        <>
            <div className="main-card">
                <Avatar
                    person = {person}
                    size = {size}
                    isSepia = {isSepia}
                    thickBorder = {thickBorder}
                />
            </div>
        </>
    );
};

// или вот так
function LikelyProfile(props) {
    return(
        <>
            <div className="main-card">
                <Avatar 
                    {...props}
                />
            </div>
        </>
    );
};