import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../pages/home/Home'
import Crud from '../pages/crud/Crud'
import Layout from '../pages/layout/Layout'

const RouterContent = () => {
    return (
        <>

            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/crud' element={<Crud />} />
                </Route>
            </Routes>

        </>
    )
}

export default RouterContent