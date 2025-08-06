import React from "react";
import Navbar from "../Components/NAvbar"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
const handleComingSoonClick = () => {
    toast.info("🛠️ We're working on this feature. Stay tuned!");
};
const About = () => {
    return (
        <div className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900 min-h-screen text-gray-300">
            <Navbar />
            <Helmet>
                <title>CroniCast</title>
                <meta name="description" content="Learn more about our AI-powered blog platform that lets you write smarter, faster and better." />
                <meta name="keywords" content="blog, AI blog, write with AI, blog app, React blog" />
                <meta name="author" content="Shubham Sanodiya" />
            </Helmet>
            <div className="max-w-4xl mx-auto py-16 px-6  ">
                <h1 className="text-6xl font-extrabold text-center mb-10 text-transparent bg-clip-text animate-gradient">
                    🌍 About Cronicast
                </h1>
                {/* Hero Message */}
                <p className="text-xl text-center text-gray-400 max-w-3xl mx-auto mb-16">
                    CroniCast is more than just a blog app — it's your digital stage to share stories, spark ideas, and inspire the world.
                </p>

                {/* Features */}
                <div className="bg-gray-800 rounded-2xl shadow-lg p-8 mb-12 border border-gray-700">
                    <h2 className="text-3xl font-semibold mb-6 text-teal-400 text-center">✨ Key Features</h2>
                    <ul className="space-y-5 text-gray-300 text-lg list-disc list-inside">
                        <li>📝 Create and publish your own blog posts</li>
                        <li>📚 Read diverse articles from people around the world</li>
                        <li>💬 Comment and connect with a like-minded community</li>
                        <li>📱 Fully responsive and easy-to-use design</li>
                        <li>🌍 Discover voices and stories from around the globe</li>
                        <li>💬 Engage through likes, comments, and shares</li>
                    </ul>
                </div>

                {/* Mission */}
                <div className="mb-12 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold text-teal-400 text-center mb-5">🌱Our Mission</h2>
                    <p className="text-lg text-gray-400 text-center leading-relaxed">
                        To empower every individual to share their voice and be heard. We believe that everyone has a story worth telling.
                    </p>
                </div>

                {/* Why Choose Us */}
                <div className="bg-gray-800 rounded-2xl shadow-md p-8 mb-12 border border-gray-700 max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold text-teal-400 text-center mb-6">💎 Why Choose CroniCast?</h2>
                    <ul className="space-y-4 text-gray-300 text-lg list-disc list-inside">
                        <li>🚀 Fast and intuitive user experience</li>
                        <li>🔒 Your data and privacy are safe with us</li>
                        <li>🎨 Clean and distraction-free reading & writing</li>
                        <li>🌱 Constantly evolving with user feedback</li>
                    </ul>
                </div>

                {/* Vision for the Future */}
                <div className="mb-16 text-center" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-teal-400 mb-4">🔮 Our Vision</h2>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        We aim to build a platform where AI meets creativity — where ideas are not just written but evolve through collaborative thought, emotion tracking, and auto-generated prompts powered by AI.
                    </p>
                </div>

                {/* Technologies Used */}
                <div className="mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">🧩 Tech Stack</h2>
                    <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-300">
                        <span className="bg-gray-700 px-4 py-2 rounded-lg">React</span>
                        <span className="bg-gray-700 px-4 py-2 rounded-lg">Node.js</span>
                        <span className="bg-gray-700 px-4 py-2 rounded-lg">Express.js</span>
                        <span className="bg-gray-700 px-4 py-2 rounded-lg">MongoDB</span>
                        <span className="bg-gray-700 px-4 py-2 rounded-lg">Tailwind CSS</span>
                        <span className="bg-gray-700 px-4 py-2 rounded-lg">JWT</span>
                    </div>
                </div>
                {/* Testimonials */}
                <div className="mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-teal-400 text-center mb-6">📢 What Our Users Say</h2>
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-gray-400 text-center italic">
                        "CroniCast gave me a voice I never knew I had. I published my first blog and it changed my life!"
                        <br />
                        — A happy user from Mumbai 💬
                    </div>
                </div>
                {/* Upcoming AI Feature */}
                {/* Upcoming AI Feature */}
                <div className="mb-16 text-center" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-teal-400 mb-4"
                        onClick={handleComingSoonClick}
                    >

                        🤖 Write with AI.....
                        <span className="bg-yellow-600 text-xs px-2 py-1 rounded-full ml-2 cursor-pointer">Coming Soon</span>
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        Imagine starting your blog with a single thought and AI turning it into a fully written draft! <br />
                        Our upcoming feature <span className="font-semibold text-teal-300">"Write with AI"</span> will help you:
                    </p>
                    <ul className="mt-6 list-disc list-inside text-gray-300 text-lg space-y-2 max-w-2xl mx-auto text-left">
                        <li>💡 Generate blog ideas based on your interests</li>
                        <li>✍️ Auto-complete paragraphs using your tone</li>
                        <li>🧠 Suggest better titles, intros, or conclusions</li>
                        <li>🌟 Summarize or expand existing drafts instantly</li>
                    </ul>
                    <p className="mt-6 text-sm text-gray-500 italic">Powered by advanced language models like Gemini AI / GPT.</p>
                    <button
                        onClick={handleComingSoonClick}
                        className="mt-6 bg-teal-600 px-4 py-2 text-white rounded-md hover:bg-teal-500"
                    >
                        Learn More
                    </button>
                </div>
                {/*Meet the Creator*/}
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-semibold text-teal-400 mb-5">👨‍💻 Meet the Creator</h2>
                    <p className="text-lg text-gray-400 leading-relaxed">
                        Built with <span className="text-red-500">❤️</span> by <span className="font-medium text-teal-300">Shubham Sanodiya</span> — a passionate web developer who believes in the power of words and technology.
                    </p>
                    <div className="mt-6 flex justify-center space-x-6 text-gray-400">
                        <a
                            href="https://instagram.com/_shubham_sanodiya"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-pink-500 transition"
                            aria-label="Instagram"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm0 1.5h8.5a4.25 4.25 0 014.25 4.25v8.5a4.25 4.25 0 01-4.25 4.25h-8.5a4.25 4.25 0 01-4.25-4.25v-8.5a4.25 4.25 0 014.25-4.25zm4.25 3a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5zm0 1.5a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zm5.4-.88a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" />
                            </svg>
                        </a>
                        <a
                            href="https://github.com/shubham28052001"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-black transition"
                            aria-label="GitHub"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.96.58.11.79-.25.79-.56 0-.27-.01-1.18-.01-2.15-3.2.7-3.87-1.55-3.87-1.55-.52-1.32-1.28-1.67-1.28-1.67-1.04-.72.08-.71.08-.71 1.15.08 1.75 1.19 1.75 1.19 1.02 1.75 2.67 1.25 3.32.95.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.95 10.95 0 015.74 0C17.9 4.9 18.86 5.21 18.86 5.21c.62 1.59.23 2.76.11 3.05.74.81 1.18 1.85 1.18 3.11 0 4.45-2.69 5.43-5.24 5.71.41.35.78 1.04.78 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.21.68.8.56A10.52 10.52 0 0023.5 12C23.5 5.74 18.27.5 12 .5z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/shubham-sanodiya-5107a52a0/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition"
                            aria-label="LinkedIn"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0H12v2.24c.58-.94 2.05-2.24 4.16-2.24 4.45 0 5.34 2.92 5.34 6.72V24h-5v-7.92c0-1.88-.03-4.28-2.6-4.28-2.6 0-3 2.03-3 4.14V24h-5V8z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="bg-teal-600 text-white text-center mt-2 py-10 rounded-xl mb-20" data-aos="zoom-in">
                    <h2 className="text-3xl font-bold mb-3">🚀 Ready to Join CroniCast?</h2>
                    <p className="text-lg mb-5">Start your journey of storytelling now.</p>
                    <Link to="/create-blog" className="bg-white text-teal-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                        Create Your Blog
                    </Link>
                </div>
                <div className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} CroniCast by Shubham Sanodiya. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default About;
