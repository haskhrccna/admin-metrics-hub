import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const FormField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
  className = "",
}: FormFieldProps) => {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor={id} className="text-sm font-medium text-white w-32 flex-shrink-0">
        {label}
      </label>
      <Input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className={`bg-slate-700 border-slate-600 text-white flex-1 ${className}`}
        disabled={disabled}
      />
    </div>
  );
};

export default FormField;