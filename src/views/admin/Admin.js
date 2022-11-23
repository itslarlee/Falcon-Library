import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'


function Admin() {
  return (
    <>
      <Header />
      <div>Admin</div>

      <Outlet />

    </>
  )
}

export default Admin