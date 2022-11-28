import './App.css';
import { Route, Routes } from "react-router-dom"
import { Admin, Libros, Multas, NotFound, Perfil, Login } from './views'
import UserRoute from './components/ProtectedRoute';
import ProtectedRoute from './components/UserRoute';

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="libros" element={<UserRoute><Libros /></UserRoute>} />
      <Route path="perfil" element={<UserRoute><Perfil /></UserRoute>} />
      <Route path="admin" element={<UserRoute><ProtectedRoute><Admin /></ProtectedRoute></UserRoute>} />
      <Route path="multas" element={<Multas />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
