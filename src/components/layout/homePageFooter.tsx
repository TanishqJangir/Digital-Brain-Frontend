import logo from "../../assets/logos/logo.svg";
import GithubIcon from "../../assets/svgIcons/GithubIcon";
import InstagramIcon from "../../assets/svgIcons/InstagramIcon";
import LinkdinIcon from "../../assets/svgIcons/LinkdinIcon";
import TwitterIcon from "../../assets/svgIcons/TwitterIcon";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Link } from "react-router-dom";

const HomePageFooter = () => {
    return (
        <div id="footer" className="w-full h-full flex flex-col justify-center items-center font-[480] text-gray-500 py-10 dark:bg-[#000000] bg-white">
            <div className="grid grid-cols-4 w-[86%] md:gap-10 gap-10 my-6">
                <div className="flex flex-col justify-between items-start md:gap-6 gap-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center text-black dark:text-white">
                            <div className="flex items-center justify-center w-7 h-7 md:h-6 md:w-6 bg-brand rounded-full">
                                <img src={logo} alt="Brainly Logo" className="md:size-4" />
                            </div>
                            <h1 className="md:text-xl text-lg font-bold">Brainly</h1>
                        </div>

                        <p>The only bookmarking tool you'll ever need. Built for the modern web and the curious minds that explore it.</p>
                    </div>
                    <div className="flex md:gap-4 gap-2 mt-2">

                        <a
                            href="https://github.com/TanishqJangir"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 dark:bg-[#0d0d0d] bg-[#f8fafc] dark:hover:bg-brand hover:scale-[1.1] rounded-2xl cursor-pointer transition duration-300"
                        >
                            <GithubIcon className="dark:text-white text-black hover:text-brand dark:hover:text-white" />
                        </a>

                        <a
                            href="https://www.instagram.com/tanishq__jangir/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 dark:bg-[#0d0d0d] bg-[#f8fafc] dark:hover:bg-brand hover:scale-[1.1] rounded-2xl cursor-pointer transition duration-300"
                        >
                            <InstagramIcon className="dark:text-white text-black hover:text-brand dark:hover:text-white" />
                        </a>

                        <a
                            href="https://www.linkedin.com/in/tanishq-jangir-b17b0725a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 dark:bg-[#0d0d0d] bg-[#f8fafc] dark:hover:bg-brand hover:scale-[1.1] rounded-2xl cursor-pointer transition duration-300"
                        >
                            <LinkdinIcon className="dark:text-white text-black hover:text-brand dark:hover:text-white" />
                        </a>

                        <a
                            href="https://x.com/Tanishq_Jangir"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 dark:bg-[#0d0d0d] bg-[#f8fafc] dark:hover:bg-brand hover:scale-[1.1] rounded-2xl cursor-pointer transition duration-300"
                        >
                            <TwitterIcon className="dark:text-white text-black hover:text-brand dark:hover:text-white" />
                        </a>

                    </div>
                </div>



                <div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center text-black dark:text-white">
                            <h1 className="md:text-xl text-lg font-bold">Product</h1>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <Link to="#" className="hover:text-brand transition-colors duration-300 cursor-pointer">
                                Changelog
                            </Link>
                            <Link to="#" className="hover:text-brand transition-colors duration-300 cursor-pointer">
                                Browser Extension
                            </Link>
                            <Link to="#" className="hover:text-brand transition-colors duration-300 cursor-pointer">
                                Integrations
                            </Link>
                            <Link to="#" className="hover:text-brand transition-colors duration-300 cursor-pointer">
                                Desktop App
                            </Link>
                        </div>
                    </div>
                </div>



                <div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center text-black dark:text-white">
                            <h1 className="md:text-xl text-lg font-bold">Support</h1>
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <Link to="#" className="hover:text-brand transition-colors duration-300 cursor-pointer">
                                Documentation
                            </Link>
                            <Link to="#" className="hover:text-brand transition-colors duration-300 cursor-pointer">
                                Contact Us
                            </Link>
                            <Link to="#" className="hover:text-brand transition-colors duration-300 cursor-pointer">
                                Privacy Policy
                            </Link>
                            <Link to="#" className="hover:text-brand transition-colors duration-300 cursor-pointer">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-2 items-center text-black dark:text-white">
                            <h1 className="md:text-xl text-lg font-bold">Stay Updated</h1>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p>Get the latest news and updates from our team.</p>
                            <div className="flex gap-2">
                                <Input type="text" placeholder="Enter your email" className="active:outline-none dark:text-gray-300 text-black placeholder-gray-600" />
                                <Button
                                    variant="primary"
                                    onClick={() => { }} //TODO: Add functionality to handle email subscription
                                >Join</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[86%] flex justify-between items-center border-t border-gray-400 dark:border-white/10 pt-6 text-gray-500 text-center text-sm">
                <p>© 2023 Your Company. All rights reserved.</p>
                <p>Designed with precision for your digital brain.</p>
            </div>
        </div>
    )
}

export default HomePageFooter;