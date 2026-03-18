import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import GoogleIcon from "../../../assets/svgIcons/GoogleIcon";
import GithubIcon from "../../../assets/svgIcons/GithubIcon";
import EyeIcon from "../../../assets/svgIcons/EyeIcon";
import EyeSlashIcon from "../../../assets/svgIcons/EyeSlashIcon";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setNameError("");
        setPasswordError("");
        if (!isOtpVerified) {
            toast.error("Please verify your email address first");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, { name, email, password });
            
            toast.success(data.message);
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err: any) {
            const message: string = err.response?.data?.message || "Something went wrong. Please try again.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateOtp = async () => {
        setEmailError("");
        if (!email) {
            setEmailError("Please enter your email first");
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/v1/auth/generate-otp`, { email });
            toast.success(data.message || "OTP sent to your email.");
            setOtpSent(true);
        } catch (err: any) {
            setEmailError(err.response?.data?.message || "Failed to send OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setEmailError("");
        if (!otp) {
            setEmailError("Please enter the OTP");
            return;
        }
        setLoading(true);
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/v1/auth/verify-otp`, { email, otp });
            toast.success(data.message || "OTP verified!");
            setIsOtpVerified(true);
        } catch (err: any) {
            setEmailError(err.response?.data?.message || "Invalid OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/10 rounded-2xl shadow-md p-8 sm:p-10 select-none">
            {/* Header */}
            <div className="mb-7 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Build your <span className="text-brand font-medium">Digital Brain</span> and never lose a link again.
                </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <Input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand/50"
                    />
                    {nameError && <p className="text-xs text-red-500 mt-0.5">{nameError}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <div className="flex flex-col gap-2">
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            required
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                                if (otpSent) {
                                    setOtpSent(false);
                                    setOtp("");
                                }
                                if (isOtpVerified) {
                                    setIsOtpVerified(false);
                                }
                            }
                            }
                            disabled={isOtpVerified}
                            className={`bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand/50 ${isOtpVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
                        />
                        {!otpSent ? (
                            <Button
                                type="button"
                                variant="outline"
                                className="w-[40%]"
                                onClick={handleGenerateOtp}
                                disabled={loading || isOtpVerified || !email}
                            >
                                {loading ? "Sending..." : "Generate OTP"}
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    disabled={isOtpVerified}
                                    className={`dark:text-white dark:placeholder-gray-400 py-0! ${isOtpVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
                                />
                                <Button
                                    type="button"
                                    variant={isOtpVerified ? "ghost" : "outline"}
                                    className="w-[50%] py-2!"
                                    onClick={handleVerifyOtp}
                                    disabled={loading || isOtpVerified}
                                >
                                    {isOtpVerified ? <span className="text-green-500 font-semibold">Verified ✓</span> : loading ? "Verifying..." : "Verify OTP"}
                                </Button>
                            </div>
                        )}
                        {emailError && <p className="text-xs text-red-500 mt-0.5">{emailError}</p>}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand/50 pr-10!"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(p => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                        >
                            {showPassword ? <EyeSlashIcon className="size-4" /> : <EyeIcon className="size-4" />}
                        </button>
                    </div>
                    {passwordError && <p className="text-xs text-red-500 mt-0.5">{passwordError}</p>}
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className={`w-full py-2.5! rounded-xl! font-semibold text-base mt-1 ${!isOtpVerified ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading || !isOtpVerified}
                >
                    {loading ? "Creating account..." : "Create Account"}
                </Button>
                {!isOtpVerified && (
                    <p className="text-center text-xs text-brand/80 dark:text-brand/70 mt-1">
                        Please verify your email to create an account
                    </p>
                )}
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">or continue with</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            </div>

            {/* Social buttons */}
            <div className="flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 py-2.5! rounded-xl! border-gray-200! dark:border-white/10 bg-white! dark:bg-white/5 hover:bg-gray-50! dark:hover:bg-white/10 text-sm! font-medium! text-gray-700! dark:text-gray-200 gap-3"
                    onClick={() => { window.open(`${BACKEND_URL}/api/v1/auth/google`, "_self"); }}
                >
                    <GoogleIcon />
                    Google
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 py-2.5! rounded-xl! border-gray-200! dark:border-white/10 bg-white! dark:bg-white/5 hover:bg-gray-50! dark:hover:bg-white/10 text-sm! font-medium! text-gray-700! dark:text-gray-200 gap-3"
                    onClick={() => { window.open(`${BACKEND_URL}/api/v1/auth/github`, "_self"); }}
                >
                    <GithubIcon className="size-5 text-black!" />
                    GitHub
                </Button>
            </div>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-5">
                Already have an account?{" "}
                <Link to="/login" className="text-brand font-semibold hover:underline">Sign In</Link>
            </p>
        </div>
    );
};

export default SignupForm;

