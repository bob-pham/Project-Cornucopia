import { useState } from 'react';
import BatchSlice from './BatchSlice'
import DefaultRender from './DefaultRender';

import picture from './icons/icons8-picture-24.png';
import food from './icons/icons8-vegetarian-food-24.png';
import trash from './icons/icons8-trash-24.png';

export default function StockPantry(props) {

    const [selected, setSelected] = useState(false);
    const [single, setSingle] = useState(true);

    const selectSingle = () => {
        setSelected(true);
        setSingle(true);
    }

    const selectBatch = () => {
        setSelected(true);
        setSingle(false);
    }

    const renderElements = () => {
        if (selected) {
            if (single) {
                return (<DefaultRender closePopup={ props.closePopup } setItems={ props.setItems } currCount={props.currCount} setCount={props.setCount} />);
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
            <div className={selected ? "hidden" : "grid grid-cols-2"}>
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
