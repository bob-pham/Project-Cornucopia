export default function Homescreen() {
    return (
        <>
        <div class="drawer drawer-mobile bg-gradient-to-r from-yellow-500 to-orange-600 via-amber-500 animate-gradient-x">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center text-slate-800">
                <div class="bg-white shadow overflow-hidden rounded-lg w-1/2 min-w-fit sm:mb-8 mb-3">
                    <h1 class="p-5 leading-none text-6xl font-['Oswald'] text-center">Cornucopia</h1>
                    <h4 class="font-['Merriweather'] text-center text-lg text-gray-400">From Bob Pham</h4>
                </div>
                <div class="bg-white shadow overflow-hidden rounded-lg w-9/12 min-w-fit">
                    <h1 class="text-center font-['Oswald'] text-xl">Pantry</h1>
                </div>
            </div>
            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            </div> 
            <div class="drawer-side">
              <label for="my-drawer-2" class="drawer-overlay" ></label>
              <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 font-['Merriweather'] text-white">
                <h1 class="p-4 font-['Oswald'] text-3xl">Cornucopia</h1>
                <li><a>Stock Pantry</a></li>
                <li><a>View Pantry</a></li>
                <li><a>Trash</a></li>
              </ul>

            </div>
        </div>
        </>
    );
}