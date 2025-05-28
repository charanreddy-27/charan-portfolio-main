import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { blogPosts } from "@/data/posts";

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
      className="inline-block cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-500"
      whileHover={{ 
        scale: 1.2,
        backgroundImage: "linear-gradient(to right, #818cf8, #d946ef)",
        textShadow: "0 0 12px rgba(129, 140, 248, 0.8)"
      }}
      transition={{ type: "spring", stiffness: 500, damping: 10 }}
    >
      {character === " " ? "\u00A0" : character}
    </motion.span>
  );
};

const BlogSection = () => {
    const navigate = useNavigate();
    const featuredPost = blogPosts[0];
    const gridPosts = blogPosts.slice(1, 5);
    const latestText = "Latest";
    const blogPostsText = "Blog Posts";

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="py-20 bg-background">
            <div className="container px-4 mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl font-heading font-bold mb-12 flex flex-wrap"
                >
                    <div className="mr-3">
                        {latestText.split('').map((char, index) => (
                            <AnimatedCharacter key={index} character={char} index={index} />
                        ))}
                    </div>
                    <div>
                        {blogPostsText.split('').map((char, index) => (
                            <AnimatedGradientCharacter key={index} character={char} index={index} />
                        ))}
                    </div>
                </motion.h2>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col lg:flex-row gap-8 mb-12"
                >
                    {/* Featured Post */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:w-2/5" // Reduced from 1/2 to 2/5
                        onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                    >
                        <div className="group relative h-full overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                            <div className="aspect-[16/14] overflow-hidden"> {/* Adjusted aspect ratio */}
                                <img
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/95 via-background/80 to-transparent">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span>{formatDate(featuredPost.date)}</span>
                                        <span>•</span>
                                        <span>{featuredPost.readingTime}</span>
                                    </div>
                                    <h3 className="text-2xl font-heading font-bold tracking-tight text-white">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-muted-foreground line-clamp-2">
                                        {featuredPost.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {featuredPost.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Grid Posts */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6" // Increased from 1/2 to 3/5
                    >
                        {gridPosts.map((post) => (
                            <div
                                key={post.id}
                                className="group relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-300 hover:scale-[1.02] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                                onClick={() => navigate(`/blog/${post.slug}`)}
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{formatDate(post.date)}</span>
                                        <span>•</span>
                                        <span>{post.readingTime}</span>
                                    </div>
                                    <h3 className="text-lg font-heading font-bold tracking-tight line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center"
                >
                    <Button
                        size="lg"
                        onClick={() => navigate("/blog")}
                        className="group"
                    >
                        View All Posts
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogSection;