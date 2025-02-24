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

import UpdateObjects from './components/UpdateObjects';
import { MovingDot } from './components/UpdateObjects';
import { PersonForm } from './components/UpdateObjects';
import { NestedObjectUpdate } from './components/UpdateObjects';
import { UpdateArraysInState } from './components/UpdateObjects';
import { RemovingItemsFromArray } from './components/UpdateObjects';
import { TransformArray } from './components/UpdateObjects';
import { ReplacingItemsInArray } from './components/UpdateObjects';

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
        <h2>Правильные счетчики - работа с рендерингом и данными</h2>
        <PreRenderUpdates />
        <hr></hr>
        <h1>Работа с объектами в состояниях</h1>
        <h2>Мутация объектов в примере ниже</h2>
        <UpdateObjects />
        <hr></hr>
        <h2>Перемещающаяся точка</h2>
        <MovingDot />
        <hr></hr>
        <h2>Копирование объектов с синтаксисом ...</h2>
        <PersonForm />
        <hr></hr>
        <h2>Демонстрация работы обновления вложенного объекта, работы с вложенным объектом</h2>
        <NestedObjectUpdate />
        <hr></hr>
        <h1>Работа и обновление массива в состоянии</h1>
        <h2>Обновление, добавление элементов массива ниже</h2>
        <UpdateArraysInState />
        <hr></hr>
        <h2>Удаление элементов из массива ниже</h2>
        <RemovingItemsFromArray />
        <hr></hr>
        <h2>Изменение элементов в массиве ниже</h2>
        <TransformArray />
        <hr></hr>
        <h2>Замена элементов в массиве ниже</h2>
        <ReplacingItemsInArray />
      </div>
    </>
  );
};

export default App
