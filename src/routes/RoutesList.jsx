import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ROUTES } from '../utils/Constants'
import CreateClient from '../screen/CreateClient'
import Home from '../screen/Home'
import Report from '../screen/Report'
import ClientList from '../screen/ClientList'

const RoutesList = () => {
    return (
        <BrowserRouter >
            <Navbar />
            <Routes>
                <Route path={ROUTES.CREATE_CLIENT} element={<CreateClient />} />
                <Route path={ROUTES.REPORT} element={<Report />} />
                <Route path={ROUTES.CLIENT_LIST} element={<ClientList />} />
                <Route path="/*" element={<ClientList />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesList
