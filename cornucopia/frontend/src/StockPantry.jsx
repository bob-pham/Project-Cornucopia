import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';

import picture from './icons/icons8-picture-24.png';
import food from './icons/icons8-vegetarian-food-24.png';
import trash from './icons/icons8-trash-24.png';

let items = [["1XT-SHIRT", "N/A"], ["1X WATCHES", "N/A"], ["1X PANTS", "N/A"], ["1X SOCKS", "N/A"]];

function DefaultRender() {
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
        <button class="btn btn-xs sm:btn-sm md:btn-md bg-blue-600 border-0 text-white mt-1">
            <img src={food} alt="" />
            Add to Pantry
        </button>
        </>
    )
}

function BatchSlice(name, company) {
    return (
        <div className="grid place-items-center m-3 border border-gray-100 rounded-lg p-3 w-fit">
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Product Name</span>
                <input type="text" defaultValue={name} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
            </div>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Company</span>
                <input type="text" defaultValue={company} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
            </div>
                <input className="input-sm" id="num1" min="1" max="20" type="number" value="1" />
                <input type="range" min="1" max="20" value="1" className="range-lg"/>
            <h1 className="">Select Expiration Date:</h1>
            <Calendar className="w-fit"/>
            <div className="grid my-2 font-['Oswald'] text-sm place-items-center">
                <span>No Expiration Date</span>
            </div>
                <input type="checkbox" class="toggle m-0" unchecked />
            <button class="btn btn-xs sm:btn-sm md:btn-md bg-blue-600 border-0 text-white mt-1">
                <img src={food} alt="" />
                Add to Pantry
            </button>
            <input type="image" src={trash} className="btn btn-error md:btn-md sm:btn-sm btn-xs m-3"/>
        </div>
    )
}

function BatchRender() {
    const [batch, setBatch] = useState(items);
    return (
        <>
        <div className="grid md:auto-cols-fit md:grid-flow-col-dense auto-rows-fit grid-flow-row-dense w-11/12">
            {batch.map(item => ( BatchSlice(item[0], item[1])))}
        </div>
        </>
    )
}



export default function StockPantry() {

    const [states, setStates] = useState({
        selected: false,
        single: true
    });

    const selectSingle = () => {
    
        setStates(previousState => {
            return {
                selected: true,
                single: true
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
                return (<DefaultRender />);
            } else {
                return (<BatchRender />)
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
