import React, { useState } from 'react'
import { Card } from 'primereact/card';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Login() {
    const [userState] = useSelector((state) => [
        state.userSlice.userState,
    ]);

    const LoginSchema = yup.object().shape({
        email: yup.string().email('Correo invalido').required('Este campo es requerido'),
        password: yup.string()
            .required('Este campo es requerido'),
    });

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const DEFAULT_URL = "/libros"
    // if (userState) {
    //     return <Navigate to={DEFAULT_URL} replace />
    // }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
        >
            {(props) => (
                <Form>
                    <div className="bg max-w-full max-h-full flex flex-row m-6 align-items-center justify-content-center">
                        <Card title="Inicio de sesion" className="m-4" style={{ width: '50rem', marginBottom: '2em' }}>
                            <div className="p-fluid grid">
                                <Field name="email">
                                    {({
                                        field,
                                        meta,
                                    }) => (
                                        <div className="field col-12 md:col-6">
                                            <span className="p-float-label">
                                                <InputText {...field} id="inputtext" className={meta.touched && meta.error && 'p-invalid block'} />
                                                <label htmlFor="inputtext">Correo universitario</label>
                                            </span>
                                            {meta.touched && meta.error && (
                                                <small id="username-help" className="p-error">{meta.error}</small>
                                            )}
                                        </div>
                                    )}
                                </Field>
                                <Field name="password">
                                    {({
                                        field,
                                        meta,
                                    }) => (
                                        <div className="field col-12 md:col-6">
                                            <span className="p-float-label">
                                                <Password inputId="password" {...field} feedback={false} toggleMask className={meta.touched && meta.error && 'p-invalid block'} />
                                                <label htmlFor="password">Contraseña</label>
                                            </span>
                                            {meta.touched && meta.error && (
                                                <small id="username-help" className="p-error">{meta.error}</small>
                                            
                                            )}
                                        </div>
                                    )}
                                </Field>

                                <div className="field col-12 md:col-12">
                                    <Button type="submit" label="Iniciar Sesión" className="p-button-rounded p-button-help" />
                                </div>

                            </div>
                        </Card>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Login