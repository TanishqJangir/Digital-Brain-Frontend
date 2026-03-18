import { useNavigate } from "react-router-dom";
import RightArrow from "../../assets/svgIcons/RightArrow";
import { Button } from "../ui/Button";

const fixedCards = [
    {
        image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&auto=format&fit=crop",
        tag: "Notion",
        time: "3 days ago",
        title: "Q4 Strategy: Product Roadmap & Growth",
        tagColor: "bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300",
    },
    {
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop",
        tag: "YouTube",
        tagColor: "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400",
        time: "1 week ago",
        title: "How to Build a Second Brain — Full Tutorial",
    },
    {
        image: "https://images.unsplash.com/photo-1543269664-76bc3997d9ea?w=600&auto=format&fit=crop",
        tag: "Twitter",
        tagColor: "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
        time: "2 days ago",
        title: "Thread: 10 mental models every founder should know",
    },

];

const VaultPreview = () => {
    const navigate = useNavigate();
    return (
        <div id="vault-preview" className="w-full h-screen dark:bg-[#080808] flex flex-col px-6 sm:px-12 lg:px-24 py-8 gap-8 border border-gray-200 dark:border-white/10">
            <div className="flex justify-between items-start mt-15">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl md:text-4xl font-bold dark:text-white text-black select-none" style={{ fontFamily: 'Inter, sans-serif' }}>The Vault Preview</h1>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Sneak peak at how your knowledge is organized.
                    </p>
                </div>
                <Button
                    variant="ghost"
                    className="group/btn flex gap-2 rounded-full! font-semibold p-0! text-sm md:text-lg transition-all duration-300 ease-in-out hover:bg-transparent dark:hover:bg-transparent!"
                    onClick={() => { navigate("/login") }} //TODO: Add functionality to navigate to the vault page
                >
                    View All
                    <RightArrow className="md:size-7 size-4 mt-1 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1.5" />
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-8">
                {fixedCards.map((card, index) => (
                    <div
                        key={index}
                        className="group rounded-2xl overflow-hidden flex flex-col dark:bg-[#151515] bg-white border dark:border-white/10 border-gray-200 hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer shadow-sm hover:shadow-[0_12px_40px_rgba(99,102,241,0.2)] dark:hover:shadow-[0_12px_40px_rgba(99,102,241,0.2)]"
                    >
                        <div className="w-full h-48 md:h-64 overflow-hidden shrink-0">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                        </div>
                        <div className="p-4 flex flex-col gap-2 flex-1">
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded ${card.tagColor}`}>
                                    {card.tag}
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">{card.time}</span>
                            </div>
                            <h3 className="md:text-lg text-base font-bold dark:text-white text-gray-900 leading-snug group-hover:text-brand" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {card.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VaultPreview;



{/*
    // import LinkIcon from "../../../assets/svgIcons/LinkIcon";
// import Logo from "../../../assets/images/hero-image.png";
import DeleteIcon from "../../../assets/svgIcons/DeleteIcon";

export interface CardProps {
    title: string;
    description?: string;
    type: "youtube" | "x" | "notion" | "linkedin" | "instagram" | "github" | "link" | "other";
    url: string;
    tags?: string[];
    date?: string;
    onClick?: () => void;
}

export const typeStyles: Record<CardProps["type"], { label: string; color: string }> = {
    youtube: { label: "YouTube", color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
    x: { label: "X", color: "bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 px-6" },
    notion: { label: "Notion", color: "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300" },
    linkedin: { label: "LinkedIn", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    instagram: { label: "Instagram", color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" },
    github: { label: "GitHub", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
    link: { label: "Link", color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    other: { label: "Other", color: "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300" },
};

export const Card = ({ title, description, type, url, tags = [], date, onClick }: CardProps) => {
    const { label, color } = typeStyles[type];

    return (
        <div
            className="flex flex-col gap-3 p-2 rounded-2xl bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer "
            onClick={onClick}
        >

            <div className="relative">
                <span className={`absolute top-2 left-2 text-xs font-semibold px-2.5 py-1 rounded-lg ${color}`}>{label}</span>
                <img src={`${url}`} alt="some image section" className="w-full object-cover rounded-xl" />
            </div>

            <div className="flex flex-col justify-between h-full px-1">

                <div>
                    <h3 className="text-md font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug ">{title}</h3>
                    {description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed mt-1">{description}</p>
                    )}

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {tags.map((tag, index) => (
                                <span key={index} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/8 text-gray-500 dark:text-gray-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                </div>
                <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs text-gray-400 dark:text-gray-600 mt-auto">{date}</p>
                    <DeleteIcon
                        onClick={() => { }} //TODO: Add delete functionality
                        className="size-5 dark:text-gray-400 cursor-pointer text-gray-400 hover:text-gray-700 dark:hover:text-white"
                    />
                </div>
            </div>
        </div>
    );
};

    */}