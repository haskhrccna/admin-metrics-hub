import { Textarea } from "@/components/ui/textarea";

interface MessageFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const MessageField = ({ value, onChange, disabled = false }: MessageFieldProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium text-white">
        Message
      </label>
      <Textarea
        id="message"
        name="message"
        required
        value={value}
        onChange={onChange}
        className="min-h-[150px] bg-slate-700 border-slate-600 text-white"
        disabled={disabled}
      />
    </div>
  );
};

export default MessageField;