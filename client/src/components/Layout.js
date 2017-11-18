import React from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";


const Layout = ({children}) => {
    return (
        <div className="root">
            <Navbar />
            <div className="container-fluid">
                <div className="container">
                    <div className="row-fluid">
                        <main id="main">
                            <div className="main">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
