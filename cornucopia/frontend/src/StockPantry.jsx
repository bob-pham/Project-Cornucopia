import { useState } from 'react';
import Calendar from 'react-calendar';
import BatchSlice from './BatchSlice'

import picture from './icons/icons8-picture-24.png';
import food from './icons/icons8-vegetarian-food-24.png';
import trash from './icons/icons8-trash-24.png';

let items = [["1XT-SHIRT", "N/A"], ["1X WATCHES", "N/A"], ["1X PANTS", "N/A"], ["1X SOCKS", "N/A"]];

class Item {
    constructor(name, company, quantity, date) {
        this.name = name;
        this.company = company;
        this.quantity = quantity;
        this.date = date;
    }
}

export default function StockPantry({ closePopup }) {

    const [states, setStates] = useState({
        selected: false,
        single: true,
        elements: {}
    });

    const selectSingle = () => {
        setStates(previousState => {
            return {
                selected: true,
                single: true,
                elements: {0: new Item("", "", "")}
            }
        })   
    }

    const selectBatch = () => {
        setStates(previousState => {
            return {
                selected: true,
                single: false
            }
        })   
    }

    const renderElements = () => {
        if (states.selected) {
            if (states.single) {
                return (<DefaultRender closePopup={ closePopup } addToState={ setItems } />);
            } else {
                return (
                <div className="grid md:auto-cols-fit md:grid-flow-col-dense auto-rows-fit grid-flow-row-dense w-11/12">
                    {batch.map(item => ( BatchSlice(item[0], item[1])))}
                </div>
                )
            }

        } else {
            return null;
        }
    }

    return (
        <div className="grid bg-white p-5 border-gray-200 border-4 rounded-lg place-self-center place-items-center md:w-fit overflow-scroll w-screen sm:h-fit h-screen">
            <h1 className="font-['Oswald'] text-center text-lg text-slate-900" >Stock Pantry</h1>
            <div className={states.selected ? "hidden" : "grid grid-cols-2"}>
                <button className="btn btn-info m-1" onClick={selectSingle}>Manual Add</button>
                <div className=" m-1" >
                    <label className="btn bg-slate-800" for='image-upload' onClick={() => setTimeout(selectBatch, 3000)}>
                        <img className="m-1" src={picture} alt="" />
                        Receipt Batch Scan
                    </label>
                    <input type='file' id='image-upload' className="hidden"/>
                </div>
            </div>
            {renderElements()}
        </div>
    )
}
