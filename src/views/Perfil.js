import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom"

import Header from '../components/Header'


function Perfil() {
  const navigate = useNavigate();


  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    if (!user) {
      navigate(`/`);
    } 
  }, [])
  return (
    <>
      <Header />
      <div>Perfil</div>

    </>
  )
}

export default Perfil