import React from 'react';
import { useState } from 'react'

import BaseHandler from './components/BaseHandler';

import ComponentsMemory from './components/ComponentsMemory';
import { MultipleState } from './components/ComponentsMemory';
import { PrivateAndIsolated } from './components/ComponentsMemory';

import ReanderSnapshots from './components/RenderSnapshots';
import { FunnyCounter } from './components/RenderSnapshots';
import { MessageToAlice } from './components/RenderSnapshots';
import { TrafficLight } from './components/RenderSnapshots';

import PreRenderUpdates from './components/PreRenderUpdates';

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
        <hr></hr>
        <h1>Как React фиксирует изменения и работает со снапшотами - снимками JSX наших компонентов</h1>
        <h2>Демонстрация того, что React будет запоминать и какие будет выводить данные на экран в определенных случаях</h2>
        <h3>3 вызова функции, работающей с переменной состояния, в пределах одного onClick</h3>
        <ReanderSnapshots />
        <hr></hr>
        <h3>Вызов функции, увеличивающей число на 5 - что в alert?</h3>
        <FunnyCounter />
        <hr></hr>
        <h3>Отправка сообщения Алисе - что выведется в при замене значения вовремя выполнения кода alert?</h3>
        <MessageToAlice />
        <hr></hr>
        <h3>Работа небольшого светофора</h3>
        <TrafficLight />
        <hr></hr>
        <h1>Работа над данными перед рендерингом</h1>
        <h2>Правильные счетчики</h2>
        <PreRenderUpdates />
      </div>
    </>
  );
};

export default App
