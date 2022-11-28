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

const AdminUsuarios = () => {

    let emptyProduct = {
        user_ID: null,
        user_Name: null,
        f_LastName: null,
        s_LastName: null,
        email: null,
        password: null,
        role: null,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const getUsers = async () => {
        try {
            const response = await axios.get('https://localhost:7076/FalconsLibrary/User/userList')
            setProducts([...response.data])
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
        }

    }

    useEffect(() => {
        getUsers();
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

        if (product.user_Name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            const index = findIndexById(product.user_ID);

            if (index === -1) {
                try {
                    const response = await axios.post('https://localhost:7076/FalconsLibrary/User/createUser', product);
                    _products.push(_product);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Creado correctamente', life: 3000 });
                } catch (error) {
                    console.log(error);
                    toast.current.show({ severity: 'error', summary: 'Error', detail: `Error: ${error}`, life: 3000 });
                }

            }
            else {
                try {
                    const res = await axios.put('https://localhost:7076/FalconsLibrary/User/updateUser', product, { params: { id: product.user_ID } });
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
            const res = await axios.delete('https://localhost:7076/FalconsLibrary/User/deleteUser', { params: { id: product.user_ID } });
            let _products = products.filter(val => val.user_ID !== product.user_ID);
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
            if (products[i].user_ID === id) {
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

        //temporary, mientras se resuelve lo de la encriptacion en el backend
        if (name === 'password') {
            _product[`${name}`] = "AAAE0g==";
        } else {
            _product[`${name}`] = val;
        }
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
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manejo de Usuarios</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
            <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
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
                    <Column field="user_ID" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="user_Name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="f_LastName" header="First Lastname" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="s_LastName" header="Second Lastname" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="email" header="Email" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="password" header="Password" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="role" header="Role" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Nuevo usuario" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="user_ID">Cedula</label>
                    <InputNumber id="user_ID" useGrouping={false} value={product.user_ID} onValueChange={(e) => onInputNumberChange(e, 'user_ID')} />
                    {submitted && !product.user_ID && <small className="p-error">Requerido</small>}
                </div>
                <div className="field">
                    <label htmlFor="user_Name">Nombre</label>
                    <InputText id="user_Name" value={product.user_Name} onChange={(e) => onInputChange(e, 'user_Name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.user_Name })} />
                    {submitted && !product.user_Name && <small className="p-error">Requerido</small>}
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="f_LastName">Primer Apellido</label>
                        <InputText id="f_LastName" value={product.f_LastName} onChange={(e) => onInputChange(e, 'f_LastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.f_LastName })} />
                        {submitted && !product.f_LastName && <small className="p-error">Requerido</small>}
                    </div>
                    <div className="field col">
                        <label htmlFor="s_LastName">Segundo Apellido</label>
                        <InputText id="s_LastName" value={product.s_LastName} onChange={(e) => onInputChange(e, 's_LastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.s_LastName })} />
                        {submitted && !product.s_LastName && <small className="p-error">Requerido</small>}
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="email">Correo</label>
                    <InputText id="email" value={product.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.email })} />
                    {submitted && !product.email && <small className="p-error">Requerido</small>}
                </div>
                <div className="field">
                    <label htmlFor="password">Contraseña</label>
                    <InputText id="password" value={product.password} onChange={(e) => onInputChange(e, 'password')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.password })} />
                    {submitted && !product.password && <small className="p-error">Requerido</small>}
                </div>
                <div className="field">
                    <label htmlFor="role">Role</label>
                    <InputText id="role" value={product.role} onChange={(e) => onInputChange(e, 'role')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.role })} />
                    {submitted && !product.role && <small className="p-error">Requerido</small>}
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

export default AdminUsuarios