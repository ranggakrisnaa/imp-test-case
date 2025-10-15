import { Input } from "../atoms/Input";

export function InputLabel({
  htmlFor,
  label,
  className = "",
  icon,
  inputKey,
  minLength,
  required = true,
  onChange,
  placeholder = "",
  type = "text",
  value = "",
}: {
  htmlFor: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  inputKey: string;
  minLength?: number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  value?: string;
}) {
  return (
    <>
      <label htmlFor={htmlFor} className="label">
        <span className="label-text text-base-content/80">{label}</span>
      </label>
      <div>
        <Input
          className={className}
          icon={icon}
          key={inputKey}
          minLength={minLength}
          required={required}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      </div>
    </>
  );
}
