import LinkIcon from "../../assets/svgIcons/LinkIcon";
import ShieldCheckIcon from "../../assets/svgIcons/ShieldCheckIcon";
import TagIcon from "../../assets/svgIcons/TagIcon";

const featuresCard = [
    {
        title: "Link Management",
        description: "Easily save links from any platform with a single click or keyboard shortcut. We automatically extract the title, description, and thumbnail for you. Works seamlessly with YouTube, Twitter, Notion, Reddit, and dozens more.",
        link: <LinkIcon className="size-8" />
    },
    {
        title: "Organize with Tags",
        description: "Categorize your content with nested tags, smart collections, and automated AI-driven folder organization. Quickly filter by topic, source, or date — and find anything in seconds with full-text search across all your saved content.",
        link: <TagIcon className="size-8" />
    },
    {
        title: "Secure Access",
        description: "Your data is end-to-end encrypted and accessible only by you. Multi-factor authentication keeps your vault safe. Access your brain from any device with real-time sync, and share curated collections with trusted collaborators.",
        link: <ShieldCheckIcon className="size-8" />
    },
];


const Features = () => {
    return (
        <div id="features" className="min-h-screen w-full dark:bg-[#080808] flex justify-start flex-col dark:text-white px-6 sm:px-12 lg:px-24 pb-20 border-b border-gray-200 dark:border-white/10">
            <div className="w-full">
                <div className="w-full py-20 flex flex-col justify-center items-center gap-4">
                    <h1 className="md:text-6xl font-extrabold">Powerful Features for Your <span className="text-brand">Digital Brain</span></h1>
                    <p className="text-lg md:text-2xl text-gray-400 w-[70%] text-center">Everything you need to manage your digital knowledge base in one place. No more lost tabs or broken bookmarks.</p>
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-between">
                        {featuresCard.map((card, index) => (
                            <div key={index} className="group flex flex-col justify-start items-start gap-4 p-6 bg-gray-100 dark:bg-[#151515] rounded-3xl dark:border-gray-700 border-gray-300 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] select-none">
                                <div className="p-2 rounded-2xl h-auto w-auto dark:bg-[#1a1839] bg-brand/10 text-brand transition-transform duration-300 ease-in-out group-hover:scale-110">
                                    {card.link}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">{card.title}</h2>
                                    <p className="text-xl text-gray-400">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Features;