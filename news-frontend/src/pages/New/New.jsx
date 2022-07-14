import React from 'react';
import Footer from '../../components/News-components/Footer/Footer';
import Header from '../../components/News-components/Header/Header';
import Sidebar from '../../components/News-components/Sidebar/Sidebar';
import Main from '../../components/New-components/Main';

const New = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <Main />
            <Footer />
        </div>
    );
};

export default New;