import Popup from 'reactjs-popup';

import pencil from './icons/icons8-edit-24.png';
import trash from './icons/icons8-trash-24.png';


let itemCount = 0;
let items = [["Canned Beans", "3", "07/04/22"], ["Cereal", "1", "08/04/22"], ["Rice", "1", "12/04/22"]]


function ItemRow() {

    let item = items[itemCount];
    itemCount = (itemCount + 1) % items.length;

    return (
        <div className="grid grid-cols-3 bg-slate-400 w-11/12 py-3 rounded-lg my-2 text-white">
            <h1>{item[2]}</h1>
            <h1>{item[0]}</h1>
            <Popup trigger={<button><img src={pencil} alt="Restore" /></button>} modal>
            <div className="alert shadow-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Restore Pantry Item?</span>
                </div>
                <div className="flex-none">
                  <button className="btn btn-sm btn-ghost">Cancel</button>
                  <button className="btn btn-sm btn-primary">Accept</button>
                </div>
            </div>
            </Popup>

        </div>
    )
}

export default function Trash() {
    return (
        <div className="grid w-screen place-items-center">
            <div className="grid grid-cols-2">
                <h1 className="text-xl font-['Oswald'] text-white">Trash</h1>
                <img src={trash} alt="" />
            </div>
            <div className="grid place-items-center p-5 border-4 border-gray-200 rounded-lg bg-slate-800 font-['Merriweather'] sm:w-10/12">
                <div className="grid grid-cols-3 w-11/12 font-['Oswald']">
                    <h1 className="w-max">Date Deleted</h1>
                    <h1 className="w-max">Name</h1>
                    <h1 className="w-max">Actions</h1>
                </div>
                {
                    items.map(item => (
                        <ItemRow />
                        ))
                    }
            </div>
        </div>
    )
}