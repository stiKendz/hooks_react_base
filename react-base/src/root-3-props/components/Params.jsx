import React from "react";

function ParamsForParams({ person, size }) {
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
                
            </div>
        </>
    );
};