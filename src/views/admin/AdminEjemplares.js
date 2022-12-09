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


function AdminEjemplares() {

  let emptyProduct = {
    copyID: null,
    bookID: null,
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const getCopies = async () => {
    try {
      const response = await axios.get('https://localhost:7076/FalconsLibrary/Copy/copyList')
      console.log(response.data);
      setProducts([...response.data])
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }

  useEffect(() => {
    getCopies();

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
    let _product = {...product};

    try {
      const response = await axios.post('https://localhost:7076/FalconsLibrary/Copy/createCopy', product);
      _products.push(_product);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Creado correctamente', life: 3000 });
      setProducts(_products);
      setProductDialog(false);
      setProduct(emptyProduct);
    } catch (error) {
      console.log(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  }

  const deleteProduct = async () => {

    try {
      const res = await axios.delete('https://localhost:7076/FalconsLibrary/Copy/deleteCopy', { params: { id: product.copyID } });
      let _products = products.filter(val => val.copyID !== product.copyID);
      setProducts(_products);
      setDeleteProductDialog(false);
      setProduct(emptyProduct);
      toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Eliminado Correctamente', life: 3000 });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }

  const onInputChange = (e, name) => {
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
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  }

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manejo de Copias</h5>
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
          <Column field="copyID" header="ID" sortable style={{ minWidth: '8rem' }}></Column>
          <Column field="bookID" header="ID Libro" sortable style={{ minWidth: '16rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '450px' }} header="Nuevo Ejemplar" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="copyID">ID</label>
          <InputNumber id="copyID" useGrouping={false} value={product.copyID} onValueChange={(e) => onInputNumberChange(e, 'copyID')} />
          {submitted && !product.copyID && <small className="p-error">Requerido</small>}
        </div>
        <div className="field">
          <label htmlFor="bookID">ID Libro</label>
          <InputNumber id="bookID" useGrouping={false} value={product.bookID} onValueChange={(e) => onInputNumberChange(e, 'bookID')} />
          {submitted && !product.bookID && <small className="p-error">Requerido</small>}
        </div>

      </Dialog>

      <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
        <div className="confirmation-content">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
          {product && <span>Seguro que quieres eliminar <b>{product.book_Name}</b>?</span>}
        </div>
      </Dialog>


    </div>
  );
}


export default AdminEjemplares