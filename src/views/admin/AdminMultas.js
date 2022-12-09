import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';


function AdminMultas() {

  let emptyProduct = {
    fines_ID: null,
    description: '',
    status: '',
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const getFines = async () => {
    try {
      const response = await axios.get('https://localhost:7076/FalconsLibrary/Fine/fineList')
      console.log(response.data);
      setProducts([...response.data])
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
    }

  }

  useEffect(() => {
    getFines();

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
    let _product = { ...product };
    const index = findIndexById(product.fines_ID);

    if (index === -1) {
      try {
        const response = await axios.post('https://localhost:7076/FalconsLibrary/Fine/createFine', product);
        _products.push(_product);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Creado correctamente', life: 3000 });
      } catch (error) {
        console.log(error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
      }

    }
    else {
      try {
        const res = await axios.put('https://localhost:7076/FalconsLibrary/Fine/updateFine', product, { params: { id: product.fines_ID } });
        _products[index] = _product;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Actualizado correctamente', life: 3000 });
      } catch (error) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
      }
    }

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
      const res = await axios.delete('https://localhost:7076/FalconsLibrary/Fine/deleteFine', { params: { id: product.fines_ID } });
      let _products = products.filter(val => val.fines_ID !== product.fines_ID);
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
      if (products[i].fines_ID === id) {
        console.log();
        index = i;
        break;
      }
    }

    return index;
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
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mr-2" onClick={() => editProduct(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  }

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manejo de Libros</h5>
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
          <Column field="fines_ID" header="ID" sortable style={{ minWidth: '8rem' }}></Column>
          <Column field="description" header="Descripcion" sortable style={{ minWidth: '16rem' }}></Column>
          <Column field="status" header="Estado" sortable style={{ minWidth: '12rem' }}></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
        </DataTable>
      </div>

      <Dialog visible={productDialog} style={{ width: '450px' }} header="Nueva Multa" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="fines_ID">ID</label>
          <InputNumber id="fines_ID" useGrouping={false} value={product.fines_ID} onValueChange={(e) => onInputNumberChange(e, 'fines_ID')} />
          {submitted && !product.fines_ID && <small className="p-error">Requerido</small>}
        </div>
        <div className="field">
          <label htmlFor="description">Descripcion</label>
          <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
        </div>
        <div className="field">
          <label htmlFor="status">Estado</label>
          <InputText id="status" value={product.status} onChange={(e) => onInputChange(e, 'status')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.status })} />
          {submitted && !product.status && <small className="p-error">Requerido</small>}
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

export default AdminMultas