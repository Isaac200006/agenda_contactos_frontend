import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import clienteAxios from '../config/axios';

const NuevoContacto = () => {
    const params = useParams();
    const navigate = useNavigate();

    // State de contactos
    const [contacto, guardarContacto] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        telefono: '',
        celular: '',
        direccion: ''
    });

    // State para editar
    const [editar, guardarEditar] = useState(false);

    // Lee los datos del form
    const actualizarState = e => {
        guardarContacto({
            ...contacto,
            [e.target.name]: e.target.value
        });
    }

    // Cargar el contacto a editar
    const cargarContacto = async id => {
        await clienteAxios.get(`/contactos/${id}`)
            .then(respuesta => guardarContacto(respuesta.data));
        guardarEditar(true);
    }

    useEffect(() => {
        if (params.id) {
            cargarContacto(params.id);
        }
    }, [params.id]);

    // Enviar un contacto a la API
    const crearNuevoContacto = async (e) => {
        e.preventDefault();

        if (editar) {
            await clienteAxios.put(`/contactos/${params.id}`, contacto)
                .then(respuesta => {
                    console.log(respuesta.data);

                    // Redireccionar
                    navigate('/');
                });

        } else {
            // Enviar la petición por axios
            await clienteAxios.post('/contactos', contacto)
                .then(respuesta => {
                    console.log(respuesta.data);

                    // Redireccionar
                    navigate('/');
                });
        }
    }

    return (
        <Fragment>
            <h1 className="my-5">{editar ? 'Editar contacto' : 'Agregar contacto'}</h1>

            <div className="container mt-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5 d-flex justify-content-center">
                        <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5
                        font-weight-bold">Volver</Link>
                    </div>
                    <div className="col-md-8 mx-auto">
                        <form
                            onSubmit={crearNuevoContacto}
                            className="bg-white p-5 bordered">
                            <div className="form-group">
                                <label htmlFor="nombres">Nombres</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="nombres"
                                    name="nombres"
                                    placeholder="Nombres"
                                    value={contacto.nombres}
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="apellidos"
                                    name="apellidos"
                                    placeholder="Apellidos"
                                    value={contacto.apellidos}
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="correo">Correo</label>
                                <input
                                    type="tel"
                                    className="form-control form-control-lg"
                                    id="correo"
                                    name="correo"
                                    placeholder="Correo"
                                    value={contacto.correo}
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono fijo</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={contacto.telefono}
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="celular">Celular</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="celular"
                                    name="celular"
                                    placeholder="Celular"
                                    value={contacto.celular}
                                    onChange={actualizarState}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="direccion">Dirección</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="direccion"
                                    name="direccion"
                                    placeholder="Dirección"
                                    value={contacto.direccion}
                                    onChange={actualizarState}
                                />
                            </div>
                            <button type='submit' className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold">{editar ? 'Editar' : 'Agregar'}</button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default NuevoContacto;