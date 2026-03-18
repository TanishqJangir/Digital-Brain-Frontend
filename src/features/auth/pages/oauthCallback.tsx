import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OAuthCallback = () => {
    const navigate = useNavigate();
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        try {
            const params = new URLSearchParams(window.location.search);
            const token = params.get("token");

            if (token) {
                localStorage.setItem("token", token);
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/login?error=oauth_failed", { replace: true });
            }
        } catch (err) {
            navigate("/login?error=oauth_failed", { replace: true });
        }
    }, [navigate]);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
            <p className="text-gray-500 dark:text-gray-400">Signing you in...</p>
        </div>
    );
};

export default OAuthCallback;
