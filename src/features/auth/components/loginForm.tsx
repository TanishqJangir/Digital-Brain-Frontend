import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import GithubIcon from "../../../assets/svgIcons/GithubIcon";
import GoogleIcon from "../../../assets/svgIcons/GoogleIcon";
import EyeIcon from "../../../assets/svgIcons/EyeIcon";
import EyeSlashIcon from "../../../assets/svgIcons/EyeSlashIcon";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setLoading(true);
        try {
            const { data } = await axios.post(`${BACKEND_URL}/api/v1/auth/signin`, { email, password });
            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (err: any) {
            const message: string = err.response?.data?.message || "Something went wrong. Please try again.";
            const lower = message.toLowerCase();
            if (lower.includes("password")) {
                setPasswordError(message);
            } else {
                setEmailError(message);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full max-w-md bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/10 rounded-2xl shadow-md p-8 sm:p-10 select-none">
            {/* Header */}
            <div className="mb-7 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Sign in to your <span className="text-brand font-medium"> Digital Brain</span></p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-brand/50"
                    />
                    {emailError && <p className="text-xs text-red-500 mt-0.5">{emailError}</p>}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <Link to="/forgot-password" className="text-xs text-brand hover:underline">Forgot password?</Link>
                    </div>
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
                    className="w-full py-2.5! rounded-xl! font-semibold text-base mt-1"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
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
                    variant="outline"
                    className="flex-1 py-2.5! rounded-xl! border-gray-200! dark:border-white/10 bg-white! dark:bg-white/5 hover:bg-gray-50! dark:hover:bg-white/10 text-sm! font-medium! text-gray-700! dark:text-gray-200 gap-3"
                    onClick={() => {
                        window.open(`${BACKEND_URL}/api/v1/auth/google`, "_self");
                    }}
                >
                    <GoogleIcon />
                    Google
                </Button>
                <Button
                    variant="outline"
                    className="flex-1 py-2.5! rounded-xl! border-gray-200! dark:border-white/10 bg-white! dark:bg-white/5 hover:bg-gray-50! dark:hover:bg-white/10 text-sm! font-medium! text-gray-700! dark:text-gray-200 gap-3"
                    onClick={() => {
                        window.open(`${BACKEND_URL}/api/v1/auth/github`, "_self");
                    }}
                >
                    <GithubIcon className="text-black!" />
                    GitHub
                </Button>
            </div>

            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-5">
                Don't have an account?{" "}
                <Link to="/signup" className="text-brand font-semibold hover:underline">Register here</Link>
            </p>
        </div>
    );
};

export default LoginForm;