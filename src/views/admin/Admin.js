import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { TabView, TabPanel } from 'primereact/tabview';
import { AdminEjemplares, AdminLibros, AdminMultas, AdminReservas, AdminUsuarios } from '../'
import Header from '../../components/Header'


function Admin() {

  const navigate = useNavigate();


  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    if (!user) {
      navigate(`/`);
    } else if(user?.role !== 'Admin') {
      navigate(`/perfil`);
    } 
  }, [])


  return (
    <>
      <Header />
      <div className="card">
        <TabView>
          <TabPanel header="Ejemplares">
            <AdminEjemplares />
          </TabPanel>
          <TabPanel header="Libros">
            <AdminLibros />
          </TabPanel>
          <TabPanel header="Multas">
            <AdminMultas />
          </TabPanel>
          <TabPanel header="Reservas">
            <AdminReservas />
          </TabPanel>
          <TabPanel header="Usuarios">
            <AdminUsuarios />
          </TabPanel>
        </TabView>
      </div>

    </>
  )
}

export default Admin