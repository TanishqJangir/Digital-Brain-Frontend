import DeleteIcon from "../../../assets/svgIcons/DeleteIcon";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { EmbedLinks } from "../utils/EmbedTypes";
import CopyIcon from "../../../assets/svgIcons/CopyIcon";
import CheckIcon from "../../../assets/svgIcons/CheckIcon";
import toast from "react-hot-toast";

export interface CardProps {
    _id: string;
    contentId: string;
    title: string;
    description?: string;
    type: "youtube" | "x" | "notion" | "linkedin" | "instagram" | "github" | "link" | "other";
    customType?: string;
    url: string;
    tags?: string[];
    createdAt?: Date;
    isViewer?: boolean;
    onClick?: () => void;
    onSuccess?: () => void;
}

export const typeStyles: Record<CardProps["type"], { color: string }> = {
    youtube: { color: "bg-red-100/80 text-red-600 dark:bg-red-900/30 dark:text-red-400" },
    x: { color: "bg-sky-100/80 px-4 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400" },
    notion: { color: "bg-gray-300/60 text-gray-600 dark:bg-white/10 dark:text-gray-300" },
    linkedin: { color: "bg-blue-100/80 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    instagram: { color: "bg-pink-100/80 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" },
    github: { color: "bg-purple-100/80 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
    link: { color: "bg-green-100/80 text-green-600 dark:bg-green-900/30 dark:text-green-400" },
    other: { color: "bg-gray-100/80 text-gray-600 dark:bg-white/10 dark:text-gray-300" },
};

export const Card = ({ _id, contentId, title, description, type, customType, url, tags = [], createdAt, isViewer = false, onClick, onSuccess }: CardProps) => {
    const { color } = typeStyles[type];
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        toast.success("URL copied to clipboard!", {
            icon: null,
        });

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <>
            <DeleteModal onOpen={deleteModalOpen} onClose={setDeleteModalOpen} contentId={contentId} onSuccess={onSuccess} />
            <div
                className="flex flex-col gap-3 p-2 rounded-2xl bg-white dark:bg-[#151515] border border-gray-200 dark:border-white/10 shadow transition-transform duration-300 cursor-pointer hover:scale-[1.05] hover:shadow-2xl"
                onClick={onClick}
                key={_id}
            >

                <div className="relative">
                    <span className={`absolute top-2 left-2 text-xs font-semibold px-2.5 py-1 rounded-lg ${color}`}>
                        {type === "other" && customType ? customType : type}
                    </span>
                    <EmbedLinks type={type} customType={customType} url={url} />

                </div>

                <div className="flex flex-col justify-between h-full px-1">

                    <div>
                        <h3 className="text-md font-bold text-gray-900 dark:text-white line-clamp-2 wrap-break-word">{title}</h3>
                        {description && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 wrap-break-word line-clamp-3">
                                {description}
                            </p>
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
                        <p className="text-xs text-gray-400 dark:text-gray-600 mt-auto">
                            {createdAt ? new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}
                        </p>


                        <div className="flex gap-2">
                            <div
                                title={copied ? "Copied!" : "Copy URL"}
                            >

                                {copied ? (
                                    <CheckIcon
                                        onClick={e => {
                                            e.stopPropagation();
                                        }}
                                        className="size-5 cursor-pointer text-gray-400 dark:hover:text-white hover:text-gray-600" />
                                ) : (
                                    <CopyIcon
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleCopy();
                                        }}
                                        className="size-5 cursor-pointer text-gray-400 dark:hover:text-white hover:text-gray-600" />
                                )}

                            </div>
                            {!isViewer && (
                                <DeleteIcon
                                    onClick={e => {
                                        e.stopPropagation();
                                        setDeleteModalOpen(true);
                                    }} //TODO: Add delete functionality
                                    className="size-5 cursor-pointer text-gray-400 hover:text-red-500 "
                                />
                            )}

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};
