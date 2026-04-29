function TopBar() {
    return (
        <div className="bg-black text-white text-xs sm:text-sm font-satoshi">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2 flex items-center justify-center relative text-center">

                <p className="px-6 sm:px-0">
                    Sign up and get 20% off to your first order.{" "}
                    <span className="underline cursor-pointer">Sign Up Now</span>
                </p>

                <span className="absolute right-4 sm:right-6 cursor-pointer">
          ✕
        </span>

            </div>
        </div>
    );
}

export default TopBar;