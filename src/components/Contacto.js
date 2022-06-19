import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Contactos = () => {
    //State de la app
    const [contactos, guardarContactos] = useState([]);

    // Cargar todos los contactos
    const cargarContactos = async () => {
        await clienteAxios.get('/contactos')
            .then(respuesta => {
                // Colocar en state
                guardarContactos(respuesta.data)
            }).catch(error => console.log(error));
    }

    useEffect(() => {
        cargarContactos();
    }, []);

    const navigate = useNavigate();

    // Eliminar un registro
    const eliminarContacto = id => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Un contacto eliminada no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡elimínalo!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Alerta de eliminado
                Swal.fire(
                    '¡Eliminado!',
                    'Tu registro ha sido eliminado.',
                    'success'
                );

                // Eliminado de la bd
                clienteAxios.delete(`/contactos/${id}`)
                    .catch(error => console.log(error));
                guardarContactos(contactos.filter(contacto => contacto.id !== id));
            }
        });
    }

    return (
        <Fragment>
            <h1 className="my-5">Administrador de contactos</h1>
            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/nuevo'} className="btn btn-success text-uppercase py-2 px-5
                        font-weight-bold">Crear contacto</Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <div className="list-group">
                            {contactos.map(contacto => (
                                <div className="d-flex w-100 justify-content-between p-5 list-group-item list-group-item-action 
                                flex-column align-items-start" key={contacto.id}>
                                    <h3 className="mb-3">Nombre: {contacto.nombres} {contacto.apellidos}</h3>
                                    <h3 className="mb-3">Correo: {contacto.correo}</h3>
                                    <h3 className="mb-3">Teléfono fijo: {contacto.telefono}</h3>
                                    <h3 className="mb-3">Celular: {contacto.celular}</h3>
                                    <h3 className="mb-3">Direccion: {contacto.direccion}</h3>
                                    <div style={{ width: "100%" }}>
                                        <button type="button" style={{ display: "inline-block", margin: "5px" }}
                                            className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger row"
                                            onClick={() => eliminarContacto(contacto.id)}
                                        >Eliminar</button>
                                        <button type="button" style={{ display: "inline-block", margin: "5px" }}
                                            className="text-uppercase py-2 px-5 font-weight-bold btn btn-info row"
                                            onClick={() => navigate(`/contactos/${contacto.id}/editar`)}
                                        >Editar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>);
}

export default Contactos;