import './App.css';
import { Route, Routes } from "react-router-dom"
import { Admin, Libros, Multas, NotFound, Perfil, Login } from './views'

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="libros" element={<Libros />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="admin" element={<Admin />} />
      <Route path="multas" element={<Multas />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
