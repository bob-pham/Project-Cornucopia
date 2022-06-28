import React from 'react';

function Homescreen() {
    return (
        <>
        <div>
            <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
              <label for="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div> 
            <div className="drawer-side">
              <label for="my-drawer-2" className="drawer-overlay"></label> 
              <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
              </ul>
            </div>
            </div>
        </div>
        </>
    )
}

export default Homescreen;