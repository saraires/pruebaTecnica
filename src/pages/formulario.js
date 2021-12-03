import React from 'react'
import ReactDOM from 'react-dom';
import { Container, Table } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';

export default function FormularioPaises() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        axios.post(`http://144.217.88.168:3030/api/user`, {
            firstName: data.nombres,
            lastName: data.apellidos,
            completeName: `${data.firstName} ${data.lastName}`,
            email: data.correo,
            sicCode: data.id,
            sicCodeType: data.tipoDocumento,
            mobilePhone: data.cel,
            nationality: data.nacionalidad,
            createdBy: "Sarai Restrepo",
            status: "ACTIVE"
        }).then(() => {
            swal.fire({
                title: "¡Todo Correcto!",
                text: "Se ha agregado el usuario con exito",
                icon: "success",
                confirmButtonText: "Ok",
            });
            window.location = `/realizarCompra`;
        }).catch((e) => {
            swal.fire({
                title: "Error!",
                text: "No agregarte, intenta de nuevo más tarde",
                icon: "error",
                confirmButtonText: "Ok",
            });
        });
    };

    const [nacionalidad, setNacionalidad] = useState([]);
    const [usuarios, setUsuarios] = useState([]);


    // Traer paises
    useEffect(() => {
        axios.get(`https://restcountries.com/v2/all`)
            .then((res) => {
                setNacionalidad(res.data);
            });
    }, []);

    // Get usuarios
    useEffect(() => {
        try {
            axios.get(`http://144.217.88.168:3030/api/user`)
                .then((res) => {
                    setUsuarios(res.data.data)
                })
        } catch (error) {
            console.log(error.message)
        }
    }, []);


    function validarEmail(valor) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
            alert("La dirección de email " + valor + " es correcta.");
        } else {
            alert("La dirección de email es incorrecta.");
        }
    }

    return (
        <div className="card">
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container col col-md-12 shadow-lg m-auto" style={{ padding: "30px", width: "50%" }}>
                    <h3 className="mb-3">Registro de usuarios</h3>
                    <div className="mb-3">
                        <label className="form-label">Tipo de documento</label>
                        <select className="form-select form-control"  {...register("tipoDocumento")}>
                            <option value="0git ">-- Seleccione --</option>
                            <option value="PA">Pasaporte</option>
                            <option value="CC">Cédula de eciudadanía</option>
                            <option value="CE">Cédula de extranjería</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Identificación</label>
                        <input className="form-control" type="number" id="form" {...register("id", { required: true, minLength: 10, min: 1 })} />
                        {errors.id && errors.id.type === "required" && <p style={{ color: 'red' }}>No puedes dejar vacio este campo</p>}
                        {errors.id && errors.id.type === "minLength" && <p style={{ color: 'red' }}>Por favor ingresa una identificacion válida</p>}
                        {errors.id && errors.id.type === "min" && <p style={{ color: 'red' }}>Por favor ingresa una identificacion válida</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nombre(s)</label>
                        <input className="form-control" type="text" id="form" {...register('nombres', { required: true, minLength: 2 })} />
                        {errors.nombres && errors.nombres.type === "required" && <p style={{ color: 'red' }}>No puedes dejar vacio este campo</p>}
                        {errors.nombres && errors.nombres.type === "minLength" && <p style={{ color: 'red' }}>¡Tu nombre es muy corto!</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input className="form-control" type="text" id="form" {...register('apellidos', { required: true, minLength: 3 })} />
                        {errors.apellidos && errors.apellidos.type === "required" && <p style={{ color: 'red' }}>No puedes dejar vacio este campo</p>}
                        {errors.apellidos && errors.apellidos.type === "minLength" && <p style={{ color: 'red' }}>¡Tus Apellidos son muy corto!</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Nacionalidad</label>
                        <select className="form-select form-control"  {...register("nacionalidad")}>
                            <option value="0">-- Selecciona uno </option>
                            {
                                nacionalidad.map((nacionalidad, index) => {
                                    return (
                                        <option value={nacionalidad.name} className="dropdown-item" key={index} >
                                            {nacionalidad.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Celular</label>
                        <input className="form-control" type="number" id="form"  {...register("cel", { required: true, minLength: 10, min: 1 })} />
                        {errors.cel && errors.cel.type === "min" && <p style={{ color: 'red' }}>Por favor ingresa un numero de télefono válido</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input className="form-control" type="email" id="form" {...register("correo")} onSubmit={(e) => { validarEmail(e.target.value) }} />
                    </div>

                    <button type="submit" className="btn btn-primary">Enviar</button>
                </div>
            </form>

            {/*  --------------------------------------------------------------------------------------------------------  */}
            {/*  --------------------------------------------------------------------------------------------------------  */}

            <div>
                <br />
                <Container className="container col-md-7 mb-4" style={{ justifyContent: "center", position: "relative", alignItems: "center" }}>
                    <br />
                    <h3 className="container">Usuarios</h3>
                    <br />
                    <center>
                        <Table
                            striped
                            hover
                            responsive
                            className="container table-responsive mb-5"
                            style={{ width: "100%", display: "block", margin: "auto" }}
                        >
                            <thead className="text-center pl-auto pr-auto table-bordered">
                                <tr className="table-light-gray">
                                    <th width="200px" scope="col">Documento</th>
                                    <th width="200px" scope="col">Nombre completo</th>
                                    <th width="200px" scope="col">Nacionalidad</th>
                                    <th width="200px" scope="col">Celular</th>
                                    <th width="200px" scope="col">Email</th>
                                </tr>
                            </thead>

                            <tbody className="text-center table-bordered" >
                                {usuarios.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{`${item.sicCodeType} - ${item.sicCode}`}</td>
                                            <td>{item.completeName}</td>
                                            <td>{item.nationality}</td>
                                            <td>{item.mobilePhone}</td>
                                            <td>{item.email}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </center>
                </Container>
            </div>
        </div>
    );
};