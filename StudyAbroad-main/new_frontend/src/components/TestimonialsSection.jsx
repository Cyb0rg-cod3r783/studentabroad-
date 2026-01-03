import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: "Priya Sharma",
        university: "Stanford University",
        year: "2025",
        program: "Computer Science",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        quote: "Study Abroad Final Boss transformed my dream into reality. The AI recommendations matched me perfectly with Stanford, and the step-by-step guidance made the complex application process manageable.",
        badge: "Full Scholarship Recipient"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

const TestimonialsSection = () => {
    const featured = testimonials[0];

    return (
        <div className="py-24 bg-[#4353FF] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#3E3B92] to-transparent opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Success Stories That Inspire
                    </h2>
                    <p className="text-blue-100 text-lg">
                        Real students, real achievements, real dreams fulfilled
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        {/* Image Side */}
                        <div className="relative w-full md:w-1/3">
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group">
                                <img
                                    src={featured.image}
                                    alt={featured.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-max px-4 py-2 bg-[#10B981] text-white text-sm font-bold rounded-full shadow-lg">
                                    {featured.badge}
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-2/3">
                            <Quote size={64} className="text-blue-300 md:text-blue-300/50 mb-6" />

                            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                                "{featured.quote}"
                            </p>

                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">{featured.name}</h3>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-blue-200 text-lg">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
                                        {featured.program}
                                    </span>
                                    <span className="hidden md:inline">•</span>
                                    <span>{featured.university}</span>
                                    <span className="hidden md:inline">•</span>
                                    <span>{featured.year}</span>
                                </div>
                            </div>

                            {/* Small Avatars */}
                            <div className="mt-10 flex gap-4">
                                {testimonials.slice(1).map((t) => (
                                    <div key={t.id} className="w-14 h-14 rounded-full border-2 border-white/30 overflow-hidden cursor-pointer hover:border-white transition-colors opacity-70 hover:opacity-100">
                                        <img src={t.image} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
