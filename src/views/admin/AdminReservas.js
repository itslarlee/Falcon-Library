import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { Calendar } from 'primereact/calendar';
import moment from 'moment'

function AdminReservas() {

  let emptyProduct = {
    reserve_ID: null,
    bookID: '',
    user_ID: '',
    perd_Start: '',
    perd_End: '',
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const getReserves = async () => {
    try {
      const response = await axios.get('https://localhost:7076/FalconsLibrary/Reserve/reserveList')
      setProducts([...response.data])
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }

  useEffect(() => {
    getReserves();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  }

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  }


  const saveProduct = async () => {
    setSubmitted(true);

    let _products = [...products];
    const index = findIndexById(product.reserve_ID);
    const sendProduct = {...product, perd_Start: moment(product.perd_Start).format('YYYY-MM-DD'), perd_End: moment(product.perd_End).format('YYYY-MM-DD')}
    if (index === -1) {
      try {
        const response = await axios.post('https://localhost:7076/FalconsLibrary/Reserve/createReserve', sendProduct);
        _products.push(sendProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Creado correctamente', life: 3000 });
      } catch (error) {
        console.log(error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
      }

    }
    else {
      try {
        const res = await axios.put('https://localhost:7076/FalconsLibrary/Reserve/updateReserve', sendProduct, { params: { id: product.reserve_ID } });
        _products[index] = sendProduct;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Actualizado correctamente', life: 3000 });
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
      }
    }

    console.log(_products);
    setProducts(_products);
    setProductDialog(false);
    setProduct(emptyProduct);

  }

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  }

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  }

  const deleteProduct = async () => {

    try {
      const res = await axios.delete('https://localhost:7076/FalconsLibrary/Reserve/deleteReserve', { params: { id: product.reserve_ID } });
      let _products = products.filter(val => val.reserve_ID !== product.reserve_ID);
      setProducts(_products);
      setDeleteProductDialog(false);
      setProduct(emptyProduct);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Eliminado Correctamente', life: 3000 });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].reserve_ID === id) {
        console.log();
        index = i;
        break;
      }
    }

    return index;
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  }

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manejo de Reservas</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
      <Button label="Nuevo" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
      <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
    </React.Fragment>
  );

  return (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <DataTable ref={dt} value={products}
          dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter} header={header} responsiveLayout="scroll">
          <Column field="reserve_ID" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
          <Column field="user_ID" header="ID Usuario" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="bookID" header="ID Libro" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="perd_Start" header="Inicio" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="perd_End" header="Fin" sortable style={{ minWidth: '16rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '450px' }} header="Nuevo usuario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="reserve_ID">ID</label>
          <InputNumber id="reserve_ID" useGrouping={false} value={product.reserve_ID} onValueChange={(e) => onInputNumberChange(e, 'reserve_ID')} />
          {submitted && !product.reserve_ID && <small className="p-error">Requerido</small>}
        </div>
        <div className="field">
          <label htmlFor="bookID">ID Libros</label>
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

      <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && <span>Seguro que quieres eliminar <b>{product.name}</b>?</span>}
        </div>
      </Dialog>


    </div>
  );
}

export default AdminReservas