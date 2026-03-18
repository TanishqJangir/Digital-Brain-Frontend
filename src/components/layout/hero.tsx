// import hero from "../../assets/images/hero-image.png"
import { useNavigate } from "react-router-dom";
import PlayCircleIcon from "../../assets/svgIcons/PlayCircleIcon";
import { Button } from "../ui/Button";


const Hero = () => {
    const navigate = useNavigate();
    return (
        <div id="home" className="w-full h-screen flex justify-center items-center text-center px-23 bg-transparent dark:text-white text-black select-none border-b border-gray-200 dark:border-white/10">

            <div className="flex flex-col justify-start items-start md:gap-5 gap-3">
                <p className="flex items-center gap-2 text-brand text-sm dark:border-brand border-gray-300 border-2 md:px-5 px-3 md:py-1 rounded-full font-bold bg-[#e6e3f9] dark:bg-[#1c1340]">
                    <span className="relative flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-brand opacity-60"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
                    </span>
                    V2.0 IS NOW LIVE
                </p>
                <h1 className="text-5xl md:text-8xl font-bold md:text-left text-center">Your Personal Digital <span className="text-brand">Brain</span></h1>
                <p
                    className="text-lg md:text-xl text-gray-600 dark:text-gray-400 md:text-left text-center w-[70%]"
                >
                    Save, organize, and retrieve important links from YouTube, Twitter, Notion, and more in one secure vault. Built for the modern mind.
                </p>
                <div className="flex md:gap-6 gap-4 md:justify-start justify-center items-center w-full">
                    <Button
                        variant="primary"
                        className="rounded-3xl! font-semibold md:py-3 md:px-6 md:mt-4 py-1 px-4 mt-2 text-lg md:text-2xl hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Get Started for Free
                    </Button>
                    <Button
                        variant="secondary"
                        className="flex gap-2 rounded-3xl! font-semibold md:py-3 md:px-6 md:mt-4 py-1 px-4 mt-2 md:text-2xl text-lg hover:scale-104 transition-transform duration-300 ease-in-out cursor-pointer"
                        onClick={() => {
                            document.getElementById("vault-preview")?.scrollIntoView({ behavior: "smooth" });
                        }}
                    >
                        <PlayCircleIcon className="md:size-7 size-5 text-brand" />
                        Vault Preview
                    </Button>
                </div>
            </div>
            <span className="hidden md:block ml-10 shrink-0">
                <div className="relative w-140 h-105">
                    {/* Glow — light mode */}
                    <div className="absolute inset-0 -m-16 rounded-full bg-brand/20 blur-[80px] pointer-events-none dark:hidden" />
                    {/* Glow — dark mode */}
                    <div className="absolute inset-0 -m-16 rounded-full bg-brand/30 blur-[100px] pointer-events-none hidden dark:block" />
                    <div className="relative rounded-2xl border border-white/20 shadow-2xl overflow-hidden bg-white/5 dark:bg-[#15151b] flex flex-col h-full">
                        {/* Title bar */}
                        <div className="h-9 shrink-0 bg-white/50 dark:bg-black/50 border-b border-white/20 flex items-center px-4 gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                            <div className="mx-auto w-1/2 h-5 bg-slate-200 dark:bg-white/10 rounded-full"></div>
                        </div>
                        {/* App body */}
                        <div className="flex h-full">
                            {/* Sidebar */}
                            <div className="w-35 shrink-0 border-r border-white/10 p-4 flex flex-col gap-3">
                                <div className="h-3.5 bg-brand/30 rounded-full w-full"></div>
                                <div className="h-3 bg-white/10 rounded-full w-3/4"></div>
                                <div className="h-3 bg-white/10 rounded-full w-5/6"></div>
                                <div className="h-8 bg-white/10 rounded-lg w-full"></div>
                                <div className="h-3 bg-white/10 rounded-full w-2/3"></div>
                            </div>
                            {/* Cards grid */}
                            <div className="flex-1 p-4 grid grid-cols-2 gap-4">
                                <div className="bg-slate-100 dark:bg-white/5 rounded-xl border border-white/10"></div>
                                <div className="bg-slate-100 dark:bg-white/5 rounded-xl border border-white/10"></div>
                                <div className="bg-slate-100 dark:bg-white/5 rounded-xl border border-white/10"></div>
                                <div className="bg-slate-100 dark:bg-white/5 rounded-xl border border-white/10"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </span>
        </div>
    );
};


export default Hero;