import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';

function Multas() {
  const toast = useRef(null);
  const [fines, setFines] = useState([]);


  const getFines = async () => {
    try {
      const response = await axios.get('https://localhost:7076/FalconsLibrary/Fine/fineList')
      console.log(response.data);
      setFines([...response.data])
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }

  useEffect(() => {
    getFines();

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />
      <Toast ref={toast} />
      <div className="title">
        <h1>Multas</h1>
      </div>
      <div className="panel-pages">
        {
          fines.map((fine) => {
            return (
              <Card title={`Id: ${fine.fines_ID}`} subTitle={`${fine.status}`} style={{ width: '22em', margin: '3rem' }} >
                <p>Descripcion: {fine.description}</p>
              </Card>
            )
          })
        }

      </div>

    </>

  )
}

export default Multas