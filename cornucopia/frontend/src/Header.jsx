import Popup from 'reactjs-popup';
import StockPantry from './StockPantry';

import cornucopia from './cornucopia.png';

export default function Header(props) {
    return (
    <>
        <div className="bg-white shadow overflow-hidden rounded-lg w-1/2 min-w-fit mb-2 sm:my-0 my-16 drop-shadow-2xl">
            <h1 className="p-5 leading-none text-6xl font-['Oswald'] text-center">Cornucopia</h1>
            <h4 className="font-['Merriweather'] text-center text-lg text-gray-400">From Bob Pham</h4>
        </div>
        <img src={cornucopia} alt="cornucopia logo" className="h-20"></img>
        <div className="sm:mb-8 mb-3">
            <Popup 
            trigger={<button className="btn btn-outline btn-wide hover:bg-white border-white border-2 hover:border-white text-white hover:text-blue-500 font-bold">
                Stock Pantry</button>}
            modal>
                {close => (<StockPantry closePopup={ close } setItems={ props.setItems } currCount={props.currCount} setCount={props.setCount} />)}
            </Popup>
        </div>
    </>)
}
