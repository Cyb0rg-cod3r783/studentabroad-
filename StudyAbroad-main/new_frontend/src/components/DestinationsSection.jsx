import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, GraduationCap, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const destinations = [
    {
        country: "United States",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // NYC/USA Vibe
        description: "Home to world-renowned institutions and cutting-edge research facilities",
        universities: "500+",
        students: "15,000+"
    },
    {
        country: "United Kingdom",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // London/UK Vibe
        description: "Rich academic heritage with prestigious universities and diverse programs",
        universities: "300+",
        students: "12,000+"
    },
    {
        country: "Canada",
        image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Toronto/Canada Vibe
        description: "Welcoming environment with excellent education and immigration opportunities",
        universities: "250+",
        students: "10,000+"
    }
];

const DestinationsSection = () => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1A1B4B] mb-2">
                            Popular Study Destinations
                        </h2>
                        <p className="text-gray-600">
                            Explore top countries for international education
                        </p>
                    </div>

                    <div className="flex gap-2 mt-4 md:mt-0">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#4353FF] hover:text-white hover:border-[#4353FF] transition-all bg-white"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-[#4353FF] hover:text-white hover:border-[#4353FF] transition-all bg-white"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Cards container */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {destinations.map((dest, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="min-w-[350px] md:min-w-[400px] flex-none bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow snap-center"
                        >
                            <div className="h-64 relative overflow-hidden group">
                                <img
                                    src={dest.image}
                                    alt={dest.country}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                                    {dest.country}
                                </h3>
                            </div>

                            <div className="p-6">
                                <p className="text-gray-600 mb-6 h-12 line-clamp-2">
                                    {dest.description}
                                </p>

                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-100">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <GraduationCap size={16} className="text-[#4353FF]" />
                                        <span>{dest.universities} Universities</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Users size={16} className="text-[#10B981]" />
                                        <span>{dest.students} Students</span>
                                    </div>
                                </div>

                                <button className="w-full py-3 rounded-lg border border-[#1A1B4B] text-[#1A1B4B] font-semibold hover:bg-[#1A1B4B] hover:text-white transition-all flex items-center justify-center gap-2 group">
                                    Explore Universities
                                    <ArrowRight size={18} className="transform transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-4">
                    <div className="w-8 h-2 bg-[#1A1B4B] rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>

            </div>
        </div>
    );
};

export default DestinationsSection;
