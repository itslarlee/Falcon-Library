import './App.css';
import { Route, Routes } from "react-router-dom"
import { Admin, AdminEjemplares, AdminLibros, AdminMultas, AdminReservas, AdminRoles, AdminUsuarios, Libros, Multas, NotFound, Perfil } from './views'
import { useSelector } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const [userState] = useSelector((state) => [
    state.userSlice.userState,
  ]);

  return (
    <Routes>
      <Route index element={<Libros />} />
      <Route path="libros" element={<Libros />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="admin" element={<ProtectedRoute user={userState}><Admin/></ProtectedRoute>}>
        <Route path="libros" element={<ProtectedRoute user={userState}><AdminLibros/></ProtectedRoute>}/>
        <Route path="ejemplares" element={<ProtectedRoute user={userState}><AdminEjemplares/></ProtectedRoute>} />
        <Route path="usuarios" element={<ProtectedRoute user={userState}><AdminUsuarios/></ProtectedRoute>} />
        <Route path="reservas" element={<ProtectedRoute user={userState}><AdminReservas/></ProtectedRoute>} />
        <Route path="roles" element={<ProtectedRoute user={userState}><AdminRoles/></ProtectedRoute>} />
        <Route path="multas" element={<ProtectedRoute user={userState}><AdminMultas/></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="multas" element={<Multas />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
