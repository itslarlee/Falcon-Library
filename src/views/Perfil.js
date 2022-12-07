import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Card } from 'primereact/card';

import Header from '../components/Header'


function Perfil() {
  const navigate = useNavigate();
  const user = JSON.parse(window.sessionStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
  }, [])

  return (
    <>
      <Header />
      <div className="title">
        <h1>Perfil</h1>
      </div>
      <div className="panel-pages">
        <Card title={`${user.user_Name} ${user.f_LastName} ${user.s_LastName} `} subTitle={`${user.role}`} style={{ width: '25em' }} >
          <p>Rol: {user.role}</p>
          <p>Correo: {user.email}</p>
        </Card>
      </div>


    </>
  )
}

export default Perfil