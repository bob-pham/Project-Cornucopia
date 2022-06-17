import React from 'react';
import Login from './Login';
import cornucopia from './images/cornucopia.png';

function Homescreen() {
    return (
        <>
        <div className="flex flex-wrap h-screen items-center justify-center bg-gradient-to-r from-blue-900 to-cyan-400 via-sky-700 animate-gradient-x">
            <div className='grid place-content-center'>
                <h1 className="mt-6 text-center text-7xl font-bold text-white">Cornucopia</h1>
                <img src={cornucopia} alt="cornucopia logo" className="h-80 place-self-stretch"></img>
                <Login />
            </div>
        </div>
        </>
    )
}

export default Homescreen;