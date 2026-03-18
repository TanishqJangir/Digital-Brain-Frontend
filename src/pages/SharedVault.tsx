import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Card } from "../features/dashboard/components/Card";
import CardModal from "../features/dashboard/components/CardModal";
import brainLogo from "../assets/logos/logo.svg";
import MoonIcon from "../assets/svgIcons/MoonIcon";
import SunIcon from "../assets/svgIcons/SunIcon";
import { isDarkMode } from "../utils/toggleTheme";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const SharedVault = () => {
    const { shareLink } = useParams();
    const [isDark, setIsDark] = useState(() => isDarkMode());
    const [data, setData] = useState<{ name: string; avatar?: string; contents: any[] } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    useEffect(() => {
        const fetchSharedVault = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/share/${shareLink}`);
                setData(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to load shared vault.");
            } finally {
                setIsLoading(false);
            }
        };

        if (shareLink) fetchSharedVault();
    }, [shareLink]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <img src={brainLogo} alt="Brainly Logo" className="size-10 text-brand animate-pulse" />
                    <p className="text-gray-500 dark:text-gray-400 font-medium">Loading vault...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-center max-w-sm px-4">
                    <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-2">
                        <span className="text-2xl">🚫</span>
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Vault Not Found</h1>
                    <p className="text-gray-500 dark:text-gray-400">{error || "This link is invalid or has expired."}</p>
                    <Link to="/" className="mt-4 px-6 py-2 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition">
                        Go to Brainly
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300 pb-20">

            {/* Card Detail Modal */}
            {selectedItem && (
                <CardModal
                    _id={selectedItem._id}
                    contentId={selectedItem._id}
                    title={selectedItem.title}
                    description={selectedItem.description}
                    url={selectedItem.url}
                    type={selectedItem.type}
                    customType={selectedItem.customType}
                    tags={selectedItem.tags || []}
                    createdAt={selectedItem.createdAt}
                    setModalOpen={() => setSelectedItem(null)}
                    onSuccess={() => { }}
                    isViewer={true}
                />
            )}
            {/* Header */}
            <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/10 px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="p-1.5 rounded-xl bg-brand flex items-center justify-center">
                        <img src={brainLogo} alt="Brainly Logo" className="size-6 brightness-0 invert" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Brainly
                    </span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden sm:flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {data.avatar ? (
                                <img src={data.avatar} alt="Avatar" className="size-8 rounded-full" />
                            ) : (
                                data.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {data.name}'s Vault
                        </span>
                    </div>

                    <button
                        onClick={(e) => {
                            const iconEl = e.currentTarget.querySelector('span');
                            if (iconEl) {
                                iconEl.classList.add('animate-spin-once');
                                setTimeout(() => iconEl.classList.remove('animate-spin-once'), 600);
                            }
                            document.documentElement.classList.toggle('dark');
                            setIsDark((prev: boolean) => !prev);
                        }}
                        className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400 transition-colors"
                        aria-label="Toggle theme"
                    >
                        <span className="block">
                            {isDark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
                        </span>
                    </button>
                </div>
            </header>

            {/* Content Display */}
            <main className="max-w-7xl mx-auto px-6 pt-8">
                <div className="mb-8 sm:hidden flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {data.avatar ? (
                            <img src={data.avatar} alt="Avatar" className="size-10 rounded-full" />
                        ) : (
                            data.name.charAt(0).toUpperCase()
                        )}
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{data.name}'s Vault</h1>
                        <p className="text-xs text-gray-500">Shared Collection</p>
                    </div>
                </div>

                {data.contents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-24 h-24 mb-6 rounded-3xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
                            <img src={brainLogo} alt="Brainly Logo" className="size-10 text-gray-300 dark:text-gray-600 opacity-50 grayscale" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">This vault is empty</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                            {data.name} hasn't added any public links or content to this vault yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                        {data.contents.map((item) => (
                            <Card
                                key={item._id}
                                _id={item._id}
                                contentId={item._id}
                                title={item.title}
                                url={item.url}
                                type={item.type}
                                tags={item.tags || []}
                                createdAt={item.createdAt}
                                isViewer={true}
                                onClick={() => setSelectedItem(item)}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};
