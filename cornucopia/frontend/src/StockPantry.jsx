import { useState } from 'react';
import BatchSlice from './BatchSlice'
import DefaultRender from './DefaultRender';

import picture from './icons/icons8-picture-24.png';

export default function StockPantry(props) {

    const [selected, setSelected] = useState(false);
    const [single, setSingle] = useState(true);
    const [sliceCount, setSliceCount] = useState(4);
    const [visible, setVisible] = useState(false);

    const selectSingle = () => {
        setSelected(true);
        setSingle(true);
    }

    const selectBatch = () => {
        setSelected(true);
        setSingle(false);
    }

    const cheating = () => {
        setTimeout(() => setVisible(true), 10000)
        setTimeout(() => setVisible(false), 10000000)

        return (<div className={!visible ? "flex justify-center items-center" : "hidden"}>
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>)
    }


    let items = [["1XT-SHIRT" ,"N/A"], ["1X WATCHES", "N/A"], ["1X PANTS", "N/A"], ["1X SOCKS", "N/A"]];

    return (
        <div className="grid bg-gradient-to-r from-violet-800 to-fuchsia-600 via-purple-700 animate-gradient-x p-5 border-white border-8 rounded-lg place-self-center place-items-center md:w-fit overflow-scroll w-fit sm:h-fit h-screen">
            <h1 className="font-['Oswald'] text-center text-4xl text-white" >Stock Pantry</h1>
            <div className={selected ? "hidden" : "grid grid-cols-2"}>
                <button className="btn btn-lg btn-info m-1" onClick={selectSingle}>Manual Add</button>
                <div className=" m-1" >
                    <label type="image" src={picture} className="btn btn-lg bg-slate-800" for='image-upload' onClick={selectBatch}>
                        <img className="sm:m-1" src={picture} alt="" />
                        Receipt Scan
                    </label>
                    <input type='file' id='image-upload' className="hidden"/>
                </div>
            </div>
            {selected ? (single ? (<DefaultRender closePopup={ props.closePopup } setItems={ props.setItems } currCount={props.currCount} setCount={props.setCount} />) 
                        : (visible ? (<>
                            <div className="grid md:auto-cols-fit md:grid-flow-col-dense auto-rows-fit grid-flow-row-dense w-11/12">
                                {items.map(item => ( <BatchSlice key={item[0]} prodName={item[0]} compName={item[1]} sliceCount={sliceCount} setSliceCount={setSliceCount} closePopup={ props.closePopup } setItems={ props.setItems } currCount={props.currCount} setCount={props.setCount} />))}
                            </div>
                            <button className="btn btn-xs sm:btn-sm md:btn-md text-white mt-2 btn-error" onClick={props.closePopup}>Cancel</button>
                          </>
                          ) : cheating()))
                        : null}
        </div>
    )
}
