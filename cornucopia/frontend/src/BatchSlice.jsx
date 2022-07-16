import { useState } from 'react';
import Calendar from 'react-calendar';

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

export default function BatchSlice({name, company, addToState, closePopup}) {

    const [visible, setVisible] = useState(true);
    const [prodName, setProdName] = useState({name});
    const [compName, setCompName] = useState({company});
    const [quantity, setQuantity] = useState(1);
    const [expDate, setExpDate] = useState(new Date());

    const saveSlice = () => {
        addToState(ps => [...ps, new Item(prodName, compName, quantity, expDate)]);
        removeSlice();
    }

    const removeSlice = () => {
        setVisible(false);
        setProdName("");
        setCompName("");
        setQuantity(1);
        setExpDate(new Date());
    }

    return (
        <div className={visible ? "grid place-items-center m-3 border border-gray-100 rounded-lg p-3 w-fit" : "hidden"}>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Product Name</span>
                <input type="text" onChange={e => setProdName(e.target.value)} defaultValue={prodName} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
            </div>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Company</span>
                <input type="text" onChange={e => setCompName(e.target.value)} defaultValue={compName} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
            </div>
                <input className="input-sm" id="num1" min="1" max="20" type="number" value="1" />
                <input type="range" min="1" max="20" value="1" onChange={e => setQuantity(e.target.value)} className="range-lg"/>
            <h1 className="">Select Expiration Date:</h1>
            <Calendar className="w-fit" onChange={setExpDate}/>
            <div className="grid my-2 font-['Oswald'] text-sm place-items-center">
                <span>No Expiration Date</span>
            </div>
                <input type="checkbox" class="toggle m-0" unchecked />
            <button class="btn btn-xs sm:btn-sm md:btn-md bg-blue-600 border-0 text-white mt-1" onClick={saveSlice}>
                <img src={food} alt="" />
                Add to Pantry
            </button>
            <input type="image" src={trash} onClick={removeSlice} className="btn btn-error md:btn-md sm:btn-sm btn-xs m-3"/>
        </div>
    )
}
