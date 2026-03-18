import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";


const ReadyHomeCard = () => {
    const navigate = useNavigate();
    return (
        <div id="ready-card" className="flex h-screen w-full justify-center items-center border-b border-gray-200 dark:border-white/10">
            <div className="bg-[#5f62e7] h-[60%] w-[80%] rounded-3xl flex flex-col justify-center items-center md:gap-10 gap-6 text-white px-10 text-center select-none">
                <div className="w-full flex flex-col justify-center items-center md:gap-3 gap-1">

                    <h1 className="md:text-5xl text-3xl w-[50%] font-extrabold">Ready to build your second brain?</h1>
                    <p className="text-lg md:text-xl text-[#e0e0fc] w-[50%]">Organize, capture, and retrieve your thoughts instantly with our intelligent note-taking platform.</p>
                </div>
                <div className="flex md:gap-5 gap-2">
                    <Button
                        variant="primary"
                        className="bg-white text-brand! md:font-bold md:text-xl font-semibold md:px-6 md:py-4 px-3 py-2 rounded-full! hover:bg-gray-200 transition-all duration-300 hover:scale-[1.03]"
                        onClick={() => { navigate("/signup") }}
                    >
                        Get Started for Free
                    </Button>

                    <Button
                        variant="primary"
                        className="bg-white/10 backdrop-blur-sm border border-white/40 text-white! md:font-bold md:text-xl font-semibold md:px-8 md:py-4 px-3 py-2 rounded-full! transition-all duration-300 hover:bg-white/20"
                        onClick={() => {
                            document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
                        }} //TODO: Add functionality to navigate to the about page
                    >
                        Learn More
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ReadyHomeCard;