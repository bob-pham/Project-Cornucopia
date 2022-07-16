import { useState } from 'react';
import Calendar from 'react-calendar';

import food from './icons/icons8-vegetarian-food-24.png';

class Item {
    constructor(name, company, quantity, date) {
        this.name = name;
        this.company = company;
        this.quantity = quantity;
        this.date = date;
    }
}


export default function DefaultRender({closePopup, addToState}) {

    const [prodName, setProdName] = useState("");
    const [compName, setCompName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [expDate, setExpDate] = useState(new Date());

    const saveSlice = () => {
        addToState(ps => [...ps, new Item(prodName, compName, quantity, expDate)]);
        removeSlice();
    }

    return (
        <>
        <div className="form-control max-w-xs w-fit m-1">
            <span className="label-text text-slate-800 font-['Oswald']">Product Name</span>
            <input type="text" placeholder="Type here" className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
        </div>
        <div className="form-control max-w-xs w-fit m-1">
            <span className="label-text text-slate-800 font-['Oswald']">Company</span>
            <input type="text" placeholder="Type here" className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
        </div>
            <input className="input-sm" id="num1" min="1" max="20" type="number" value="1" />
            <input type="range" min="1" max="20" value="1" className="range-lg"/>
        <h1 className="">Select Expiration Date:</h1>
        <Calendar className="w-fit"/>
        <div className="grid my-2 font-['Oswald'] text-sm place-items-center">
            <span>No Expiration Date</span>
        </div>
            <input type="checkbox" class="toggle m-0" unchecked />
        <button onClick={saveSlice} class="btn btn-xs sm:btn-sm md:btn-md bg-blue-600 border-0 text-white mt-1 " >
            <img src={food} alt="" />
            Add to Pantry
        </button>
        </>
    )
}