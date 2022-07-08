import pencil from './icons/icons8-edit-24.png'

let itemCount = 0;
let items = [["Canned Beans", "3", "07/04/22"], ["Cereal", "1", "08/04/22"], ["Rice", "1", "12/04/22"]]


function ItemRow() {

    let item = items[itemCount];
    itemCount = (itemCount + 1) % items.length;

    return (
        <div className="grid grid-columns-3 bg-slate-400 w-11/12  ">
            <h1>{item[2]}</h1>
            <h1>{item[1]}</h1>
            <button>
                <img src={pencil} alt="Restore" />
            </button>
        </div>
    )
}

export default function Trash() {
    return (
        <div className="grid place-items-center border-4 border-gray-200 rounded-lg bg-slate-800 w-11/12">
            <div className="grid grid-columns-3 w-11/12">
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
    )
}