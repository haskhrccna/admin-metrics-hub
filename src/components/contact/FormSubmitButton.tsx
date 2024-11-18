import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  isDisabled: boolean;
}

const FormSubmitButton = ({ isSubmitting, isDisabled }: FormSubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full"
      disabled={isDisabled || isSubmitting}
    >
      <Mail className="mr-2 h-4 w-4" />
      {isSubmitting ? "Sending..." : "Send Message"}
    </Button>
  );
};

export default FormSubmitButton;