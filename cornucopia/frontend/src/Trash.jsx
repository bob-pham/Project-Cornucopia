import Popup from 'reactjs-popup';
import { useState } from 'react';

import pencil from './icons/icons8-edit-24.png';
import trash from './icons/icons8-trash-24.png';

class Item {
    constructor(name, company, quantity, date) {
        this.name = name;
        this.company = company;
        this.quantity = quantity;
        this.date = date;
    }
}


function ItemRow(props) {

    const restoreItem = () => {
        const index = props.itemKey;
        
        props.setItems(ps => {
            let temp = {...ps};
            temp[index] = new Item(props.name, props.company, props.quantity, (props.date === null ? null : new Date(props.date)));
            return temp;
        })
        
        props.setGarbage(prevState => {
            let temp = {...prevState};
            delete temp[index];
            return temp;
        })
        

    }

    return (
        <div className="grid grid-cols-3 bg-slate-400 w-11/12 py-3 rounded-lg my-2 text-white text-center" >
            <h1 className="">{props.date === null ? "No Expiration Date!" : props.date}</h1>
            <h1>{props.name}</h1>
            <button class="btn mx-2 btn-sm border-2 btn-outline border-red-500 text-white hover:border-red-500 hover:bg-red-500  hover:text-white" onClick={restoreItem}>Restore</button>
            {/* <button className="btn btn-error btn-sm" onClick={restoreItem}>Restore</button> */}
        </div>
    )
}

export default function Trash(props) {
    return (
        <div className="grid w-screen place-items-center">
            <div className="grid grid-cols-2">
                <h1 className="text-xl font-['Oswald'] text-white">Trash</h1>
                <img src={trash} alt="" />
            </div>
            <div className="grid place-items-center p-5 border-4 border-gray-200 rounded-lg bg-slate-800 font-['Merriweather'] sm:w-10/12 ">
                <div className="grid grid-cols-3 w-11/12 font-['Oswald'] place-items-center">
                    <h1 className="w-max">Date Deleted</h1>
                    <h1 className="w-max">Name</h1>
                    <h1 className="w-max">Actions</h1>
                </div>
                {Object.keys(props.garbage).length < 1 ? (<div className="grid place-items-center m-4"><h1>Trash is Empty!</h1><img src={trash} alt="" className="my-1" /></div>) : (Object.entries(props.garbage).map( ([key, value]) => (<ItemRow key={key} itemKey={key} setGarbage={props.setGarbage} name={value.name} company={value.company} quantity={value.quantity} date={value.date} setItems={props.setItems}/>)))}
            </div>
        </div>
    )
}