import { useState } from 'react';

export default function Chat({ contact }) {
    const [text, setText] = useState('');
    return (
        <>
            <section className='chat'>
                <textarea
                    value={text}
                    placeholder={'Chat to ' + contact.name}
                    onChange={e => setText(e.target.value)}
                />
                <br />
                <button>Отправить сообщение для {contact.email}</button>
            </section>
        </>
    );
};
