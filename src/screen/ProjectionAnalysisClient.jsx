import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getClients } from '../service/firebaseConfig'
import DataTable from 'react-data-table-component';
import { format, addYears  } from 'date-fns'
import { AGE_TO_DEATH } from '../utils/Constants';
const ProjectionAnalysisClient = () => {
    const [clients, setClients] = useState([])
    const columns = [
        {
            name: 'Nombre',
            selector: row => row.name,
        },
        {
            name: 'Apellido',
            selector: row => row.lastName,
        },
        {
            name: 'F. Nacimiento (MM/DD/YYYY)',
            selector: row => format(row.birthDate.toDate(),'MM/dd/yyyy'),
        },
        {
            name: 'Edad',
            selector: row => `${row.age} Años`,
        },
        {
            name: 'F. Muerte (MM/DD/YYYY)',
            selector: row => format(addYears(row.birthDate.toDate(),AGE_TO_DEATH),'MM/dd/yyyy'),
        },
        
    ];

    useEffect(() => {
        getClients().then(res => { setClients(res) });
    }, [])
    return (
        <Grid container spacing={3} style={{ width: "70%", marginTop: "50px", marginLeft: "15%", boxShadow: "0px 2px 15px 0px rgba(0,0,0,0.75)" }}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h1" style={{ width: "100%", padding: "10px", textAlign: "center" }}>
                    Projection and Analysis Client
                    {/* {clients&& clients.map(x=>x.birthDate.toLocaleString())} */}
                </Typography>
            </Grid>
            <DataTable
            columns={columns}
            data={clients}
        />
        </Grid>
    )
}

export default ProjectionAnalysisClient
