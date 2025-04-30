
import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactInfo = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-4 w-full max-w-md text-center">
      <h3 className="text-2xl font-semibold">Contact Info</h3>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          navigator.clipboard.writeText("charanreddychanda@gmail.com");
          toast({ description: "Email copied!" });
        }}
        className="group relative overflow-hidden hover:scale-105 transition-transform duration-300 flex justify-center items-center gap-3 bg-primary/20 hover:bg-primary text-white w-full px-5 py-3 rounded-lg backdrop-blur-sm"
      >
        <Mail className="w-6 h-6" />
        <span className="text-base">charanreddychanda@gmail.com</span>
      </motion.button>

      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href="tel:+917842525284"
        className="group relative overflow-hidden hover:scale-105 transition-transform duration-300 flex justify-center items-center gap-3 bg-primary/20 hover:bg-primary text-white w-full px-5 py-3 rounded-lg backdrop-blur-sm"
      >
        <Phone className="w-6 h-6" />
        <span className="text-base">+917842525284</span>
      </motion.a>
    </div>
  );
};

export default ContactInfo;
