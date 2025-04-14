import { useEffect } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "@/data/posts";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Blog = () => {
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center mb-12"
                >
                    <Button
                        onClick={() => navigate('/')}
                        variant="ghost"
                        className="group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        Back Home
                    </Button>
                </motion.div>

                <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl md:text-5xl font-heading font-bold mb-12"
                >
                    Blog Posts
                </motion.h1>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {blogPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="group relative bg-secondary/20 rounded-xl overflow-hidden backdrop-blur-sm hover:bg-secondary/30 transition-all duration-500"
                        >
                            <div className="relative h-48 md:h-56 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{formatDate(post.date)}</span>
                                    <span>•</span>
                                    <span>{post.readingTime}</span>
                                </div>
                                <h2 className="text-2xl font-heading font-bold tracking-tight group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground line-clamp-2">
                                    {post.description}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        By {post.author}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 text-sm bg-primary/20 text-primary-foreground rounded-full transform transition-all duration-300 hover:bg-primary/40"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <Button
                                    onClick={() => navigate(`/blog/${post.slug}`)}
                                    className="group relative bg-primary/20 hover:bg-primary text-primary-foreground transition-all duration-500 overflow-hidden w-full"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        Read More
                                        <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                    <span className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Blog;