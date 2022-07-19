import { useState } from 'react';
import Popup from 'reactjs-popup';
import StockPantry from './StockPantry';
import Trash from './Trash'
import ItemRow from './ItemRow';
import Header from './Header';
import 'react-calendar/dist/Calendar.css'; 

import cornucopia from './cornucopia.png';
import eye from './icons/icons8-eye-24.png';
import trash from './icons/icons8-trash-24.png';
import food from './icons/icons8-vegetarian-food-24.png';

class Item {
    constructor(name, company, quantity, date) {
        this.name = name;
        this.company = company;
        this.quantity = quantity;
        this.date = date;
    }
}

export default function Homescreen() {

    const [items, setItems] = useState({0: new Item("Bananas", "N/A", 1, new Date())});
    const [garbage, setGarbage] = useState({});
    const [count, setCount] = useState(0);

    return (
        <>
        <div className="drawer drawer-mobile bg-gradient-to-r from-yellow-500 to-orange-600 via-amber-500 animate-gradient-x sm:h-screen h-screen">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content grid place-items-center">
                <div className="w-full grid place-items-center text-slate-800 py-10">
                    <Header setItems={setItems} currCount={count} setCount={setCount}/>
                    <div className="grid bg-white rounded-lg w-9/12 min-w-fit font-['Merriweather'] place-items-center pb-10 drop-shadow-2xl sm:mb-0 mb-10">
                        <div className="flex justify-center items-center w-full">
                            <h1 className="font-['Oswald'] text-xl sm:text-slate-800 text-blue-500 text-center p-2">Pantry</h1>
                        </div>
                        <div className="grid w-11/12 place-items-center ">
                            <div className="sm:grid sm:grid-cols-5 sm:place-items-center w-full bg-gradient-to-r from-blue-600 to-cyan-400 via-sky-500 py-3 px-10 m-1 rounded-lg text-white font-['Oswald'] hidden">
                                <h1 className="w-max">Name</h1>
                                <h1 className="w-max">Brand</h1>
                                <h1 className="w-max">Quantity</h1>
                                <h1 className="w-max">Expiration Date</h1>
                                <h1 className="w-max ml-20">Actions</h1>
                            </div>
                            {Object.keys(items).length < 1 ? (<div className="grid place-items-center w-full bg-gray-700 rounded-lg p-2" ><h1 className="text-white font-['Merriweather'] mt-3">Pantry is Empty!</h1><img src={cornucopia} className="h-20"/></div>) 
                            : (<>{Object.entries(items).map( ([key, value]) => (<ItemRow key={key} itemKey={key} name={value.name} company={value.company} quantity={value.quantity} date={value.date === null ? null : value.date.toISOString().split('T')[0]} allItems={setItems} setGarbage={setGarbage} />))}</>)}
                        </div>
                    </div>
                </div>
                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden fixed top-0 left-0 space-y-2 m-2">
                    <span className="block w-8 h-1 bg-white"></span>
                    <span className="block w-8 h-1 bg-white"></span>
                    <span className="block w-8 h-1 bg-white"></span>
                </label>
            </div> 
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay" ></label>
              <ul className="menu p-4 overflow-y-auto w-80 bg-gradient-to-r from-blue-900 to-cyan-400 via-sky-700 animate-gradient-x sm:border-r-2 border-white font-['Merriweather'] text-white">
                <img src={cornucopia} alt="" className="w-1/4 place-self-center"/>
                <li><button>Scan Pantry<img src={eye} alt="" /></button></li>
                <li>
                    <Popup 
                        trigger={<button>Stock Pantry <img src={food} alt=""/></button>} 
                        modal>
                            {close => (
                                <StockPantry closePopup={ close } setItems={ setItems } currCount={ count } setCount={ setCount } />
                            )}
                    </Popup>
                </li>
                <li><Popup
                    trigger={<button>Trash<img src={trash} /></button>}
                    modal>
                        <Trash garbage={garbage} setGarbage={setGarbage} setItems={setItems} />
                    </Popup>    
                </li>
                <li>
                    <a href="/login">Sign out</a>
                </li>                
              </ul>
            </div>
        </div>
        </>
    );
}