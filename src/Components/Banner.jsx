

const Banner = () => {
    return (
        <div className="lg:w-full ">
            <div className="hero lg:min-h-[40vh] lg:w-full  " style={{ backgroundImage: 'url(https://i.ibb.co/W24VNKm/istockphoto-1155621260-2048x2048.jpg)' }}>
                <div className="hero-overlay bg-opacity-80"></div>
                <div className="hero-content text-center text-neutral-content lg:w-full w-[300px]">
                    <div className=" lg:flex gap-24 justify-around items-center mt-6">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                            <p className="mb-5 lato-italic">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        </div>
                        {/* onSubmit={handleSearch} */}
                        <form  className="max-w-full mx-auto" >
                            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div className="relative border-2 md:w-[400px]">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-black dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                {/* onChange={(e) => setSearchInput(e.target.value)} */}
                                <input  type="search" id="default-search" className="block w-full p-4 pt-5 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50/65 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Food Name"  />
                                <button  type="submit" className="text-white  absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                            <button className="btn btn-active btn-ghost">Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;