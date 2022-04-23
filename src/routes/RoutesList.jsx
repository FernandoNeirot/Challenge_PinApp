import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { ROUTES } from '../utils/Constants'
import CreateClient from '../screen/CreateClient'
import Home from '../screen/Home'
import ListClient from '../screen/ListClient'
import ProjectionAnalysisClient from '../screen/ProjectionAnalysisClient'

const RoutesList = () => {
    return (
        <BrowserRouter >
            <Navbar />
            <Routes>
                <Route path={ROUTES.CREATE_CLIENT} element={<CreateClient />} />
                <Route path={ROUTES.LIST_CLIENT} element={<ListClient />} />
                <Route path={ROUTES.PROJECTION_ANALYSIS} element={<ProjectionAnalysisClient />} />
                <Route path="/*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesList
