import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PokemonDetails from './components/pages/pokemonDetails.tsx'

const router = createBrowserRouter([
  {path:"/", element:<App/>},
  {path:"/:pokemon", element:<PokemonDetails/>},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
