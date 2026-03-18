import type { IconProps } from "./IconProps";

const PlusIcon = ({ className = "size-6", onClick }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={className} onClick={onClick}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
};


export default PlusIcon;
