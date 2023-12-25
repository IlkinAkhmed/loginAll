import React from 'react'
import Navbar from './navbar/index';
import { Outlet } from 'react-router';
import Footer from './footer';

function MainLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout