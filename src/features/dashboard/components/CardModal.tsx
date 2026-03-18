import CrossIcon from "../../../assets/svgIcons/CrossIcon";
import { Button } from "../../../components/ui/Button";
import DeleteIcon from "../../../assets/svgIcons/DeleteIcon";
import { typeStyles } from "./Card";
import type { CardProps } from "./Card";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { EmbedLinks } from "../utils/EmbedTypes";

const CardModal = ({ contentId, title, description, url, type, customType, tags, createdAt, setModalOpen, onSuccess, isViewer = false }: { setModalOpen: (open: boolean) => void, onSuccess: () => void, isViewer?: boolean } & CardProps) => {

    const { color } = typeStyles[type];
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    return (
        <>
            {!isViewer && <DeleteModal onOpen={deleteModalOpen} onClose={setDeleteModalOpen} contentId={contentId} setModalOpen={setModalOpen} onSuccess={onSuccess} />}
            <div className="fixed inset-0 z-40 flex justify-center items-center bg-black/60 backdrop-blur-sm">
                <div className="relative flex flex-col gap-3 w-full max-w-[70vw] max-h-[90vh] overflow-y-auto bg-white dark:bg-[#111111] dark:text-white rounded-4xl shadow-2xl border border-gray-200 dark:border-white/10 px-8 py-8 mx-4 [&::-webkit-scrollbar]:w-0 [scrollbar-width:none]">
                    <CrossIcon
                        onClick={() => setModalOpen(false)}
                        className="size-5 absolute top-4 right-5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition cursor-pointer rounded-md"
                    />
                    <div className="flex justify-between">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${color}`}>
                            {type === "other" && customType ? customType : type}
                        </span>
                    </div>
                    <div className="flex flex-row gap-4 w-full h-full">
                        {/* Preview Section (60%) */}
                        <div className="relative w-[60%] h-full flex flex-col">
                            <div className="w-full h-full rounded-xl overflow-hidden">
                                <EmbedLinks type={type} customType={customType} url={url} />
                            </div>
                        </div>
                        {/* Content Section (40%) */}
                        <div className="flex flex-col justify-between w-[40%]">
                            <div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white leading-snug break-all">{title}</h3>
                                {description && (
                                    <p className="text-md text-gray-500 dark:text-gray-400 leading-relaxed mt-1 w-full wrap-break-word">{description}</p>
                                )}
                                {tags && tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {tags!.map((tag, index) => (
                                            <span key={index} className="flex items-center text-sm px-4 py-1 rounded-full bg-gray-100 dark:bg-white/8 text-gray-500 dark:text-gray-400 text-center">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="text-xs text-gray-400 dark:text-gray-600 mt-auto">
                                    {createdAt ? new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="open"
                                        onClick={() => window.open(url, "_blank")}
                                        className="rounded-xl!"
                                    >
                                        Open
                                    </Button>
                                    {!isViewer && (
                                        <Button
                                            variant="delete"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setDeleteModalOpen(true);
                                            }}
                                            className="rounded-xl!"
                                        >
                                            <DeleteIcon className="size-4" />
                                            Delete
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardModal;