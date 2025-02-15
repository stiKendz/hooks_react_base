// Чистые функции (способ написания компонентов) позволяют проще организовывать код, что может пригодится в дальнейшей доработке кода
// функции не должны изменять объекты или переменные, которые сущетсовали до её вызова
// при одинаковых входных данных чистая функция всегда должна возвращать один и тот же результат  


// не чистая функция
let guest = 0;

function Cup() {
    // Bad: changing a preexisting variable!
    guest = guest + 1;
    return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
    return (
        <>
            <Cup />
            <Cup />
            <Cup />
        </>
    );
} 
// guest = guest + 1 - вычисления, изменяющие переменную != чистая функция


// чистая функция
function Cup({ guest }) {
    return <h2>Tea cup for guest #{guest}</h2>;
}

export default function TeaSet() {
    return (
        <>
            <Cup guest={1} />
            <Cup guest={2} />
            <Cup guest={3} />
        </>
    );
}
// присваиваем значения как пропс (сама функция ничего не меняет)