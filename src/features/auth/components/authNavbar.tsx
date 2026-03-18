import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logos/logo.svg";
import SunIcon from "../../../assets/svgIcons/SunIcon";
import MoonIcon from "../../../assets/svgIcons/MoonIcon";
import { toggleTheme, isDarkMode } from "../../../utils/toggleTheme";
import { Button } from "../../../components/ui/Button";

const AuthNavbar = () => {
    const [isDark, setIsDark] = useState(() => isDarkMode());
    const navigate = useNavigate();

    return (
        <nav className="w-full h-16 bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/10 flex items-center justify-between md:px-15 sm:px-10">
            {/* Logo + Name */}
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-brand rounded-full">
                    <img src={logo} alt="Brainly Logo" className="size-5" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">Brainly</span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-5">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="text-md! text-gray-600! dark:text-gray-300! hover:text-gray-900! dark:hover:text-white! font-medium! gap-1.5 px-4! rounded-2xl!"
                >
                    Home
                </Button>

                <button
                    onClick={(e) => {
                        toggleTheme(e.currentTarget);
                        setIsDark(prev => !prev);
                    }}
                    className="cursor-pointer transition-all duration-300 hover:scale-110 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                    aria-label="Toggle theme"
                >
                    {isDark
                        ? <SunIcon className="size-5 text-gray-200" />
                        : <MoonIcon className="size-5 text-gray-700" />
                    }
                </button>
            </div>
        </nav>
    );
};

export default AuthNavbar;
