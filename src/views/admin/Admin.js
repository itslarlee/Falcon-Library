import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { AdminEjemplares, AdminLibros, AdminMultas, AdminReservas, AdminUsuarios } from '../'
import Header from '../../components/Header'


function Admin() {


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