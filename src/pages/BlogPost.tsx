
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "@/data/posts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!post) {
        return (
            <div className="container min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl font-heading font-bold mb-8">Post not found</h1>
                <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
            </div>
        );
    }

    const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <article className="min-h-screen bg-background">
            <div className="container py-24">
                <Button
                    variant="ghost"
                    className="mb-12 hover:bg-secondary/20 transition-colors"
                    onClick={() => navigate("/blog")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog
                </Button>

                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform hover:scale-105 duration-700"
                        />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-muted-foreground">
                            <span>{formattedDate}</span>
                            <span>•</span>
                            <span>{post.readingTime}</span>
                            <span>•</span>
                            <span>By {post.author}</span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-sm bg-primary/10 text-primary px-4 py-1.5 rounded-full
                    hover:bg-primary/20 transition-colors cursor-pointer"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl leading-relaxed text-muted-foreground mb-12">
                            {post.description}
                        </p>

                        <ReactMarkdown className="space-y-6">
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogPost;
