import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AuthorProps {
  name: string;
  orcidId?: string;
}

export const AuthorWithOrcid = ({ name, orcidId }: AuthorProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span 
      className="inline-flex items-center gap-1"
      whileHover={{ 
        y: -3,
        scale: 1.05,
        color: "rgba(var(--primary), 1)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 20 
      }}
    >
      <motion.span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {name}
      </motion.span>
      {orcidId && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.span
                className="inline-flex cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary fill-current"
                  initial={{ rotate: 0 }}
                  animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm0 242.3c-63.1 0-114.3-51.2-114.3-114.3S64.9 13.7 128 13.7 242.3 64.9 242.3 128 191.1 242.3 128 242.3z" />
                  <path d="M86.3 186.2H70.9V79.1h15.4v107.1zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 111.2 178 93 148 93h-23.7v79.4zM79.1 60.8c-5.7 0-10.2-4.6-10.2-10.2 0-5.7 4.6-10.2 10.2-10.2 5.7 0 10.2 4.6 10.2 10.2 0 5.7-4.5 10.2-10.2 10.2z" />
                </motion.svg>
              </motion.span>
            </TooltipTrigger>
            <TooltipContent>
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-sm font-mono"
              >
                ORCID: {orcidId}
              </motion.p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </motion.span>
  );
};

export const AuthorsList = ({ authors }: { authors: AuthorProps[] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {authors.map((author, index) => (
        <motion.span 
          key={author.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center"
        >
          <AuthorWithOrcid name={author.name} orcidId={author.orcidId} />
          {index < authors.length - 1 && <span className="mx-1">,</span>}
        </motion.span>
      ))}
    </div>
  );
}; 