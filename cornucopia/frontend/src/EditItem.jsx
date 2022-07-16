import Calendar from 'react-calendar';
import { useState } from 'react'

import food from './icons/icons8-vegetarian-food-24.png';

class Item {
    constructor(name, company, quantity, date) {
        this.name = name;
        this.company = company;
        this.quantity = quantity;
        this.date = date;
    }
}

export default function EditItem(props) {

    const [prodName, setProdName] = useState(props.labels.prodName);
    const [compName, setCompName] = useState(props.labels.compName);
    const [quantity, setQuantity] = useState(props.labels.quantity);
    const [expDate, setExpDate] = useState(props.labels.expDate === null ? null : new Date(props.labels.expDate));
    const [hasDate, setHasDate] = useState(props.labels.expDate != null);
    
    const saveItem = () => {

        props.allItems(prevState => {
            let temp = new Item(prodName, compName, quantity, expDate);
            let tempDict = {...prevState};
            tempDict[props.itemKey] = temp;
            return tempDict;
        })

        props.setters.setProdName(prodName);
        props.setters.setCompName(compName);
        props.setters.setQuantity(quantity);
        props.setters.setExpDate(expDate === null ? null : expDate.toISOString().split('T')[0]);

        props.closer();
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
        <div className="grid bg-white p-5 border-gray-200 border-4 rounded-lg place-self-center place-items-center w-fit">
            <h1 className="font-['Oswald'] text-center text-lg text-slate-900" >Edit Item</h1>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Product Name</span>
                <input type="text" placeholder={props.labels.prodName} defaultValue={props.labels.prodName} onChange={e => setProdName(e.target.value)} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather'] text-slate-800" />
            </div>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Company</span>
                <input type="text" placeholder={props.labels.compName} defaultValue={props.labels.compName} onChange={e => setCompName(e.target.value)} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather'] text-slate-800" />
            </div>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Quantity</span>
                <input className="input-sm bg-gray-300 rounded-lg text-slate-800" id="num1" min="1" max="20" step="1" type="number" 
                placeholder={props.labels.quantity} defaultValue={props.labels.quantity} value={quantity} onChange={e => setQuantity(e.target.value)} />
                <input className="range-lg" id="num1" min="1" max="20" step="1" type="range" 
                placeholder={props.labels.quantity} defaultValue={props.labels.quantity} value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <h1 className="">Select Expiration Date:</h1>
            <Calendar className={hasDate ? "w-fit" : "hidden"} onChange={setExpDate} value={expDate === null ? new Date() : new Date(props.labels.expDate)}/>
            <div className="grid my-2 font-['Oswald'] text-sm place-items-center">
                <span>No Expiration Date</span>
            </div>
                <input type="checkbox" class="toggle m-0" checked={!hasDate} unchecked={hasDate} value={hasDate} onChange={e => noExp(e.target.checked)}/>
            <button class="btn btn-xs sm:btn-sm md:btn-md bg-blue-600 border-0 text-white mt-1" onClick={saveItem}>
                <img src={food} alt="" />
                Save Item</button>
        </div>
    )
}