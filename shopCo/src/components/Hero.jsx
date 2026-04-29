function Hero() {
    return (
        <section className="w-full bg-[#F2F0F1]">

            {/* FULL WIDTH CONTENT */}
            <div className="w-full bg-red-900 gap-10 items-center">
                <img src="./Rectangle 2.png" className="w-full h-full relative"/>
                {/* LEFT */}
                <div className="absolute bg-transparent h-full top-0 flex flex-col justify-center left-16 text-center lg:text-left">
                    <h1 className="text-8xl font-integral font-black leading-tight">
                        FIND CLOTHES <br />
                        THAT MATCHES <br />
                        YOUR STYLE
                    </h1>

                    <p className="text-gray-600 mt-4 sm:mt-6 max-w-[500px] mx-auto lg:mx-0 font-satoshi">
                        Browse through our diverse range of meticulously crafted garments, designed
                        to bring out your individuality.
                    </p>

                    <div>
                        <button className="mt-6 bg-black text-white  pl-8 pr-8 pt-3 pb-3 rounded-full font-satoshi hover:opacity-90 flex">
                            Shop Now
                        </button>
                    </div>

                    {/* STATS */}
                    <div className="flex justify-between mt-20 font-satoshi">
                        <div>
                            <h2 className="text-5xl font-bold">200+</h2>
                            <p className="text-gray-500 text-sm">Brands</p>
                        </div>
                        <div className="w-0.5 h-20 bg-gray-300" />
                        <div>
                            <h2 className="text-5xl font-bold">2,000+</h2>
                            <p className="text-gray-500 text-sm">Products</p>
                        </div>
                        <div className="w-0.5 h-20 bg-gray-300" />
                        <div>
                            <h2 className="text-5xl font-bold">30,000+</h2>
                            <p className="text-gray-500 text-sm">Customers</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                {/* <div className="relative flex justify-center lg:justify-end overflow-hidden">
          <img
            src="/Rectangle 2.png"
            alt="Hero"
            // className="
            //   w-full
            //   h-[780px]
            //   // max-w-none
            //   // object-contain
            // "
            className="w-[1000px]"
          />
        </div> */}

            </div>
        </section>
    );
}

export default Hero;