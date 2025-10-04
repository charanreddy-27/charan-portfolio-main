import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Building2, Calendar, Users } from "lucide-react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import papers from "@/data/papers";
import { AuthorsList } from "./elements/AuthorWithOrcid";

const AnimatedCharacter = ({ character }: { character: string }) => {
  return (
    <motion.span
      className="inline-block cursor-pointer"
      whileHover={{ 
        scale: 1.2, 
        color: "#ffffff", 
        textShadow: "0 0 8px rgba(var(--primary), 1)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
};

const AnimatedGradientCharacter = ({ character }: { character: string }) => {
  return (
    <motion.span
      className="inline-block cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50"
      whileHover={{ 
        scale: 1.2,
        backgroundImage: "linear-gradient(to right, rgb(var(--primary)), rgb(var(--primary)))",
        textShadow: "0 0 12px rgba(var(--primary), 0.8)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
};

const Research = () => {
  const paper = papers[0]; // Assuming only one paper
  const researchText = "Research";
  const papersText = "Papers";

  return (
    <section className="min-h-screen py-24 px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container max-w-5xl mx-auto"
      >
        {/* Animated Heading with individual letter animations */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 flex justify-center flex-wrap"
        >
          <div className="mr-3">
            {researchText.split('').map((char, index) => (
              <AnimatedCharacter key={index} character={char} />
            ))}
          </div>
          <div>
            {papersText.split('').map((char, index) => (
              <AnimatedGradientCharacter key={index} character={char} />
            ))}
          </div>
        </motion.h2>

        {/* Paper Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card
            className={cn(
              "overflow-hidden border-secondary/20 hover:border-secondary/50 transition-all duration-300"
            )}
          >
            <motion.div 
              className="relative h-64 md:h-96 overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                transition: { type: "spring", stiffness: 300, damping: 25 }
              }}
            >
              <motion.img
                src={paper.image}
                alt={paper.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" 
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>

            <CardContent className="p-8 grid gap-6">
              <div className="flex justify-between items-start">
                <motion.span 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium border border-transparent"
                  whileHover={{ 
                    backgroundColor: "rgba(var(--primary), 0.2)",
                    borderColor: "rgba(var(--primary), 0.5)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Building2 className="w-4 h-4" />
                  {paper.publication}
                </motion.span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {paper.publishedDate}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Book className="w-5 h-5 mt-1 text-primary shrink-0" />
                  <motion.h3 
                    className="text-xl md:text-2xl font-heading font-bold"
                    initial={{ opacity: 1 }}
                    whileHover={{ 
                      scale: 1.01,
                      color: "rgba(var(--primary), 1)" 
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {paper.title}
                  </motion.h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 mt-2 text-primary shrink-0" />
                <div className="flex flex-col">
                  <div className="text-sm">
                    <span className="text-xs uppercase tracking-wider text-primary/70 mb-1 block">Contributors</span>
                    <AuthorsList authors={paper.authors} />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: "rgba(var(--secondary), 0.7)",
                      color: "rgba(var(--foreground), 1)",
                      boxShadow: "0 0 8px rgba(var(--secondary), 0.5)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="text-sm bg-secondary/50 px-3 py-1 rounded-full cursor-pointer border border-transparent hover:border-secondary/70"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="p-8 pt-0">
              <motion.div className="w-full"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="default"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  asChild
                >
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Read Paper
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </a>
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Research;
