import React from 'react';
import './styleLoader.css';
function Loader(props) {
    return (
        <>
            <div className="main-div">
                <div className="center-div">
                    <div className="rot"></div>
                    <h3 id="loadText"> <span style={{ fontSize: '2rem' }} className="projName"> PaathShaala </span></h3>
                </div>

            </div>
        </>
    );
}

export default Loader;
