import axios from "axios";
import { Button } from "../../../components/ui/Button";
import toast from "react-hot-toast";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


const DeleteModal = ({ onOpen, onClose, contentId, setModalOpen, onDelete, onSuccess }: {
  onOpen?: boolean;
  onClose: (open: boolean) => void;
  contentId: string;
  setModalOpen?: (open: boolean) => void;
  onDelete?: (id: string) => void;
  onSuccess?: () => void;
}) => {

  const [loading, setLoading] = useState(false);

  const deleteContent = async () => {

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${BACKEND_URL}/api/v1/vault/${contentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data;

      toast.success(data.message || "Deleted the content successfully.", {
        duration: 3000,
        icon: null,
      });

      if (onDelete) {
        onDelete(contentId);
      }

      onClose(false);
      setLoading(false);
      if (setModalOpen) {
        setModalOpen(false);
      }

      if (onSuccess) {
        onSuccess();
      }

    } catch (error: any) {

      console.error("Error deleting content:", error);

      error.response?.data?.message
        ? toast.error(error.response.data.message)
        : toast.error("Failed to delete content. Please try again.");
    }
  }


  if (!onOpen) return null;
  return (
    <div className="fixed inset-0 z-51 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#151515] rounded-xl shadow-xl p-8 w-full max-w-md flex flex-col items-start">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 text-left w-full">Are you sure?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-left w-full">
          This action cannot be undone. Do you want to proceed?
        </p>
        <div className="flex gap-4 w-full justify-end">
          <Button variant="open" onClick={() => onClose(false)} className="rounded-xl">Cancel</Button>
          <Button variant="delete" onClick={deleteContent} className="rounded-xl">
            {loading ? "Deleting..." : "Confirm"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
