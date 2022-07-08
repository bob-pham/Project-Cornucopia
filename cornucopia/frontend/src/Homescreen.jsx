import Popup from 'reactjs-popup';
import StockPantry from './StockPantry';
import EditItem from './EditItem';
import Trash from './Trash'
import 'react-calendar/dist/Calendar.css'; 

import cornucopia from './cornucopia.png';
import eye from './icons/icons8-eye-24.png';
import trash from './icons/icons8-trash-24.png';
import food from './icons/icons8-vegetarian-food-24.png';
import pencil from './icons/icons8-edit-24.png'

let itemCount = 0;
let items = [["Bananas", "3", "07/04/22"], ["Protein Powder", "1", "08/04/22"], ["Rice", "1", "12/04/22"]]

function Header() {
    return (
    <>
        <div className="bg-white shadow overflow-hidden rounded-lg w-1/2 min-w-fit mb-2 sm:my-0 my-16">
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
        <div className="grid sm:grid-cols-5 place-items-center w-11/12 bg-gray-400 py-3 px-10 p-1 m-1 rounded-lg text-white text-sm text-center font-['Merriweather']">
            <h1 className="sm:hidden text-lg w-max font-['Oswald']">Product Name</h1>
            <h1 className="w-max ">{item[0]}</h1>
            <h1 className="sm:hidden text-lg w-max font-['Oswald']">Quantity</h1>
            <h1 className="w-max ">{item[1]}</h1>
            <h1 className="sm:hidden text-lg w-max font-['Oswald']">Expiration Date</h1>
            <h1 className="w-max">{item[2]}</h1>
            <div className="grid grid-cols-2 place-self-center">
                <button>
                    <img src={trash} alt="Delete" className="ml-20 bg-gray-400"/>
                </button>
                <Popup trigger={<button><img src={pencil} alt="Edit" className="ml-20 bg-gray-400" /></button>}
                       modal>
                    <EditItem />
                </Popup>
            </div>
        </div>
    )
}

export default function Homescreen() {
    return (
        <>
        <div className="drawer drawer-mobile bg-gradient-to-r from-yellow-500 to-orange-600 via-amber-500 animate-gradient-x sm:h-screen h-fit">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <div className="w-full flex flex-col items-center justify-center text-slate-800">
                    <Header />
                    <div className="grid bg-white rounded-lg w-9/12 min-w-fit font-['Merriweather'] place-items-center pb-10">
                        <div className="flex justify-center items-center w-full">
                            <h1 className="font-['Oswald'] text-xl text-slate-800 text-center p-2">Pantry</h1>
                        </div>
                        <div className="grid w-11/12 place-items-center">
                            <div className="sm:grid sm:grid-cols-5 sm:place-items-center w-11/12 bg-blue-600 py-3 px-10 m-1 rounded-lg text-white font-['Oswald'] hidden">
                                <h1 className="w-max">Name</h1>
                                <h1 className="w-max">Quantity</h1>
                                <h1 className="w-max">Expiration Date</h1>
                                <h1 className="w-max ml-20">Actions</h1>
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
              <label htmlFor="my-drawer-2" className="drawer-overlay" ></label>
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
                <li><Popup
                    trigger={<button>Trash<img src={trash} /></button>}
                    modal>
                        <Trash />
                    </Popup>    
                </li>                
              </ul>

            </div>
        </div>
        </>
    );
}