import React from 'react';
import { Code, Briefcase, Settings, Heart, BarChart, Palette, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const programs = [
    {
        title: "Computer Science & AI",
        description: "Cutting-edge programs in artificial intelligence, machine learning, and software engineering",
        icon: Code,
        color: "text-blue-600 bg-blue-100",
        buttonColor: "text-blue-600 border-blue-200 hover:bg-blue-50",
        stats: { universities: "450+", tuition: "$35,000/year", duration: "4 years" }
    },
    {
        title: "Business Administration",
        description: "MBA and business programs from top-ranked international business schools",
        icon: Briefcase,
        color: "text-purple-600 bg-purple-100",
        buttonColor: "text-purple-600 border-purple-200 hover:bg-purple-50",
        stats: { universities: "380+", tuition: "$42,000/year", duration: "2 years" }
    },
    {
        title: "Engineering",
        description: "Mechanical, electrical, civil, and aerospace engineering programs worldwide",
        icon: Settings,
        color: "text-teal-600 bg-teal-100",
        buttonColor: "text-teal-600 border-teal-200 hover:bg-teal-50",
        stats: { universities: "420+", tuition: "$38,000/year", duration: "4 years" }
    },
    {
        title: "Medicine & Healthcare",
        description: "Medical degrees, nursing, and healthcare management programs",
        icon: Heart,
        color: "text-rose-600 bg-rose-100",
        buttonColor: "text-rose-600 border-rose-200 hover:bg-rose-50",
        stats: { universities: "280+", tuition: "$55,000/year", duration: "5-6 years" }
    },
    {
        title: "Data Science",
        description: "Analytics, big data, and business intelligence programs",
        icon: BarChart,
        color: "text-amber-600 bg-amber-100",
        buttonColor: "text-amber-600 border-amber-200 hover:bg-amber-50",
        stats: { universities: "320+", tuition: "$40,000/year", duration: "2 years" }
    },
    {
        title: "Arts & Design",
        description: "Fine arts, graphic design, and creative media programs",
        icon: Palette,
        color: "text-pink-600 bg-pink-100",
        buttonColor: "text-pink-600 border-pink-200 hover:bg-pink-50",
        stats: { universities: "250+", tuition: "$32,000/year", duration: "3-4 years" }
    }
];

const FeaturedProgramsSection = () => {
    return (
        <div className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-4">
                        Featured Programs
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore popular study programs across top universities worldwide
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {programs.map((program, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${program.color} group-hover:scale-110 transition-transform`}>
                                <program.icon size={28} />
                            </div>

                            <h3 className="text-xl font-bold text-[#1A1B4B] mb-3">
                                {program.title}
                            </h3>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                {program.description}
                            </p>

                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-8 text-sm">
                                <div className="text-gray-500">Universities</div>
                                <div className="text-[#1A1B4B] font-semibold text-right">{program.stats.universities}</div>

                                <div className="text-gray-500">Avg. Tuition</div>
                                <div className="text-[#1A1B4B] font-semibold text-right">{program.stats.tuition}</div>

                                <div className="text-gray-500">Duration</div>
                                <div className="text-[#1A1B4B] font-semibold text-right">{program.stats.duration}</div>
                            </div>

                            <button className={`w-full py-3 rounded-lg border font-semibold flex items-center justify-center gap-2 transition-all ${program.buttonColor}`}>
                                View Programs
                                <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProgramsSection;
