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


export default function DefaultRender(props) {

    const [prodName, setProdName] = useState("");
    const [compName, setCompName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [expDate, setExpDate] = useState(new Date());
    const [hasDate, setHasDate] = useState(true);

    const saveSlice = () => {
        const index = props.currCount + 1;
        props.setCount(index);

        props.setItems(ps => {
            let temp = {...ps};
            temp[index] = new Item(prodName, compName, quantity, expDate);
            return temp;
        })

        props.closePopup()
    }

    const noExp = e => {
        if (e) {
            setExpDate(null);
            setHasDate(false);
        } else {
            setExpDate(new Date());
            setHasDate(true);
        }        
    }

    return (
        <>
        <div className="form-control max-w-xs w-fit m-1">
            <span className="label-text text-white font-['Oswald'] ">Product Name</span>
            <input type="text" placeholder="Type Here" defaultValue="No Name" onChange={e => setProdName(e.target.value)} className="input input-bordered w-fit max-w-xs bg-gray-100 font-['Merriweather'] text-slate-800" />            
        </div>
        <div className="form-control max-w-xs w-fit m-1">
            <span className="label-text text-white font-['Oswald']">Company</span>
            <input type="text" placeholder="Type Here" defaultValue="N/A" onChange={e => setCompName(e.target.value)} className="input input-bordered w-fit max-w-xs bg-gray-100 font-['Merriweather'] text-slate-800" />
        </div>
        <input className="input-sm bg-gray-100 rounded-lg text-slate-800" id="num1" min="1" max="20" step="1" type="number" 
            placeholder="1" defaultValue="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <input className="range-lg" id="num1" min="1" max="20" step="1" type="range" 
            placeholder="1" defaultValue="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <h1 className="text-white font-['Oswald']">Select Expiration Date:</h1>
        <Calendar className={hasDate ? "w-fit rounded-lg font-['Oswald']" : "hidden"} onChange={setExpDate} value={new Date()}/>
        <div className="grid my-2 font-['Oswald'] text-sm place-items-center text-white">
            <span>No Expiration Date</span>
        </div>
            <input type="checkbox" class="toggle m-0" checked={!hasDate} unchecked={hasDate} value={hasDate} onChange={e => noExp(e.target.checked)}/>
        <button onClick={saveSlice} class="btn btn-xs sm:btn-sm md:btn-md bg-blue-600 border-0 text-white mt-1 " >
            <img src={food} alt="" />
            Add to Pantry
        </button>
        <button className="btn btn-xs sm:btn-sm md:btn-md text-white mt-2 btn-error" onClick={props.closePopup}>Cancel</button>
        </>
    )
}