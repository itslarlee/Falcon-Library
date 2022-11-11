import './App.css';
import { Route, Routes } from "react-router-dom"
import { Admin, AdminEjemplares, AdminLibros, AdminMultas, AdminReservas, AdminRoles, AdminUsuarios, Libros, Multas, NotFound, Perfil } from './views'


function App() {
  return (
    <Routes>
      <Route index element={<Libros />} />
      <Route path="libros" element={<Libros />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="admin" element={<Admin />}>
        <Route path="libros" element={<AdminLibros />} />
        <Route path="ejemplares" element={<AdminEjemplares />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="reservas" element={<AdminReservas />} />
        <Route path="roles" element={<AdminRoles />} />
        <Route path="multas" element={<AdminMultas />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="multas" element={<Multas />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
