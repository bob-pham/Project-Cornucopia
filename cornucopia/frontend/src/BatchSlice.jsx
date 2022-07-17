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

export default function BatchSlice(props) {

    const [visible, setVisible] = useState(true);
    const [prodName, setProdName] = useState(props.prodName);
    const [compName, setCompName] = useState(props.compName);
    const [quantity, setQuantity] = useState(1);
    const [expDate, setExpDate] = useState(new Date());
    const [hasDate, setHasDate] = useState(true);

    const removeSlice = () => {

        if (props.sliceCount <= 1) {
            props.closePopup();
        } else {
            setVisible(false);
            props.setSliceCount(props.sliceCount - 1);
        }

    }

    const saveSlice = () => {    
        const index = props.currCount + 1;
        props.setCount(index);

        props.setItems(ps => {
            let temp = {...ps};
            temp[index] = new Item(prodName, compName, quantity, expDate);
            return temp;
        })

        removeSlice();
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
        <div className={visible ? "grid place-items-center m-3 border border-gray-100 rounded-lg p-3 w-fit" : "hidden"}>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Product Name</span>                
                <input type="text" onChange={e => setProdName(e.target.value)} defaultValue={props.prodName} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather'] text-slate-800" />
            </div>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Company</span>
                <input type="text" onChange={e => setCompName(e.target.value)} defaultValue={props.compName} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather'] text-slate-800" />
            </div>
                <input className="input-sm bg-gray-300 rounded-lg text-slate-800" id="num1" min="1" max="20" step="1" type="number" 
                    placeholder="1" defaultValue="1" onChange={e => setQuantity(e.target.value)} value={quantity} />
                <input className="range-lg" id="num1" min="1" max="20" step="1" type="range" 
                    placeholder="1" defaultValue="1" onChange={e => setQuantity(e.target.value)} value={quantity} />        
            <h1 className="">Select Expiration Date:</h1>
            <Calendar className={hasDate ? "w-fit" : "hidden"} onChange={setExpDate} value={new Date()}/>
            <div className="grid my-2 font-['Oswald'] text-sm place-items-center">
                <span>No Expiration Date</span>
            </div>
                <input type="checkbox" class="toggle m-0" checked={!hasDate} unchecked={hasDate} value={hasDate} onChange={e => noExp(e.target.checked)}/>
            <button class="btn btn-xs sm:btn-sm md:btn-md bg-blue-600 border-0 text-white mt-1" onClick={ saveSlice }>
                <img src={food} alt="" />
                Add to Pantry
            </button>
            <input type="image" src={ trash } onClick={ removeSlice } className="btn btn-error md:btn-md sm:btn-sm btn-xs m-3"/>
        </div>
    )
}
