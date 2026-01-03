import React from 'react';
import { Users, GraduationCap, Globe, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
    {
        icon: Users,
        value: "50,000+",
        label: "Students Placed",
        color: "bg-emerald-500/20 text-emerald-300"
    },
    {
        icon: GraduationCap,
        value: "1,200+",
        label: "Partner Universities",
        color: "bg-blue-500/20 text-blue-300"
    },
    {
        icon: Globe,
        value: "45+",
        label: "Countries",
        color: "bg-purple-500/20 text-purple-300"
    },
    {
        icon: Award,
        value: "98%",
        label: "Success Rate",
        color: "bg-orange-500/20 text-orange-300"
    }
];

const StatsSection = () => {
    return (
        <div className="bg-gradient-to-r from-[#4353FF] to-[#3E3B92] py-20 relative overflow-hidden">
            {/* Subtle Overlay Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Trusted by Thousands Worldwide
                    </h2>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                        Join the community of successful students who achieved their study abroad dreams through our platform.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all group"
                        >
                            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon size={32} />
                            </div>
                            <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                            <p className="text-blue-100 font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
