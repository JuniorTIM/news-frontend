import React from 'react';
import Footer from '../../components/News-components/Footer/Footer';
import Header from '../../components/News-components/Header/Header';
import Sidebar from '../../components/News-components/Sidebar/Sidebar';
import Panel from '../../components/Admin-panel-components/Admin-panel';

const Admin = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <Panel />
            <Footer />
        </div>
    );
};

export default Admin;