import React, {useEffect} from 'react'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom"


function Libros() {

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
      <div>Libros</div>
    </>
  )
}

export default Libros