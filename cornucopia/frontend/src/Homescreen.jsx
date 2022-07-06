import Popup from 'reactjs-popup';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 

import cornucopia from './cornucopia.png';
import eye from './icons/icons8-eye-24.png';
import trash from './icons/icons8-trash-24.png';
import food from './icons/icons8-vegetarian-food-24.png';
import picture from './icons/icons8-picture-24.png';

let itemCount = 0;
let items = [["Bananas", "3", "07/04/22"], ["Protein Powder", "1", "08/04/22"], ["Rice", "1", "12/04/22"]]

function StockPantry() {
    return (
        <div className="grid bg-white p-5 border-gray-200 border-4 rounded-lg place-self-center place-items-center w-fit">
            <h1 className="font-['Oswald'] text-center text-lg text-slate-900" >Stock Pantry</h1>
            {/* <input className="btn text-center bg-slate-700">
                Upload Autofill
            </input> */}
            <div>
                <label for="files" className="btn bg-slate-800">
                    <img className="m-1" src={picture} alt="" />
                    Upload Auto-fill</label>
                <input id="files" className="hidden" type="file" accept="image/jpeg,image/gif,image/png"/>
            </div>
            <div className="form-control max-w-xs w-fit">
                <label className="label">
                  <span className="label-text text-slate-800 font-['Oswald']">Product Name</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
            </div>
            <div className="form-control max-w-xs w-fit">
                <label className="label">
                  <span className="label-text text-slate-800 font-['Oswald']">Company</span>
                </label>
                <input type="text" placeholder="Type here" className="input input-bordered w-fit max-w-xs bg-gray-300 font-['Merriweather']" />
            </div>
            <h1 className="">Select Expiration Date:</h1>
            <Calendar className="w-fit"/>
            <div className="grid my-2 font-['Oswald'] text-sm place-items-center">
                <span>No Expiration Date</span>
            </div>
                <input type="checkbox" class="toggle m-0" unchecked />
            <button class="btn btn-xs sm:btn-sm md:btn-md bg-blue-600 border-0 text-white mt-1">Add to Pantry</button>
        </div>
    )
}

function Header() {
    return (
    <>
        <div className="bg-white shadow overflow-hidden rounded-lg w-1/2 min-w-fit mb-2">
            <h1 className="p-5 leading-none text-6xl font-['Oswald'] text-center">Cornucopia</h1>
            <h4 className="font-['Merriweather'] text-center text-lg text-gray-400">From Bob Pham</h4>
        </div>
        <img src={cornucopia} alt="cornucopia logo" className="h-20"></img>
        <div className="sm:mb-8 mb-3">
            <Popup 
            trigger={<button className="btn btn-outline btn-wide hover:bg-white border-white border-2 hover:border-white text-white hover:text-blue-500 font-bold">
                Stock Pantry</button>}
            modal>
                <StockPantry />
            </Popup>
        </div>
    </>)
}

function ItemRow() {

    let item = items[itemCount];
    itemCount = (itemCount + 1) % items.length;

    return (
        <div className="grid grid-cols-4 w-11/12 bg-gray-400 py-3 px-10 m-1 rounded-lg text-white text-sm text-center font-['Merriweather']">
            <h1 className="w-max">{item[0]}</h1>
            <h1 className="w-max">{item[1]}</h1>
            <h1 className="w-max">{item[2]}</h1>
            <button>
                <img src={trash} alt="Delete" className="ml-20 bg-gray-400"/>
            </button>
        </div>
    )
}

export default function Homescreen() {
    return (
        <>
        <div className="drawer drawer-mobile bg-gradient-to-r from-yellow-500 to-orange-600 via-amber-500 animate-gradient-x">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center text-slate-800">
                <Header />
                <div className="bg-white shadow overflow-hidden rounded-lg w-9/12 min-w-fit grid font-['Merriweather'] place-items-center pb-10">
                    <div className="flex justify-center items-center w-full">
                        <h1 className="font-['Oswald'] text-xl text-slate-800 text-center p-2">Pantry</h1>
                    </div>
                    <div className="grid w-11/12 place-items-center">
                        <div className="grid grid-cols-4 w-11/12 bg-blue-600 py-3 px-10 m-1 rounded-lg text-white font-['Oswald']">
                            <h1 className="w-max">Name</h1>
                            <h1 className="w-max">Quantity</h1>
                            <h1 className="w-max">Expiration Date</h1>
                            <img src={trash} alt="Delete" className="ml-20 bg-blue-600"/>
                        </div>
                        {
                            items.map(item => (
                                <ItemRow />
                            ))
                        }
                    </div>
                </div>

            </div>
                <label for="my-drawer-2" className="drawer-button lg:hidden fixed top-0 left-0 space-y-2 m-2">
                    <span className="block w-8 h-1 bg-white"></span>
                    <span className="block w-8 h-1 bg-white"></span>
                    <span className="block w-8 h-1 bg-white"></span>
                </label>
            </div> 
            <div className="drawer-side">
              <label for="my-drawer-2" className="drawer-overlay" ></label>
              <ul className="menu p-4 overflow-y-auto w-80 sm:bg-base-100 bg-orange-400 font-['Merriweather'] text-white">
                <img src={cornucopia} alt="" className="w-1/4 place-self-center"/>
                <li><a>View Pantry
                    <img src={eye} alt="" /></a></li>
                <li>
                    <Popup 
                        trigger={<button>Stock Pantry <img src={food} alt=""/></button>} 
                        modal>
                        <StockPantry />
                    </Popup>
                </li>
                {/* <li><a>Stock Pantry
                    <img src={food} alt="" /></a></li> */}
                <li><a>Trash
                    <img src={trash} alt="" /></a></li>
              </ul>

            </div>
        </div>
        </>
    );
}