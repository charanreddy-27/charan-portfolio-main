
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Send } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "563e657c-2024-43e0-aef1-585384939075");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-6 flex flex-col items-center w-full px-6"
    >
      <h2 className="text-2xl font-bold text-center">Get in Touch</h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Input
            name="name"
            placeholder="Your Name"
            required
            disabled={isSubmitting}
            className="bg-secondary/20 rounded-lg px-4 py-3 border-0 focus:border-primary focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            disabled={isSubmitting}
            className="bg-secondary/20 rounded-lg px-4 py-3 border-0 focus:border-primary focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Textarea
            name="message"
            placeholder="Your Message"
            required
            disabled={isSubmitting}
            className="min-h-[100px] bg-secondary/20 rounded-lg px-4 py-3 border-0 focus:border-primary focus:ring-2 focus:ring-primary transition-all backdrop-blur-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative overflow-hidden hover:scale-105 transition-transform duration-300 bg-primary/20 hover:bg-primary backdrop-blur-sm"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" /> Send Message
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
