interface ButtonProps {
    children?: React.ReactNode;
    onClick?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | (() => void);
    className?: string;
    disabled?: boolean;
    variant: "primary" | "secondary" | "ghost" | "outline" | "delete" | "open" | "custom";
    type?: "button" | "submit" | "reset";
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-brand hover:bg-[#5a5dda] text-white font-semibold py-2 px-4 rounded-2xl transition flex items-center justify-center",
    secondary: "bg-transparent text-black dark:text-white hover:bg-gray-200 dark:hover:bg-brand/10 border-2 border-brand font-semibold py-2 px-4 rounded-2xl transition flex items-center justify-center",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 text-brand font-semibold py-2 px-4 rounded-2xl transition flex items-center justify-center",
    outline: "bg-transparent hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-2xl transition flex items-center justify-center",
    delete: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white font-semibold py-2 px-4 rounded-2xl transition flex items-center justify-center",
    open: "bg-gray-100 dark:bg-white/8 text-gray-700 dark:text-gray-200 hover:bg-brand hover:text-white dark:hover:bg-brand font-semibold py-2 px-4 rounded-2xl transition flex items-center justify-center",
    custom: "",
}

export const Button = ({ children, onClick, className, disabled, variant = "primary", type = "button" }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${variantStyles[variant]} ${className} cursor-pointer`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};