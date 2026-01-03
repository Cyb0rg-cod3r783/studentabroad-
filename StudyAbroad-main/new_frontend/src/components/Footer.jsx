import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Send, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#1A1B4B] text-white pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 2L2 9L16 16L30 9L16 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 11V21C6 21 10 24 16 24C22 24 26 21 26 21V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 16V24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="font-bold text-xl font-heading">
                                Study Abroad Final Boss
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Empowering students worldwide to achieve their dreams of international education through AI-driven guidance and personalized support.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4353FF] transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4353FF] transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4353FF] transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#4353FF] transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li><Link to="/search" className="hover:text-[#4353FF] transition-colors">Search Universities</Link></li>
                            <li><Link to="/destinations" className="hover:text-[#4353FF] transition-colors">Popular Destinations</Link></li>
                            <li><Link to="/programs" className="hover:text-[#4353FF] transition-colors">Featured Programs</Link></li>
                            <li><Link to="/reviews" className="hover:text-[#4353FF] transition-colors">Student Reviews</Link></li>
                            <li><Link to="/about" className="hover:text-[#4353FF] transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Contact Us</h3>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-[#4353FF] flex-shrink-0 mt-1" />
                                <span>123 Education Ave, Innovation Park,<br />San Francisco, CA 94105</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-[#4353FF] flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-[#4353FF] flex-shrink-0" />
                                <span>hello@studyabroad.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-bold text-lg mb-6">Newsletter</h3>
                        <p className="text-gray-400 mb-6">
                            Subscribe to get the latest university news, scholarship alerts, and study tips.
                        </p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4353FF] focus:border-transparent"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#4353FF] rounded-md flex items-center justify-center hover:bg-[#3E3B92] transition-colors">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© 2024 Study Abroad Final Boss. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
