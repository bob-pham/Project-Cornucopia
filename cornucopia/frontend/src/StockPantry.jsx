import Calendar from 'react-calendar';

import picture from './icons/icons8-picture-24.png';
import food from './icons/icons8-vegetarian-food-24.png';

export default function StockPantry() {
    return (
        <div className="grid bg-white p-5 border-gray-200 border-4 rounded-lg place-self-center place-items-center w-fit">
            <h1 className="font-['Oswald'] text-center text-lg text-slate-900" >Stock Pantry</h1>
            <div>
                <label for="files" className="btn bg-slate-800">
                    <img className="m-1" src={picture} alt="" />
                    Upload Auto-fill</label>
                <input id="files" className="hidden" type="file" accept="image/jpeg,image/gif,image/png"/>
            </div>
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
                Add to Pantry</button>
        </div>
    )
}
