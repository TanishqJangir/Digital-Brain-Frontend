import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import logo from "../../assets/logos/logo.svg";
import SunIcon from "../../assets/svgIcons/SunIcon";
import MoonIcon from "../../assets/svgIcons/MoonIcon";
import { toggleTheme, isDarkMode } from "../../utils/toggleTheme";

const Navbar = () => {
    const [isDark, setIsDark] = useState(() => isDarkMode());
    const navigate = useNavigate();

    return (
        <div className="w-full h-17 bg-white/90 backdrop-blur-sm dark:bg-[#111111]/90 dark:backdrop-blur-sm flex justify-between items-center dark:text-white px-4 sm:px-8 md:px-12 lg:px-20 text-black border-b border-gray-200 dark:border-white/10 fixed left-1/2 -translate-x-1/2 z-30">
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
                <div className="flex items-center justify-center w-7 h-7 md:h-9 md:w-9 bg-brand rounded-full">
                    <img src={logo} alt="Brainly Logo" className="md:size-6 size-4" />
                </div>
                <h1 className="md:text-2xl text-xl font-bold">Brainly</h1>
            </Link>
            <div className="hidden sm:flex lg:gap-15 gap-5 justify-center items-center text-sm md:text-base lg:text-lg">
                <a href="#home" className="dark:text-gray-300 font-medium dark:hover:text-white hover:text-brand transition">Home</a>
                <a href="#vault-preview" className="dark:text-gray-300 font-medium dark:hover:text-white hover:text-brand transition">Preview</a>
                <a href="#features" className="hidden md:inline dark:text-gray-300 font-medium dark:hover:text-white hover:text-brand transition">Features</a>
                <a href="#footer" className="hidden md:inline dark:text-gray-300 font-medium dark:hover:text-white hover:text-brand transition">Contact</a>
            </div>
            <div className="flex gap-4 justify-center items-center">
                <button
                    onClick={(e) => {
                        toggleTheme(e.currentTarget);
                        setIsDark(prev => !prev);
                    }}
                    className="cursor-pointer transition-all duration-300 hover:scale-110 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                >
                    {isDark
                        ? <SunIcon className="size-5 text-gray-200" />
                        : <MoonIcon className="size-5 text-gray-700" />
                    }
                </button>

                <Button
                    variant="ghost"
                    className="rounded-2xl! px-8! font-semibold text-sm md:text-base dark:bg-[#181336]! dark:hover:bg-[#181336] dark:hover:text-brand bg-gray-200! hover:text-indigo-500 active:scale-95 active:brightness-90"
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
                <Button
                    variant="primary"
                    className="rounded-2xl! md:px-6 px-3 text-sm md:text-base active:scale-95 active:brightness-90"
                    onClick={() => navigate("/signup")}
                >
                    Get Started
                </Button>
            </div>
        </div>
    );
};


export default Navbar;