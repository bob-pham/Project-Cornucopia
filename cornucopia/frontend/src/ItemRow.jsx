import { useState } from 'react';
import Popup from 'reactjs-popup';
import EditItem from './EditItem';

import pencil from './icons/icons8-edit-24.png'
import trash from './icons/icons8-trash-24.png';

export default function ItemRow(props) {

    const [prodName, setProdName] = useState(props.name);
    const [compName, setCompName] = useState(props.company);
    const [quantity, setQuantity] = useState(props.quantity);
    const [expDate, setExpDate] = useState(props.date);

    const labels = { prodName, compName, quantity, expDate};
    const setters = { setProdName, setCompName, setQuantity, setExpDate }

    const removeRow = () => {
        props.allItems(prevState => {
            let temp = {...prevState};
            delete temp[props.itemKey];
            return temp;
        })
    }

    return (
        <div className="grid sm:grid-cols-5 place-items-center w-full bg-gray-500 py-3 px-10 p-1 m-1 rounded-lg text-white text-sm text-center font-['Merriweather']">
            <h1 className="sm:hidden text-lg w-max font-['Oswald']">Product Name</h1>
            <h1 className="w-max ">{prodName}</h1>
            <h1 className="sm:hidden text-lg w-max font-['Oswald']">Brand</h1>
            <h1 className="w-max ">{compName}</h1>
            <h1 className="sm:hidden text-lg w-max font-['Oswald']">Quantity</h1>
            <h1 className="w-max ">{quantity}</h1>
            <h1 className="sm:hidden text-lg w-max font-['Oswald']">Expiration Date</h1>
            <h1 className="w-max">{expDate === null ? "No Expiration Date!" : expDate}</h1>
            <div className="grid grid-cols-2 place-self-center place-content-center">
                <Popup trigger={<input type="image" src={trash} className="mx-5 bg-gray-500"/>} modal>
                    {close => (
                        <div className="alert shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>Remove Pantry Item?</span>
                            </div>
                            <div className="flex-none">
                              <button className="btn btn-sm btn-ghost" onClick={close} >Cancel</button>
                              <button className="btn btn-sm btn-error" onClick={removeRow} >Remove</button>
                            </div>
                        </div>
                    )}
                </Popup>

                <Popup trigger={<input type="image" src={pencil} className="mx-5 bg-gray-500"/>}
                       modal>
                        {close => (<EditItem closer={close} key={props.itemKey} itemKey={props.itemKey} labels={labels} setters={setters} allItems={props.allItems}/>)}
                </Popup>
            </div>
        </div>
    )
}