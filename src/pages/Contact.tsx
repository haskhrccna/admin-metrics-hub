import ContactForm from "@/components/ContactForm";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Navigation />
      <div className="flex-1 container mx-auto px-4 py-20">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;