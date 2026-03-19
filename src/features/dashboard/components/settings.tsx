import { useState } from "react";
import axios from "axios";
import CrossIcon from "../../../assets/svgIcons/CrossIcon";
import MoonIcon from "../../../assets/svgIcons/MoonIcon";
import SunIcon from "../../../assets/svgIcons/SunIcon";
import CopyIcon from "../../../assets/svgIcons/CopyIcon";
import EditIcon from "../../../assets/svgIcons/EditIcon";
import { toggleTheme, isDarkMode } from "../../../utils/toggleTheme";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import loadingSpinner from "../../../assets/logos/loading.png";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

const Settings = ({ onOpen, onClose, userData, onSuccess }: {
    onOpen: boolean;
    onClose: (open: boolean) => void;
    userData: any;
    onSuccess: () => void;
}) => {
    const [isDark, setIsDark] = useState(() => isDarkMode());
    const isOAuthUser = (userData?.passwordLength ?? 0) === 0;
    const [isEditingName, setIsEditingName] = useState(false);

    const [passwordStage, setPasswordStage] = useState<"idle" | "otp" | "new_password">("idle");
    const [otpInput, setOtpInput] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [isSavingName, setIsSavingName] = useState(false);
    const [isRequestingOtp, setIsRequestingOtp] = useState(false);
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [isDeletingAccount, setIsDeletingAccount] = useState(false);

    const [name, setName] = useState(userData?.user?.name);
    const [editName, setEditName] = useState(name);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggingOut(true);
        setTimeout(() => {
            localStorage.removeItem("token");
            toast.success("Logged out successfully!");
            navigate("/login");
        }, 500);
        setIsLoggingOut(false);
    };

    const handleSaveName = async () => {
        if (!editName.trim()) return toast.error("Name cannot be empty");
        try {
            setIsSavingName(true);
            const token = localStorage.getItem("token");
            await axios.put(`${BACKEND_URL}/api/v1/auth/name`, { name: editName }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setName(editName);
            onSuccess();
            setIsEditingName(false);
            toast.success("Name updated successfully!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update name");
        } finally {
            setIsSavingName(false);
        }
    };

    const handleRequestPasswordOtp = async () => {
        try {
            setIsRequestingOtp(true);
            const token = localStorage.getItem("token");
            await axios.post(`${BACKEND_URL}/api/v1/auth/password-otp/generate`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("OTP sent to your email!");
            setPasswordStage("otp");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to send OTP");
        } finally {
            setIsRequestingOtp(false);
        }
    };

    const handleVerifyPasswordOtp = async () => {
        if (!otpInput) return toast.error("Please enter the OTP");
        try {
            setIsVerifyingOtp(true);
            const token = localStorage.getItem("token");
            await axios.post(`${BACKEND_URL}/api/v1/auth/password-otp/verify`, { otp: otpInput }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("OTP verified");
            setPasswordStage("new_password");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Invalid OTP");
        } finally {
            setIsVerifyingOtp(false);
        }
    };

    const handleSavePassword = async () => {
        if (editPassword.length < 6) return toast.error("Password must be at least 6 characters");
        try {
            setIsSavingPassword(true);
            const token = localStorage.getItem("token");
            await axios.put(`${BACKEND_URL}/api/v1/auth/password`, {
                otp: otpInput,
                newPassword: editPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Password updated successfully!");
            setPasswordStage("idle");
            setOtpInput("");
            setEditPassword("");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update password");
        } finally {
            setIsSavingPassword(false);
        }
    };

    const handleCancelPasswordEdit = () => {
        setPasswordStage("idle");
        setOtpInput("");
        setEditPassword("");
    };

    const handleCopyLink = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BACKEND_URL}/api/v1/share/create`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const link = response.data.shareLink;
            navigator.clipboard.writeText(`${FRONTEND_URL}/share/${link}`);
            toast.success("Link copied to clipboard!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to copy link");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            setIsDeletingAccount(true);
            const token = localStorage.getItem("token");
            await axios.delete(`${BACKEND_URL}/api/v1/auth/delete-account`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            localStorage.removeItem("token");
            toast.success("Account deleted permanently.");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to delete account. Please try again.");
            setIsDeletingAccount(false);
        }
    };

    if (!onOpen) return null;

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-gray-950/40 dark:bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white dark:bg-[#111111] shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 dark:border-white/10">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Settings</h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Manage your account preferences</p>
                    </div>
                    <button
                        onClick={() => onClose(false)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition cursor-pointer"
                    >
                        <CrossIcon className="size-4" />
                    </button>
                </div>

                <div className="px-6 py-5 flex flex-col gap-5 max-h-[75vh] overflow-y-auto [&::-webkit-scrollbar]:w-0 [scrollbar-width:none]">

                    {/* Profile Section */}
                    <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                            <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white text-xs font-bold shrink-0">
                                {userData?.user?.avatar ? (
                                    <img src={userData?.user?.avatar} alt="Avatar" className="size-12 rounded-full" />
                                ) : (
                                    userData?.user?.name?.charAt(0).toUpperCase()
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{userData?.user?.email}</p>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">Account Details</h3>

                        {/* Name */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400 dark:text-gray-500">Name</label>
                            {isEditingName ? (
                                <div className="flex gap-2">
                                    <input
                                        autoFocus
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="flex-1 px-3 py-2 rounded-lg text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/50"
                                    />
                                    <button onClick={handleSaveName} disabled={isSavingName} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-12.5">
                                        {isSavingName ? <img src={loadingSpinner} alt="Loading" className="size-4 animate-spin brightness-0 invert" /> : "Save"}
                                    </button>
                                    <button onClick={() => setIsEditingName(false)} disabled={isSavingName} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer disabled:opacity-50">Cancel</button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5">
                                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{name}</span>
                                    {!isOAuthUser && (
                                        <button onClick={() => { setIsEditingName(true); setEditName(name); }} className="text-gray-400 hover:text-brand transition cursor-pointer">
                                            <EditIcon className="size-4" />
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400 dark:text-gray-500">Email</label>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5">
                                {userData?.user?.email}
                            </p>
                        </div>

                        {/* Password */}
                        {/* Password */}
                        {!isOAuthUser && (
                            <div className="flex flex-col gap-1">
                                <label className="text-xs text-gray-400 dark:text-gray-500">Password</label>

                                {passwordStage === "otp" && (
                                    <div className="flex gap-2">
                                        <input
                                            autoFocus
                                            type="text"
                                            maxLength={6}
                                            value={otpInput}
                                            onChange={(e) => setOtpInput(e.target.value)}
                                            placeholder="Enter 6-digit OTP"
                                            className="flex-1 px-3 py-2 rounded-lg text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/50"
                                        />
                                        <button onClick={handleVerifyPasswordOtp} disabled={isVerifyingOtp} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-12.5">
                                            {isVerifyingOtp ? <img src={loadingSpinner} alt="Loading" className="size-4 animate-spin brightness-0 invert" /> : "Verify"}
                                        </button>
                                        <button onClick={handleCancelPasswordEdit} disabled={isVerifyingOtp} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer disabled:opacity-50">Cancel</button>
                                    </div>
                                )}

                                {passwordStage === "new_password" && (
                                    <div className="flex gap-2">
                                        <input
                                            autoFocus
                                            type="password"
                                            value={editPassword}
                                            onChange={(e) => setEditPassword(e.target.value)}
                                            placeholder="Enter new password"
                                            className="flex-1 px-3 py-2 rounded-lg text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand/50"
                                        />
                                        <button onClick={handleSavePassword} disabled={isSavingPassword} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand text-white hover:bg-brand/90 disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-12.5">
                                            {isSavingPassword ? <img src={loadingSpinner} alt="Loading" className="size-4 animate-spin brightness-0 invert" /> : "Save"}
                                        </button>
                                        <button onClick={handleCancelPasswordEdit} disabled={isSavingPassword} className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer disabled:opacity-50">Cancel</button>
                                    </div>
                                )}

                                {passwordStage === "idle" && (
                                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50 dark:bg-white/5">
                                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200 tracking-widest">
                                            {"•".repeat(userData?.passwordLength ?? 0)}
                                        </span>
                                        <button onClick={handleRequestPasswordOtp} disabled={isRequestingOtp} className="text-gray-400 hover:text-brand transition cursor-pointer disabled:opacity-50 flex items-center justify-center min-w-5">
                                            {isRequestingOtp ? <img src={loadingSpinner} alt="Loading" className="size-4 animate-spin opacity-50 dark:invert" /> : <EditIcon className="size-4" />}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    
                    <div className="border-t border-gray-100 dark:border-white/10" />

                    {/* Appearance */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Appearance</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{isDark ? "Dark mode is on" : "Light mode is on"}</p>
                        </div>
                        <button
                            onClick={(e) => {
                                toggleTheme(e.currentTarget);
                                setIsDark(prev => !prev);
                            }}
                            className="cursor-pointer transition-all duration-300 hover:scale-110 p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20"
                            aria-label="Toggle theme"
                        >
                            {isDark
                                ? <SunIcon className="size-4 text-yellow-400" />
                                : <MoonIcon className="size-4 text-gray-700" />
                            }
                        </button>
                    </div>

                    <div className="border-t border-gray-100 dark:border-white/10" />

                    {/* Share Vault */}
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Share your Vault</p>
                        </div>
                        <button
                            onClick={handleCopyLink}
                            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand/10 text-brand hover:bg-brand/20 transition cursor-pointer"
                        >
                            <CopyIcon className="size-3.5" />
                            Share
                        </button>
                    </div>

                    <div className="mt-2 flex flex-col gap-2">
                        {/* Logout */}
                        {!confirmDelete && (
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="w-full py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition cursor-pointer disabled:opacity-50 flex items-center justify-center min-h-10"
                            >
                                {isLoggingOut ? <img src={loadingSpinner} alt="Loading" className="size-5 animate-spin opacity-50 dark:invert" /> : "Log out"}
                            </button>
                        )}

                        {/* Delete Account */}
                        {confirmDelete ? (
                            <div className="flex flex-col gap-3 p-3.5 rounded-xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20">
                                <p className="text-xs text-red-600 dark:text-red-400 font-medium text-center">
                                    Permanently delete account forever?
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleDeleteAccount}
                                        disabled={isDeletingAccount}
                                        className="flex-1 flex justify-center items-center py-2 min-h-9 rounded-lg text-xs font-semibold text-white bg-red-500 hover:bg-red-600 transition cursor-pointer shadow-sm shadow-red-500/20 disabled:opacity-50"
                                    >
                                        {isDeletingAccount ? <img src={loadingSpinner} alt="Loading" className="size-4 animate-spin brightness-0 invert" /> : "Delete"}
                                    </button>
                                    <button
                                        onClick={() => setConfirmDelete(false)}
                                        disabled={isDeletingAccount}
                                        className="flex-1 py-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 transition cursor-pointer disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={() => setConfirmDelete(true)}
                                className="w-full py-2.5 rounded-lg text-sm font-medium text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition cursor-pointer"
                            >
                                Delete Account
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Settings;