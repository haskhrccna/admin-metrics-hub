import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import FormField from "./contact/FormField";
import MessageField from "./contact/MessageField";
import FormHeader from "./contact/FormHeader";
import FormSubmitButton from "./contact/FormSubmitButton";

const ContactForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    subject: "",
    message: "",
    requestCV: false,
  });
  const [locationData, setLocationData] = useState({
    country: "",
    city: "",
    ip: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getLocationData = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        setLocationData({
          country: data.country_name,
          city: data.city,
          ip: data.ip,
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    getLocationData();
  }, []);

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          company_name: formData.companyName,
          subject: formData.subject,
          message: formData.message,
          request_cv: formData.requestCV,
          country: locationData.country,
          city: locationData.city,
          ip_address: locationData.ip
        });

      if (dbError) throw dbError;

      const { error } = await supabase.functions.invoke('send-email', {
        body: {
          name: formData.name,
          email: formData.email,
          companyName: formData.companyName,
          subject: formData.subject,
          message: formData.message,
          requestCV: formData.requestCV,
        },
      });

      if (error) throw error;

      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });

      setFormData({
        name: "",
        email: "",
        companyName: "",
        subject: "",
        message: "",
        requestCV: false,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FormHeader />
        <div className="bg-slate-800 rounded-lg p-6 shadow-lg animate-fade-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full"
            />
            
            <FormField
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full"
            />

            <FormField
              label="Company Name"
              id="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full"
            />
            
            <FormField
              label="Subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              className="w-full"
            />

            <MessageField
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
            />

            <div className="flex items-center space-x-2 mt-4 opacity-50">
              <Checkbox
                id="requestCV"
                checked={formData.requestCV}
                disabled={true}
                className="w-6 h-6 data-[state=checked]:bg-purple-600"
              />
              <label
                htmlFor="requestCV"
                className="text-lg font-medium leading-none text-white cursor-not-allowed"
              >
                Send request to receive CV copy
              </label>
            </div>

            <FormSubmitButton 
              isSubmitting={isSubmitting}
              isDisabled={!isValidEmail(formData.email)}
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;