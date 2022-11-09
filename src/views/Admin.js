import React from 'react'
import { Outlet } from 'react-router-dom'

function Admin() {
    return (
        <>
            <div>Admin</div>

            <Outlet />
        </>
    )
}

export default Admin