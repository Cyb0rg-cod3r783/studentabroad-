import React, { useState, useEffect, useRef } from 'react';
import { Users, GraduationCap, Globe, Award, Loader2 } from 'lucide-react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { universityService } from '../services/api';

const CountingNumber = ({ value }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 }); // 2s duration, no bounce for smooth count

    // Parse value (e.g., "50,000+" -> number: 50000, suffix: "+")
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    const suffix = value.replace(/[0-9,]/g, '');

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericValue);
        }
    }, [isInView, numericValue, motionValue]);

    const displayValue = useTransform(springValue, (latest) => {
        // Format with commas if original had them or just locale string
        // Simple formatter
        return Math.floor(latest).toLocaleString() + suffix;
    });

    return <motion.span ref={ref}>{displayValue}</motion.span>;
};

const StatsSection = () => {
    const [stats, setStats] = useState([
        {
            icon: Users,
            value: "50,000+",
            label: "Students Placed",
            color: "bg-emerald-500/20 text-emerald-300",
            key: 'students'
        },
        {
            icon: GraduationCap,
            value: "200+",
            label: "Partner Universities",
            color: "bg-blue-500/20 text-blue-300",
            key: 'universities'
        },
        {
            icon: Globe,
            value: "45+",
            label: "Countries",
            color: "bg-purple-500/20 text-purple-300",
            key: 'countries'
        },
        {
            icon: Award,
            value: "98%",
            label: "Success Rate",
            color: "bg-orange-500/20 text-orange-300",
            key: 'success_rate'
        }
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await universityService.getStatistics();
                if (response.success && response.data) {
                    const data = response.data;
                    setStats(prev => prev.map(stat => {
                        if (stat.key === 'universities') {
                            return { ...stat, value: `${data.total_universities || 200}+` };
                        }
                        if (stat.key === 'countries') {
                            return { ...stat, value: `${data.total_countries || 45}+` };
                        }
                        return stat;
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="bg-gradient-to-r from-[#4353FF] to-[#3E3B92] py-20 relative overflow-hidden">
            {/* Subtle Overlay Pattern with parallax-like feeling */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>

            {/* Glowing orbs background */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Trusted by Thousands Worldwide
                    </h2>
                    <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Join the community of successful students who achieved their study abroad dreams through our platform.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                                backgroundColor: "rgba(255, 255, 255, 0.15)",
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center cursor-default group relative overflow-hidden"
                        >
                            {/* Hover Highlight Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <motion.div
                                className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${stat.color} shadow-lg relative z-10`}
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <stat.icon size={36} />
                            </motion.div>

                            <h3 className="text-5xl font-bold text-white mb-3 tracking-tight relative z-10">
                                {loading ? (
                                    <Loader2 className="animate-spin mx-auto opacity-50" size={36} />
                                ) : (
                                    <CountingNumber value={stat.value} />
                                )}
                            </h3>
                            <p className="text-blue-100 font-medium text-lg relative z-10">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsSection;
