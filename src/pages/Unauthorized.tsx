import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
        <p className="text-muted-foreground mb-6">
          You don't have permission to access this page.
        </p>
        <Button onClick={() => navigate("/")} variant="default">
          Return Home
        </Button>
      </motion.div>
    </div>
  );
};

export default Unauthorized;