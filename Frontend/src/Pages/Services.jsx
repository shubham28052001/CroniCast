import React from "react";
import Navbar from "../Components/NAvbar";
import { Link } from 'react-router-dom';

const services = [
    {
        title: "Content Creation",
        description: "High-quality, engaging, and SEO-friendly content tailored to your niche. From tech blogs to thought leadership, we deliver words that convert.",
        icon: (
            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 20h9" />
                <path d="M12 4v16m0 0H3m9-16L3 20" />
            </svg>
        ),
    },
    {
        title: "SEO Optimization",
        description: "Rank higher with on-page SEO, keyword targeting, meta tags, and structured content to boost visibility and drive organic traffic.",
        icon: (
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
    },
    {
        title: "Social Media Promotion",
        description: "Expand your reach by promoting your blog across Instagram, Twitter, LinkedIn, and more with platform-specific strategies.",
        icon: (
            <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4z" />
                <path d="M8 8h8v8H8z" />
            </svg>
        ),
    },
    {
        title: "Analytics & Performance",
        description: "Track your blog’s growth with integrated analytics tools like Google Analytics and Search Console — insights made simple.",
        icon: (
            <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 6h4v12H4zM10 10h4v8h-4zM16 4h4v16h-4z" />
            </svg>
        ),
    },
    {
        title: "Custom Blog Design",
        description: "Make a visual impact with modern, responsive, and fully custom blog designs that reflect your brand and personality.",
        icon: (
            <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 7h18M3 12h18M3 17h18" />
            </svg>
        ),
    },
    {
        title: "Technical Support & Hosting",
        description: "From domain setup to CMS installation and performance optimization — we handle the technical so you can focus on content.",
        icon: (
            <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12l2-2 4 4 8-8 4 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7" />
            </svg>
        ),
    },
];

const Services = () => (
    <div className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900 text-white min-h-screen">
        <Navbar />
        <div className="py-16 px-6 max-w-7xl mx-auto">
            {/* Title Section */}
            <div className="text-center mb-20">
                <h1 className="text-6xl font-extrabold text-center mb-10 text-transparent bg-clip-text animate-gradient">
                    🚀 Our Services
                </h1>
                <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
                    Tools, strategies, and creativity to help your blog grow, convert, and shine — all under one roof.
                </p>
            </div>

            {/* Services Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {services.map((service, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-800 backdrop-blur-sm p-8 rounded-2xl border border-gray-900 hover:shadow-xl transition-all hover:-translate-y-1 duration-300 group"
                    >
                        <div className="mb-4">{service.icon}</div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition">{service.title}</h3>
                        <p className="mt-3 text-gray-400 leading-relaxed">{service.description}</p>
                    </div>
                ))}
            </div>
            {/* FAQ Section */}
            <section className="py-20 bg-gray-800 text-white mt-20 rounded-lg">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">❓ Frequently Asked Questions</h2>

                    <div className="space-y-8">
                        <div className="border border-gray-700 rounded-xl p-6 bg-gray-800 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-teal-400 mb-2">How long does it take to get my blog content?</h3>
                            <p className="text-gray-400">Typically, we deliver blog content within 3–5 business days, depending on length and research required.</p>
                        </div>

                        <div className="border border-gray-700 rounded-xl p-6 bg-gray-800 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-teal-400 mb-2">Can I request revisions after content delivery?</h3>
                            <p className="text-gray-400">Absolutely! We offer up to 2 free revisions to make sure the content aligns with your expectations.</p>
                        </div>

                        <div className="border border-gray-700 rounded-xl p-6 bg-gray-800 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-teal-400 mb-2">Do you help with blog promotion?</h3>
                            <p className="text-gray-400">Yes. We offer complete social media promotion strategies tailored for platforms like Instagram, LinkedIn, and more.</p>
                        </div>

                        <div className="border border-gray-700 rounded-xl p-6 bg-gray-800 shadow hover:shadow-lg transition">
                            <h3 className="text-xl font-semibold text-teal-400 mb-2">Can you redesign my existing blog?</h3>
                            <p className="text-gray-400">Of course! Our design team can revamp your blog into a stunning, responsive, and fast-loading platform.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <div className="mt-24 bg-gradient-to-r from-teal-600 to-cyan-500 p-10 rounded-xl text-center shadow-xl max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-black mb-3">✨ Ready to Elevate Your Blog?</h3>
                <p className="text-gray-900 mb-6">Join Cronicast Blog and unlock your full potential as a content creator.</p>
                <Link to="/create-blog">
                    <button className="bg-black hover:bg-gray-900 text-white px-8 py-3 rounded-md text-lg font-medium transition-all">
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    </div>
);

export default Services;
