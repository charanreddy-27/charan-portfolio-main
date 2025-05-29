import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/utils/use-toast";
import { Loader2, Send, Mail, User, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.append("access_key", "537a1a97-ff49-440c-9f2c-5b148854c238");

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
        setFormState({ name: "", email: "", message: "" });
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

  const titleChars = "Get in Touch".split("");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="space-y-5 flex flex-col items-center w-full px-4 max-w-sm"
    >
      <motion.div variants={itemVariants} className="w-full text-center">
        <h2 className="text-3xl font-bold relative inline-block">
          <div className="overflow-hidden py-1">
            <div className="flex justify-center">
              {titleChars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      delay: index * 0.04,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }}
                  viewport={{ once: true }}
                  className={`${char === " " ? "mr-2" : ""} relative inline-block cursor-default`}
                  whileHover={{ 
                    y: -5, 
                    scale: 1.2, 
                    color: "#F76D57",
                    transition: { duration: 0.2 }
                  }}
                >
                  {char}
                  {char !== ' ' && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.span>
              ))}
            </div>
          </div>
          <motion.div
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ width: 0, left: "50%" }}
            whileInView={{ width: "100%", left: "0%" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          />
        </h2>
        <motion.p 
          variants={itemVariants}
          className="text-xs text-muted-foreground mt-1"
        >
          Have a question or want to work together?
        </motion.p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <div className="relative flex items-center">
            <motion.div 
              className="absolute left-4 z-10"
              animate={{ 
                scale: focusedField === 'name' ? 1.2 : 1,
                color: focusedField === 'name' ? "#F76D57" : "rgba(255,255,255,0.5)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className={`flex items-center justify-center p-1.5 rounded-full ${focusedField === 'name' ? 'bg-primary/20' : 'bg-white/5'}`}>
                <User className="w-4 h-4" />
              </div>
            </motion.div>
            
            <motion.span
              className="absolute -top-2 left-12 text-xs opacity-0 pointer-events-none"
              animate={{
                opacity: focusedField === 'name' ? 1 : 0,
                y: focusedField === 'name' ? 0 : 5
              }}
              transition={{ duration: 0.2 }}
            >
              Your Name
            </motion.span>
            
            <Input
              name="name"
              placeholder="Your Name"
              required
              value={formState.name}
              onChange={handleChange}
              onFocus={() => handleFocus('name')}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className="w-full bg-secondary/20 rounded-lg pl-14 py-5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all backdrop-blur-sm shadow-lg"
            />
          </div>
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
            initial={{ width: 0 }}
            animate={{ 
              width: focusedField === 'name' || formState.name ? "100%" : "0%"
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-lg border border-primary/50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: focusedField === 'name' ? 0.5 : 0,
              scale: focusedField === 'name' ? 1.02 : 1
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <div className="relative flex items-center">
            <motion.div 
              className="absolute left-4 z-10"
              animate={{ 
                scale: focusedField === 'email' ? 1.2 : 1,
                color: focusedField === 'email' ? "#F76D57" : "rgba(255,255,255,0.5)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className={`flex items-center justify-center p-1.5 rounded-full ${focusedField === 'email' ? 'bg-primary/20' : 'bg-white/5'}`}>
                <Mail className="w-4 h-4" />
              </div>
            </motion.div>
            
            <motion.span
              className="absolute -top-2 left-12 text-xs opacity-0 pointer-events-none"
              animate={{
                opacity: focusedField === 'email' ? 1 : 0,
                y: focusedField === 'email' ? 0 : 5
              }}
              transition={{ duration: 0.2 }}
            >
              Your Email
            </motion.span>
            
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              required
              value={formState.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className="w-full bg-secondary/20 rounded-lg pl-14 py-5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all backdrop-blur-sm shadow-lg"
            />
          </div>
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
            initial={{ width: 0 }}
            animate={{ 
              width: focusedField === 'email' || formState.email ? "100%" : "0%"
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-lg border border-primary/50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: focusedField === 'email' ? 0.5 : 0,
              scale: focusedField === 'email' ? 1.02 : 1
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative"
        >
          <div className="relative flex">
            <motion.div 
              className="absolute left-4 top-3 z-10"
              animate={{ 
                scale: focusedField === 'message' ? 1.2 : 1,
                color: focusedField === 'message' ? "#F76D57" : "rgba(255,255,255,0.5)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className={`flex items-center justify-center p-1.5 rounded-full ${focusedField === 'message' ? 'bg-primary/20' : 'bg-white/5'}`}>
                <MessageSquare className="w-4 h-4" />
              </div>
            </motion.div>
            
            <motion.span
              className="absolute -top-2 left-12 text-xs opacity-0 pointer-events-none"
              animate={{
                opacity: focusedField === 'message' ? 1 : 0,
                y: focusedField === 'message' ? 0 : 5
              }}
              transition={{ duration: 0.2 }}
            >
              Your Message
            </motion.span>
            
            <Textarea
              name="message"
              placeholder="Your Message"
              required
              value={formState.message}
              onChange={handleChange}
              onFocus={() => handleFocus('message')}
              onBlur={handleBlur}
              disabled={isSubmitting}
              className="w-full min-h-[100px] bg-secondary/20 rounded-lg pl-14 py-3 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all backdrop-blur-sm shadow-lg"
            />
          </div>
          
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
            initial={{ width: 0 }}
            animate={{ 
              width: focusedField === 'message' || formState.message ? "100%" : "0%"
            }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-lg border border-primary/50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: focusedField === 'message' ? 0.5 : 0,
              scale: focusedField === 'message' ? 1.02 : 1
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative overflow-hidden py-5 transition-all duration-300 bg-primary/20 hover:bg-primary backdrop-blur-sm border border-white/10 rounded-lg shadow-lg"
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 opacity-0 group-hover:opacity-100"
              animate={{ 
                x: ["-100%", "100%"],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "linear",
                repeatDelay: 0.5
              }}
            />
            
            {isSubmitting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <motion.div 
                className="flex items-center justify-center gap-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Send className="w-4 h-4 mr-1" /> 
                <span className="text-sm font-medium">Send Message</span>
              </motion.div>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
