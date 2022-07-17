import { useState } from 'react';
import BatchSlice from './BatchSlice'
import DefaultRender from './DefaultRender';

import picture from './icons/icons8-picture-24.png';

export default function StockPantry(props) {

    const [selected, setSelected] = useState(false);
    const [single, setSingle] = useState(true);
    const [sliceCount, setSliceCount] = useState(4);

    const selectSingle = () => {
        setSelected(true);
        setSingle(true);
    }

    const selectBatch = () => {
        setSelected(true);
        setSingle(false);
    }

    let items = [["1XT-SHIRT" ,"N/A"], ["1X WATCHES", "N/A"], ["1X PANTS", "N/A"], ["1X SOCKS", "N/A"]];

    return (
        <div className="grid bg-white p-5 border-gray-200 border-4 rounded-lg place-self-center place-items-center md:w-fit overflow-scroll w-screen sm:h-fit h-screen">
            <h1 className="font-['Oswald'] text-center text-lg text-slate-900" >Stock Pantry</h1>
            <div className={selected ? "hidden" : "grid grid-cols-2"}>
                <button className="btn btn-info m-1" onClick={selectSingle}>Manual Add</button>
                <div className=" m-1" >
                    <label className="btn bg-slate-800" for='image-upload' onClick={selectBatch}>
                        <img className="m-1" src={picture} alt="" />
                        Receipt Batch Scan
                    </label>
                    <input type='file' id='image-upload' className="hidden"/>
                </div>
            </div>
            {selected ? (single ? (<DefaultRender closePopup={ props.closePopup } setItems={ props.setItems } currCount={props.currCount} setCount={props.setCount} />) 
                        : (<div className="grid md:auto-cols-fit md:grid-flow-col-dense auto-rows-fit grid-flow-row-dense w-11/12">
                            {items.map(item => ( <BatchSlice key={item[0]} prodName={item[0]} compName={item[1]} sliceCount={sliceCount} setSliceCount={setSliceCount} closePopup={ props.closePopup } setItems={ props.setItems } currCount={props.currCount} setCount={props.setCount} />))}
                          </div>))
                        : null}
        </div>
    )
}
