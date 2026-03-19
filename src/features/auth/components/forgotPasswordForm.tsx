// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Button } from "../../../components/ui/Button";
// import { Input } from "../../../components/ui/Input";
// import EyeIcon from "../../../assets/svgIcons/EyeIcon";
// import EyeSlashIcon from "../../../assets/svgIcons/EyeSlashIcon";
// import toast from "react-hot-toast";

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// const ForgotPasswordForm = () => {
//     const navigate = useNavigate();
//     const [step, setStep] = useState<1 | 2 | 3>(1);
    
//     const [email, setEmail] = useState("");
//     const [otp, setOtp] = useState("");
//     const [newPassword, setNewPassword] = useState("");
    
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     const handleSendOtp = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);
//         try {
//             await axios.post(`${BACKEND_URL}/api/v1/auth/forgot-password/generate`, { email });
//             toast.success("OTP sent to your email!");
//             setStep(2);
//         } catch (err: any) {
//             setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleVerifyOtp = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
        
//         if (otp.length !== 6) {
//             setError("OTP must be exactly 6 digits.");
//             return;
//         }

//         setLoading(true);
//         try {
//             await axios.post(`${BACKEND_URL}/api/v1/auth/forgot-password/verify`, { email, otp });
//             toast.success("OTP verified!");
//             setStep(3);
//         } catch (err: any) {
//             setError(err.response?.data?.message || "Invalid OTP. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleResetPassword = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");

//         if (newPassword.length < 6) {
//             setError("Password must be at least 6 characters.");
//             return;
//         }

//         setLoading(true);
//         try {
//             await axios.post(`${BACKEND_URL}/api/v1/auth/forgot-password/reset`, { email, otp, newPassword });
//             toast.success("Password reset successfully! Please login.");
//             navigate("/login");
//         } catch (err: any) {
//             setError(err.response?.data?.message || "Failed to reset password. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="w-full max-w-md bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/10 rounded-2xl shadow-md p-8 sm:p-10 select-none">
            
//             <div className="mb-7 text-center">
//                 <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//                     {step === 1 && "Reset Password"}
//                     {step === 2 && "Enter OTP"}
//                     {step === 3 && "New Password"}
//                 </h2>
//                 <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                     {step === 1 && "Enter your email to receive a password reset OTP."}
//                     {step === 2 && `Enter the 6-digit OTP sent to ${email}`}
//                     {step === 3 && "Please enter your new password."}
//                 </p>
//             </div>

//             {step === 1 && (
//                 <form className="flex flex-col gap-4" onSubmit={handleSendOtp}>
//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
//                         <Input
//                             type="email"
//                             placeholder="you@example.com"
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand/50"
//                         />
//                         {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
//                     </div>

//                     <Button
//                         type="submit"
//                         variant="primary"
//                         className="w-full py-2.5! rounded-xl! font-semibold text-base mt-1"
//                         disabled={loading || !email}
//                     >
//                         {loading ? "Sending OTP..." : "Send OTP"}
//                     </Button>
//                 </form>
//             )}

//             {step === 2 && (
//                 <form className="flex flex-col gap-4" onSubmit={handleVerifyOtp}>
//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300">6-Digit OTP</label>
//                         <Input
//                             type="text"
//                             placeholder="123456"
//                             maxLength={6}
//                             required
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} // Only allow numbers
//                             className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand/50 tracking-widest text-center text-lg"
//                         />
//                         {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
//                     </div>

//                     <div className="flex flex-col gap-2 mt-1">
//                         <Button
//                             type="submit"
//                             variant="primary"
//                             className="w-full py-2.5! rounded-xl! font-semibold text-base"
//                             disabled={loading || otp.length !== 6}
//                         >
//                             {loading ? "Verifying..." : "Verify OTP"}
//                         </Button>
//                         <button 
//                             type="button" 
//                             onClick={() => { setStep(1); setOtp(""); setError(""); }}
//                             className="text-sm text-gray-500 hover:text-brand"
//                         >
//                             Change email address
//                         </button>
//                     </div>
//                 </form>
//             )}

//             {step === 3 && (
//                 <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
//                     <div className="flex flex-col gap-1">
//                         <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
//                         <div className="relative">
//                             <Input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="••••••••"
//                                 required
//                                 value={newPassword}
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                                 className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand/50 pr-10!"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(p => !p)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
//                             >
//                                 {showPassword ? <EyeSlashIcon className="size-4" /> : <EyeIcon className="size-4" />}
//                             </button>
//                         </div>
//                         {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
//                     </div>

//                     <Button
//                         type="submit"
//                         variant="primary"
//                         className="w-full py-2.5! rounded-xl! font-semibold text-base mt-1"
//                         disabled={loading || newPassword.length < 6}
//                     >
//                         {loading ? "Resetting..." : "Reset Password"}
//                     </Button>
//                 </form>
//             )}

//             <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-6">
//                 Back to{" "}
//                 <Link to="/login" className="text-brand font-semibold hover:underline">Log in</Link>
//             </p>
//         </div>
//     );
// };

// export default ForgotPasswordForm;
