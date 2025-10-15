export function Input({
  type = "text",
  placeholder = "",
  required = false,
  minLength,
  className = "",
  icon,
  value,
  onChange,
}: {
  type?: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  className?: string;
  icon?: React.ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className={`input w-full validator ${className}`}>
      {icon && (
        <span className="opacity-50 h-[1em] flex items-center">{icon}</span>
      )}
      <input
        type={type}
        className="w-full"
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
