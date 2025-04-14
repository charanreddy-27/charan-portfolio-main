import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { GraduationCap, Briefcase, CalendarIcon, Building, Award, BookOpen, Star, Trophy, MapPin, Timer } from "lucide-react";
import educationData from "@/data/education";
import workData from "@/data/experience";

const AboutCard = ({ title, description }) => (
    <Card className="bg-secondary/50 backdrop-blur-sm hover:bg-secondary/60 transition-all duration-300">
        <CardContent className="p-6">
            <h3 className="text-2xl font-heading font-bold mb-4 text-primary">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
);

const TimelineItem = ({ icon: Icon, title, subtitle, details, content }) => (
    <Card className="relative bg-secondary/50 backdrop-blur-sm hover:bg-secondary/60 transition-all duration-300">
        <div className="absolute left-0 w-4 h-4 bg-primary rounded-full transform -translate-x-[34px] top-6" />
        <CardHeader>
            <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
                <Icon className="w-5 h-5" />
                {title}
            </CardTitle>
            <CardDescription>
                <div className="space-y-2 mt-2">{details}</div>
            </CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
    </Card>
);

const Timeline = ({ title, icon: Icon, data, renderDetails, renderContent }) => (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-heading font-bold mb-8 flex items-center gap-2">
            <Icon className="text-primary w-8 h-8" />
            {title}
        </h2>
        <div className="relative">
            <div className="absolute left-0 w-0.5 h-full bg-primary/20" />
            <div className="space-y-8 pl-6">
                {data.map((item, index) => (
                    <TimelineItem
                        key={index}
                        icon={title === "Education" ? BookOpen : Building}
                        title={item.school || item.company}
                        subtitle={item.degree || item.position || ""} // Ensuring subtitle is provided
                        details={renderDetails(item)}
                        content={renderContent(item)}
                    />

                ))}
            </div>
        </div>
    </motion.div>
);

const About = () => {
    return (
        <section className="py-20 bg-background" id="about">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-20">
                    <h2 className="text-4xl font-heading font-bold mb-12 text-center">About Me</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <AboutCard
                            title="Who I Am"
                            description="I’m a B.Tech Computer Science student specializing in AI & ML with a 3.89 CGPA, committed to excellence in technology. Passionate about software engineering, I focus on frontend development, the MERN stack, and machine learning to build impactful solutions."
                        />
                        <AboutCard
                            title="What I Do"
                            description="I specialize in developing scalable web applications and integrating AI-driven solutions. With expertise in the MERN stack and machine learning, I create seamless user experiences while optimizing system performance and efficiency."
                        />
                    </div>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <Timeline
                        title="Education"
                        icon={GraduationCap}
                        data={educationData}
                        renderDetails={(edu) => (
                            <>
                                <div className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" />{edu.duration}</div>
                                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{edu.location}</div>
                                <div className="flex items-center gap-2"><Award className="w-4 h-4" />GPA: {edu.gpa}</div>
                            </>
                        )}
                        renderContent={(edu) => (
                            <>
                                <p className="font-medium mb-4">{edu.degree}</p>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><Star className="w-4 h-4 text-primary" />Key Courses</h4>
                                    <div className="flex flex-wrap gap-2">{edu.courses.map((course, i) => (<span key={i} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">{course}</span>))}</div>
                                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><Trophy className="w-4 h-4 text-primary" />Achievements</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">{edu.achievements.map((achievement, i) => (<li key={i}>{achievement}</li>))}</ul>
                                </div>
                            </>
                        )}
                    />
                    <Timeline
                        title="Work Experience"
                        icon={Briefcase}
                        data={workData}
                        renderDetails={(work) => (
                            <>
                                <div className="flex items-center gap-2"><CalendarIcon className="w-4 h-4" />{work.duration}</div>
                                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{work.location}</div>
                                <div className="flex items-center gap-2"><Timer className="w-4 h-4" />{work.position}</div>
                            </>
                        )}
                        renderContent={(work) => (
                            <>
                                <p className="text-muted-foreground mb-4">{work.description}</p>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><Star className="w-4 h-4 text-primary" />Key Responsibilities</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">{work.responsibilities.map((responsibility, i) => (<li key={i}>{responsibility}</li>))}</ul>
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2"><Trophy className="w-4 h-4 text-primary" />Technologies</h4>
                                <div className="flex flex-wrap gap-2">{work.tools.map((tool, i) => (<span key={i} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">{tool}</span>))}</div>
                            </>
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default About;
