const Hero = () => {
    return (
        <div className="hero min-h-screen relative" style={{ backgroundImage: 'url(https://i.ibb.co/RpSw9vC/flatlay-iron-skillet-with-meat-and-other-food.jpg)' }}>
            <div className="bg-gray-800 absolute inset-0 bg-opacity-50"></div>
            <div className="hero-content absolute inset-0 text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold text-[#f16667]">Easy Dine</h1>
                    <p className="mb-5 text-gray-300">Fresh food on your doorstep.</p>

                    <div className="relative">

                        <input
                            type="text"
                            id="Search"
                            placeholder="Search for food"
                            className="w-full lg:w-96 rounded-md border-[#f16667] py-3 px-4 shadow-sm sm:text-sm"
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                            <button type="button" className="text-[#f16667] hover:text-[#f16667]">
                                <span className="sr-only">Search</span>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;