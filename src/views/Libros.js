import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { useNavigate } from "react-router-dom"
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import moment from 'moment'

function Libros() {

  let emptyProduct = {
    reserve_ID: null,
    bookID: '',
    user_ID: '',
    perd_Start: '',
    perd_End: '',
  };
  const toast = useRef(null);
  const [productDialog, setProductDialog] = useState(false);
  const [books, setBooks] = useState([]);
  const [copies, setCopies] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [product, setProduct] = useState(emptyProduct);

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem('user'));
    if (!user) {
      navigate(`/`);
    } else {
      getBooks();
      getCopies();
    }
  }, [])

  const openNew = (copyID) => {

    const user = JSON.parse(window.sessionStorage.getItem('user'));


    setProduct({
      reserve_ID: Math.floor(Math.random() * 1000000000),
      bookID: copyID,
      user_ID: user.user_ID,
      perd_Start: '',
      perd_End: '',
    });
    setSubmitted(false);
    setProductDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  }


  const getBooks = async () => {
    try {
      const response = await axios.get('https://localhost:7076/FalconsLibrary/Book/bookList')
      console.log(response.data);
      setBooks([...response.data])
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }
  const getCopies = async () => {
    try {
      const response = await axios.get('https://localhost:7076/FalconsLibrary/Copy/copyList')
      console.log(response.data);
      setCopies([...response.data])
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }
  const saveProduct = async () => {
    setSubmitted(true);
    const sendProduct = { ...product, perd_Start: moment(product.perd_Start).format('YYYY-MM-DD'), perd_End: moment(product.perd_End).format('YYYY-MM-DD') }

    try {
      const response = await axios.post('https://localhost:7076/FalconsLibrary/Reserve/createReserve', sendProduct);
      setProductDialog(false);
      setProduct(emptyProduct);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Creado correctamente', life: 3000 });
    } catch (error) {
      console.log(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }
  }
  const calendarOnChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  }

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;
    setProduct(_product);
  }

  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
    </React.Fragment>
  );
  const navigate = useNavigate();

  

  const bookACopy = async (copyID, bookID) => {

  }

  return (
    <>
      <Header />
      <Toast ref={toast} />
      <div className="title">
        <h1>Libros</h1>
      </div>
      <div className="panel-pages">
        {
          books.map((book) => {
            return (
              <div key={book.bookID}>
                <Card title={`${book.book_Name}`} subTitle={`${book.author}`} /*footer={footer}*/ style={{ width: '30em', margin: '3rem' }} >
                  <p>Descripcion: {book.epilogue}</p>
                  {
                    copies.map((copy) => {
                      if (copy.bookID === book.bookID) {
                        return (
                          <>
                            <div className="book-card" key={copy.copyID}>
                              <div className="book-card-container">
                                <div className="book-card-item">
                                  <b><p>ID de Ejemplar: {copy.copyID}</p></b>
                                </div>
                                <div className="book-card-item">
                                  <Button label="Reservar" className="p-button-rounded p-button-help" onClick={() => openNew(copy.copyID)} />
                                </div>
                              </div>
                            </div>

                          </>
                        )
                      }
                    })
                  }
                </Card>

                <Dialog visible={productDialog} style={{ width: '450px' }} header="Nuevo usuario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                  <div className="field">
                    <label htmlFor="reserve_ID">ID</label>
                    <InputNumber id="reserve_ID" useGrouping={false} value={product.reserve_ID} onValueChange={(e) => onInputNumberChange(e, 'reserve_ID')} />
                    {submitted && !product.reserve_ID && <small className="p-error">Requerido</small>}
                  </div>
                  <div className="field">
                    <label htmlFor="bookID">ID Ejemplar</label>
                    <InputNumber id="bookID" useGrouping={false} value={product.bookID} onValueChange={(e) => onInputNumberChange(e, 'bookID')} />
                    {submitted && !product.bookID && <small className="p-error">Requerido</small>}
                  </div>
                  <div className="field">
                    <label htmlFor="user_ID">ID Usuario</label>
                    <InputNumber id="user_ID" useGrouping={false} value={product.user_ID} onValueChange={(e) => onInputNumberChange(e, 'user_ID')} />
                    {submitted && !product.user_ID && <small className="p-error">Requerido</small>}
                  </div>
                  <div className="field">
                    <label htmlFor="basic">Inicio</label>
                    <Calendar dateFormat="yy-mm-dd" id="perd_Start" value={product.user_ID} onChange={(e) => calendarOnChange(e, 'perd_Start')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.perd_Start })} />
                  </div>
                  <div className="field">
                    <label htmlFor="basic">Fin</label>

                    <Calendar dateFormat="yy-mm-dd" id="perd_End" value={product.user_ID} onChange={(e) => calendarOnChange(e, 'perd_End')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.perd_End })} />
                  </div>
                </Dialog>
              </div>

            )
          })
        }
      </div>
    </>
  )
}

export default Libros