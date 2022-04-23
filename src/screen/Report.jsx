import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getClients } from '../service/firebaseConfig'
import { average, standardDeviation } from '../utils/Globales'

const Report = () => {
    // let clients=[];
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients().then(res => { setClients(res) });
    }, [])
    return (
        <Grid container spacing={3} style={{ width: "50%", marginTop: "50px", marginLeft: "25%", boxShadow: "0px 2px 15px 0px rgba(0,0,0,0.75)" }}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h1" style={{ width: "100%", padding: "10px", textAlign: "center" }}>
                    Calculos
                </Typography>
            </Grid>
            {
                clients.length > 0 ?
                    <Grid style={{marginLeft:"50px"}}>
                        <Grid item xs={12}>
                            El promedio de edades es {average(clients.map(x => x.age)).toLocaleString()}
                        </Grid>
                        <Grid item xs={12} style={{ marginBottom: "50px" }}>
                            La desviacion estandar de las edades es {standardDeviation(clients.map(x => x.age)).toLocaleString()}
                        </Grid>
                    </Grid> : "Obteniendo calculos..."
            }

        </Grid>
    )
}

export default Report
