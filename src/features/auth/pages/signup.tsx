import AuthNavbar from "../components/authNavbar";
import SignupForm from "../components/signupForm";

const Signup = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden">
            <AuthNavbar />

            <main className="flex-1 flex items-center justify-center px-4 overflow-y-auto">
                <SignupForm />
            </main>
        </div>
    );
};

export default Signup;
