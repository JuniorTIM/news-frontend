import React from 'react';

import Header from '../../components/News-components/Header/Header'
import Sidebar from '../../components/News-components/Sidebar/Sidebar'
import Main from '../../components/News-components/Main/Main'
import Footer from '../../components/News-components/Footer/Footer'

const News = () => {
    return (
        <div>
            <Header />
            <Sidebar />
            <Main />
            <Footer />
        </div>
    );
};

export default News;