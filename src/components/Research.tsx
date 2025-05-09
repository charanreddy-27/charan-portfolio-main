import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Book, Calendar, Building2, Users } from "lucide-react";
import { cn } from "@/utils/tw-merge";
import { motion } from "framer-motion";
import papers from "@/data/papers";

const Research = () => {
  const paper = papers[0]; // Assuming only one paper

  return (
    <section className="min-h-screen py-24 px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container max-w-5xl mx-auto"
      >
        {/* Matching Animated Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="text-white">Research </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Papers
          </span>
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
            <div className="relative h-64 md:h-96 overflow-hidden">
              <img
                src={paper.image}
                alt={paper.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>

            <CardContent className="p-8 grid gap-6">
              <div className="flex justify-between items-start">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium">
                  <Building2 className="w-4 h-4" />
                  {paper.publication}
                </span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {paper.publishedDate}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Book className="w-5 h-5 mt-1 text-primary shrink-0" />
                  <h3 className="text-xl md:text-2xl font-heading font-bold">
                    {paper.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-primary shrink-0" />
                <span>{paper.authors.join(", ")}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    className="text-sm bg-secondary/50 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </CardContent>

            <CardFooter className="p-8 pt-0">
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
                  <ArrowRight className="w-4 h-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Research;
