import { useState } from "react";
import Sidebar from "../components/sidebar";
import { EntityHeader, EntityContainer } from "../components/entity-Components";
import SidebarIcon from "../../../assets/svgIcons/SidebarIcon";
import AddContentModal from "../components/add-Content-Modal";
import CardModal from "../components/CardModal";
import type { CardProps } from "../components/Card";


const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [addContentmodalOpen, setAddContentModalOpen] = useState(false);
    const [cardModalOpen, setCardModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const refresh = () => setRefreshKey(k => k + 1);


    const handleCardClick = (card: CardProps) => {
        setSelectedCard(card);
        setCardModalOpen(true);
    };


    return (
        <div className="flex h-screen bg-gray-50 dark:bg-[#080808]">
            {addContentmodalOpen && <AddContentModal setModalOpen={setAddContentModalOpen} onSuccess={refresh} />}
            {cardModalOpen && selectedCard && <CardModal {...selectedCard} setModalOpen={setCardModalOpen} onSuccess={refresh} />}
            <div className="relative shrink-0 z-30">
                <Sidebar collapsed={collapsed} refreshKey={refreshKey} onSuccess={refresh} />
                <button
                    onClick={() => setCollapsed(prev => !prev)}
                    title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="cursor-pointer absolute -right-3.5 top-5 z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white shadow-sm transition-colors duration-150"
                >
                    <SidebarIcon className="size-4" />
                </button>
            </div>
            <main className="flex-1 overflow-y-auto">
                <EntityHeader setModalOpen={setAddContentModalOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <EntityContainer onCardClick={handleCardClick} refreshKey={refreshKey} onSuccess={refresh} searchQuery={searchQuery} />
            </main>
        </div>
    )
}

export default Dashboard