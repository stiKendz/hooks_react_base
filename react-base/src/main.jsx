import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AppTwo from './root-2/AppTwo'
import PropsApp from './root-3-props/PropsApp'
import AppFourRendering from './root-4-rendering/AppFourRendering'
import AppFiveRenderingLists from './root-5-rendering-lists/AppFiveRenderingLists'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Второй набор компонентов
createRoot(document.getElementById('root-2')).render(
  <StrictMode>
    <AppTwo />
  </StrictMode>,
)

// Третий набор компонентов (пропсы)
createRoot(document.getElementById('root-3-props')).render(
  <StrictMode>
    <PropsApp />
  </StrictMode>,
)

// Четвертый набор компонентов (рендеринг)
createRoot(document.getElementById('root-4-rendering')).render(
  <StrictMode>
    <AppFourRendering />
  </StrictMode>
)

// Пятый набор компонентов (рендеринг списков данных (map(), filter() методы)
createRoot(document.getElementById('root-5-list-rendering')).render(  
  <StrictMode>
    <AppFiveRenderingLists />
  </StrictMode>
)