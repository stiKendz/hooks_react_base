import React, { createContext } from 'react';

export const UpgradeLevelContent = createContext(0);
// Отличие от LevelContext -> createContext(0) - теперь 0 вместо 1, что бы при использовании контекста и вычислений level + 1 ->
// -> (из файла UpgradeSection) не срабатывало перескакивание через 1 уровень в case части компонента Heading.jsx ->
// (при createContext(1) будет срабатывать);

