
import React from 'react';
import { useNavigate } from "react-router-dom"
import { TabMenu } from 'primereact/tabmenu';
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentTab } from '../features/navigation/navigationSlice';

const Header = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [userState, currentTabState] = useSelector((state) => [
       state.userSlice.userState,
        state.navigationSlice.currentTabState,
    ]); 

    const userTabs = [
        { label: 'Libros', icon: 'pi pi-fw pi-book', pageURL: '/libros' },
        { label: 'Multas', icon: 'pi pi-fw pi-file', pageURL: '/multas' },
        { label: 'Perfil', icon: 'pi pi-fw pi-user', pageURL: '/perfil'},
    ];
    const adminTabs = [...userTabs,
        { label: 'Admin', icon: 'pi pi-fw pi-server', pageURL: '/admin'}
    ];
    const menuTabs = (userState.role === 'Admin') ? adminTabs : userTabs

    const changeTab = ({value, index}) => {
        dispatch(setCurrentTab(index));
        navigate(value.pageURL);
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
