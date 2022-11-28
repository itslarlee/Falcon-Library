
import React from 'react';
import { useNavigate } from "react-router-dom"
import { TabMenu } from 'primereact/tabmenu';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentAdminNestedTab } from '../features/navigation/navigationSlice';

const AdminNestedHeader = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const [currentAdminNestedTabState] = useSelector((state) => [
        state.navigationSlice.currentAdminNestedTabState,
    ]); 

    const menuTabs = [
        { label: 'Libros', icon: 'pi pi-fw pi-book', pageURL: 'libros' },
        { label: 'Multas', icon: 'pi pi-fw pi-file', pageURL: 'multas' },
        { label: 'Perfil', icon: 'pi pi-fw pi-user', pageURL: 'perfil'},
    ];

    const changeTab = ({value, index}) => {
        dispatch(setCurrentAdminNestedTab(index));
        navigate(`admin/${value.pageURL}`);
    }

    return (
        <>
            <div className="card">
                <TabMenu model={menuTabs} activeIndex={currentAdminNestedTabState} onTabChange={changeTab} />
            </div>
        </>
    );
}

export default AdminNestedHeader;
