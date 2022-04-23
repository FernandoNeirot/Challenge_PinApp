import React, { useState } from "react";
import { useFormik, FormikProvider, Field } from "formik";
import * as yup from "yup";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { calcAge, createIdClient } from "../utils/Globales";
import { addClient, existsClient } from "../service/firebaseConfig";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { LoadingButton } from "@mui/lab";
const validationSchema = yup.object({
    name: yup.string().required("Es requerido"),
    lastName: yup.string().required("Es Requerido"),
    birthDate: yup.date().required("Es requerido"),
    age: yup.number().moreThan(18,"Mayor a 21 años")
});

const CreateClient = () => {
    const navigate = useNavigate()
    const initialValues = {
        id: '',
        name: '',
        lastName: '',
        birthDate: new Date(),
        age: 0,
    };
    const [loading, setLoading] = useState(false);

    const formik = useFormik({

        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setLoading(true);
            values.id = createIdClient(values);
            existsClient(values.id)
            .then(res => {
                console.log(values)
                if (res)
                    toast.error("El cliente ya existe")
                else
                    addClient(values).then(res => {
                        toast.success("Cliente agregado")
                    });
            })
            .finally(x=> setLoading(false))
            
        },
    });

    return (
        <Grid container spacing={3} style={{ width: "50%", marginTop: "50px", marginLeft: "25%", boxShadow: "0px 2px 15px 0px rgba(0,0,0,0.75)" }}>
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <Container>
                        <Grid container direction="row" item xs={12}>
                            <Typography variant="h4" component="h1" style={{ width: "100%", padding: "10px", textAlign: "center" }}>
                                Crear nuevo cliente
                    </Typography>

                        </Grid>
                        <Grid container direction="row" item xs={12}>
                            <Grid item xs={12} justify="flex-start" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                <TextField
                                    id="name"
                                    name="name"
                                    label="Nombre"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.name &&
                                        Boolean(formik.errors.name)
                                    }
                                    helperText={
                                        formik.touched.name && formik.errors.name
                                    }
                                    // style={{ marginBlock: "3%" }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} justify="flex-start" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                <TextField
                                    id="lastName"
                                    name="lastName"
                                    label="Apellido"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.lastName &&
                                        Boolean(formik.errors.lastName)
                                    }
                                    helperText={
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                    // style={{ marginBlock: "3%" }}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={9} justify="flex-start" style={{ marginTop: "20px", marginBottom: "20px" }}>


                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="Fecha de NAcimiento"
                                        value={formik.values.birthDate}
                                        //   minDate={new Date('2017-01-01')}
                                        onChange={(newValue) => {
                                            formik.setFieldValue('birthDate', newValue);
                                            formik.setFieldValue('age', calcAge(newValue));
                                        }}
                                        // onChange={formik.handleChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={3} justify="flex-start" style={{ marginTop: "20px", marginBottom: "20px" }}>
                                <TextField
                                    id="age"
                                    name="age"
                                    label="Edad"
                                    disabled
                                    value={formik.values.age}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.age &&
                                        Boolean(formik.errors.age)
                                    }
                                    helperText={
                                        formik.touched.age && formik.errors.age
                                    }
                                    // style={{ marginBlock: "3%" }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </form>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                >
                    <Grid item xs={1}>
                        <LoadingButton
                            onClick={formik.handleSubmit}
                            loading={loading}
                            loadingIndicator="Loading..."
                            variant="outlined"
                        >
                            Agregar
                        </LoadingButton>
                    </Grid>
                </Grid>

            </FormikProvider>
        </Grid>
    );
};

export default CreateClient;
