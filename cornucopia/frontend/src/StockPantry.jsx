import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';

import picture from './icons/icons8-picture-24.png';
import food from './icons/icons8-vegetarian-food-24.png';
import trash from './icons/icons8-trash-24.png';

let batchCount = 0;
let batch = [["1XT-SHIRT", "N/A"], ["1X WATCHES", "N/A"], ["1X PANTS", "N/A"], ["1X SOCKS", "N/A"]];

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

function BatchSlice() {

    let item = batch[batchCount];
    batchCount = (batchCount + 1) % batch.length;

    return (
        <div className="grid place-items-center m-3 border border-gray-100 rounded-lg p-3 w-fit">
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Product Name</span>
                <input type="text" defaultValue={item[0]} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
            </div>
            <div className="form-control max-w-xs w-fit m-1">
                <span className="label-text text-slate-800 font-['Oswald']">Company</span>
                <input type="text" defaultValue={item[1]} className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
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
    return (
        <>
        <div className="grid md:auto-cols-fit md:grid-flow-col-dense auto-rows-fit grid-flow-row-dense w-11/12">
            {/* {batch.map(b => (<BatchSlice />))} */}
        </div>
        </>
    )
}

export default function StockPantry() {

    const [curr, setCurr] = useState();

    return (
        <div className="grid bg-white p-5 border-gray-200 border-4 rounded-lg place-self-center place-items-center md:w-fit overflow-scroll w-screen sm:h-fit h-screen">
            <h1 className="font-['Oswald'] text-center text-lg text-slate-900" >Stock Pantry</h1>
            <div className="grid grid-cols-2">
                <button className="btn btn-info m-1 ">Manual Add</button>
                <div className=" m-1">
                    <label className="btn bg-slate-800" for='image-upload'>
                        <img className="m-1" src={picture} alt="" />
                        Receipt Batch Scan
                    </label>
                    <input type='file' id='image-upload' className="hidden"/>
                </div>
            </div>
            <div>
                <div className="hidden">
                    <div className="flex justify-center items-center space-x-2">
                      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                </div>
                <BatchRender className="hidden" />
            </div>
            <DefaultRender />
        </div>
    )
}
