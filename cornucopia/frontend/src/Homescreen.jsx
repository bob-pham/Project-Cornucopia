import cornucopia from './cornucopia.png';
import eye from './icons/icons8-eye-24.png';
import trash from './icons/icons8-trash-24.png';
import food from './icons/icons8-vegetarian-food-24.png';

export default function Homescreen() {
    return (
        <>
        <div className="drawer drawer-mobile bg-gradient-to-r from-yellow-500 to-orange-600 via-amber-500 animate-gradient-x">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center text-slate-800">
                <div className="bg-white shadow overflow-hidden rounded-lg w-1/2 min-w-fit mb-2">
                    <h1 className="p-5 leading-none text-6xl font-['Oswald'] text-center">Cornucopia</h1>
                    <h4 className="font-['Merriweather'] text-center text-lg text-gray-400">From Bob Pham</h4>
                </div>
                    <img src={cornucopia} alt="cornucopia logo" className="h-20"></img>
                <div className="sm:mb-8 mb-3">
                    <button className="btn btn-outline btn-wide hover:bg-white border-white border-2 hover:border-white text-white hover:text-blue-500 font-bold">Stock Pantry</button>
                </div>
                <div className="bg-white shadow overflow-hidden rounded-lg w-9/12 min-w-fit grid font-['Merriweather'] place-items-center">
                    <div className="flex justify-center items-center w-full">
                        <h1 className="font-['Oswald'] text-xl text-slate-800 text-center">Pantry</h1>
                    </div>
                    <table className="table-auto text-white w-11/12">
                        <thead className="rounded-lg bg-blue-600">
                            <tr className="font-['Oswald']">
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Expiration Date</th>
                                <th className="text-blue-600">temp</th>
                            </tr>
                        </thead>
                    </table>
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
                <li><a>Stock Pantry
                    <img src={food} alt="" /></a></li>
                <li><a>Trash
                    <img src={trash} alt="" /></a></li>
              </ul>

            </div>
        </div>
        </>
    );
}