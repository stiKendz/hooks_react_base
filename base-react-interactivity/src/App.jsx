import { useState } from 'react'
import BaseHandler from './components/BaseHandler';
import ComponentsMemory from './components/ComponentsMemory';
import { MultipleState } from './components/ComponentsMemory';
import { PrivateAndIsolated } from './components/ComponentsMemory';

function App() {
  return(
    <>
      <div className="main-app-container">
        <h1>Базовая интерактивность</h1>
        <BaseHandler />
        <h1>Память компонентов - useState</h1>
        <h2>Демонстрация работы useState</h2>
        <ComponentsMemory />
        <hr></hr>
        <h2>Демонстрация работы useState, но уже с использованием нескольких переменных состояния</h2>
        <MultipleState />
        <hr></hr>
        <h2>Демонстрация обособленности каждого из экземляров компонента друг от друга
        </h2>
        <p>
          <b>
            Изменение состояний одного компонента,
            не вляет на изменение состояний другого компонента - они  у них частные
          </b>
        </p>
        <PrivateAndIsolated />
      </div>
    </>
  );
};

export default App
