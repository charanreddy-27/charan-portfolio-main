import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "../utils/cn";
import { useToast } from "@/components/ui/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation failed",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200 outline-none";
  const labelClasses = "block text-sm font-medium mb-2 text-foreground";
  const errorClasses = "text-red-500 text-sm mt-1";

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 },
    loading: { 
      scale: 1,
      backgroundColor: "var(--primary)",
      transition: {
        backgroundColor: { repeat: Infinity, repeatType: "reverse", duration: 0.8 }
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.form 
        onSubmit={handleSubmit}
        className="bg-background/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-border/50"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="name" className={labelClasses}>
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={cn(
              inputClasses,
              errors.name ? "border-red-500" : "",
              focusedField === 'name' ? "border-primary ring-1 ring-primary" : ""
            )}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p id="name-error" className={errorClasses} role="alert">
              {errors.name}
            </p>
          )}
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={cn(
              inputClasses,
              errors.email ? "border-red-500" : "",
              focusedField === 'email' ? "border-primary ring-1 ring-primary" : ""
            )}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p id="email-error" className={errorClasses} role="alert">
              {errors.email}
            </p>
          )}
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            className={cn(
              inputClasses,
              focusedField === 'subject' ? "border-primary ring-1 ring-primary" : ""
            )}
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="message" className={labelClasses}>
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            rows={5}
            className={cn(
              inputClasses,
              "resize-y min-h-[120px]",
              errors.message ? "border-red-500" : "",
              focusedField === 'message' ? "border-primary ring-1 ring-primary" : ""
            )}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p id="message-error" className={errorClasses} role="alert">
              {errors.message}
            </p>
          )}
        </motion.div>

        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-medium py-3 px-6 rounded-md transition-all duration-200 relative overflow-hidden"
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            animate={isSubmitting ? "loading" : "idle"}
            disabled={isSubmitting}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </span>
          </motion.button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default ContactForm; 