
import React from 'react';
import { useNavigate } from "react-router-dom"
import { TabMenu } from 'primereact/tabmenu';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentTab } from '../features/navigation/navigationSlice';

const Header = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const [currentTabState] = useSelector((state) => [
        state.navigationSlice.currentTabState,
    ]); 

    const logOutTab =  { label: 'Salir Sesión', icon: 'pi pi-fw pi-sign-out', pageURL: '/', logOut: true};

    const userTabs = [
        { label: 'Libros', icon: 'pi pi-fw pi-book', pageURL: '/libros' },
        { label: 'Multas', icon: 'pi pi-fw pi-file', pageURL: '/multas' },
        { label: 'Perfil', icon: 'pi pi-fw pi-user', pageURL: '/perfil'},
    ];
    const adminTabs = [...userTabs, { label: 'Admin', icon: 'pi pi-fw pi-server', pageURL: '/admin'}];

    const menuTabs = (user?.role === 'Administrador') ? [...adminTabs,  logOutTab] : [...userTabs, logOutTab]

    const changeTab = ({value, index}) => {
        if (value.logOut) {
            window.sessionStorage.removeItem('user');
            dispatch(setCurrentTab(0));
            navigate(value.pageURL);
        }else{
            dispatch(setCurrentTab(index));
            navigate(value.pageURL);
        }
    }

    return (
        <>
            <div className="card">
                <TabMenu model={menuTabs} activeIndex={currentTabState} onTabChange={changeTab} />
            </div>
        </>
    );
}

export default Header;
