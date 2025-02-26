import React from 'react';
import { useState } from 'react';

import StateManaging from './components/StateManaging';
import { ChoosingStateStructure } from './components/StateManaging';
import { SharingState } from './components/StateManaging';

export default function App() {
  return (
    <>
      <div className="managing-main-container">
        <h1>Управление состоянием в React.js</h1>
        <hr></hr>
        <h2>Введение в управление состоянием</h2>
        <StateManaging />
        <hr></hr>
        <h2>Выбор структуры состояний</h2>
        <ChoosingStateStructure />
        <hr></hr>
        <h2>Как делиться состоянием с несколькими компонентами, что бы оно выполнялось одновременно у 2х и более компонентов?</h2>
        <SharingState />
      </div>
    </>
  )
}
