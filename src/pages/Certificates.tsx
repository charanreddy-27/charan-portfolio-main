import { motion } from "framer-motion";
import { certifications } from "@/data/certificates";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BadgeCheckIcon, CalendarIcon, ExternalLinkIcon, BuildingIcon } from "lucide-react";

const AnimatedCharacter = ({ character, index }: { character: string, index: number }) => {
  return (
    <motion.span
      className="inline-block cursor-pointer"
      whileHover={{ 
        scale: 1.2, 
        color: "#ffffff", 
        textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
};

const AnimatedGradientCharacter = ({ character, index }: { character: string, index: number }) => {
  return (
    <motion.span
      className="inline-block cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-500"
      whileHover={{ 
        scale: 1.2,
        backgroundImage: "linear-gradient(to right, #22d3ee, #10b981)",
        textShadow: "0 0 12px rgba(34, 211, 238, 0.8)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
};

const Certifications = () => {
  const myText = "My";
  const certificationsText = "Certifications";
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-6 md:px-12">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4 flex flex-wrap justify-center"
          >
            <div className="mr-3">
              {myText.split('').map((char, index) => (
                <AnimatedCharacter key={index} character={char} index={index} />
              ))}
            </div>
            <div>
              {certificationsText.split('').map((char, index) => (
                <AnimatedGradientCharacter key={index} character={char} index={index} />
              ))}
            </div>
          </motion.h1>
          {/* <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A curated list of my certifications showcasing my professional growth and skills.
          </p> */}
        </motion.div>

        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group flex flex-row items-center bg-white/5 border border-white/10 rounded-md shadow-md hover:shadow-xl transition-all duration-300 p-4">
                <motion.div 
                  className="w-20 h-20 flex items-center justify-center rounded-md bg-gradient-to-r from-primary/10 to-primary/20 mr-4"
                  whileHover={{ 
                    scale: 1.05,
                    background: "linear-gradient(to right, rgba(var(--primary), 0.2), rgba(var(--primary), 0.3))"
                  }}
                >
                  <motion.div
                    whileHover={{ 
                      rotate: [0, -5, 5, -5, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <cert.icon className="w-12 h-12 text-primary/80 transition-transform duration-300 group-hover:scale-110" />
                  </motion.div>
                </motion.div>
                <div className="flex-1">
                  <CardHeader className="p-0">
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                        <BadgeCheckIcon className="w-5 h-5 text-primary" />
                        {cert.title}
                      </CardTitle>
                    </motion.div>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <BuildingIcon className="w-4 h-4" /> {cert.issuer}
                    </p>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <CalendarIcon className="w-4 h-4" /> {cert.date}
                    </p>
                  </CardHeader>
                  <CardContent className="mt-2 p-0">
                    <p className="text-sm text-gray-400">{cert.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </div>
                <CardFooter className="ml-auto">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="default" className="py-2 px-4 text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition">
                          <a href={cert.detailsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLinkIcon className="w-5 h-5" /> View Certification
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View Certification</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
