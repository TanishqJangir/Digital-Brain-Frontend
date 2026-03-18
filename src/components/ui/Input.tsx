interface InputProps {
  placeholder?: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  required?: boolean;
  maxLength?: number;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const defaultStyle = "w-full px-4 py-2 text-black border border-gray-500 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand transition";

export function Input({ placeholder, type = "text", value, onChange, className, required, maxLength, onBlur, disabled }: InputProps) {
  return (
    <input
      type={type}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      required={required}
      disabled={disabled}
      className={`${defaultStyle} ${className}`}
    />
  );
}
