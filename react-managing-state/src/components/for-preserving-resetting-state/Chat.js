import { useState } from 'react';

export default function() {
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
                <button>Отправить сообщение для {contacts.email}</button>
            </section>
        </>
    );
};
