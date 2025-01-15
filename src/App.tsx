import React, { useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, MapPin, Mail, Phone } from 'lucide-react';
import Navigation from './components/Navigation';
import Terminal from './components/Terminal';
import SocialLinks from './components/SocialLinks';
import ProjectShowcase from './components/ProjectShowcase';
import AIAgent from './components/AIAgent';
import HelloSection from './components/HelloSection';
import InteractiveHelloSection from './components/HelloSection';

function App() {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const text = "Front-end developer";
    let index = 0;
    const element = typingRef.current;

    const typeText = () => {
      if (element && index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
      }
    };

    typeText();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d253f] to-[#01b074]">
      <Navigation />
      <SocialLinks />
      <AIAgent />

      {/* Hello Section */}
      {/* <section id="hello" className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-gray-300 mb-4 font-mono">Hi all. I am</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Aditya Kumar</h1>
          <div className="flex items-center justify-center text-[#00ff9f] font-mono">
            <span className="mr-2">&gt;</span>
            <span ref={typingRef}></span>
            <span className="animate-blink">|</span>
          </div>
        </div>
      </section> */}

     <section id="hello " className="min-h-screen items-center justify-center pt-16 mt-16">
      <InteractiveHelloSection/>
      </section>


      {/* About Section */}
      <section id="about-me" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">&gt; about-me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                Passionate front-end developer with expertise in building modern web applications.
                Focused on creating intuitive user experiences and writing clean, maintainable code.
              </p>
              <p className="text-gray-300">
                Currently working on innovative projects at ITH Technologies, where I contribute to
                building scalable solutions and implementing best practices in web development.
              </p>
            </div>
            <Terminal />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black bg-opacity-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">&gt; projects</h2>
          <ProjectShowcase />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">&gt; skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-[#00ff9f] mb-4 font-mono">Languages</h3>
              <ul className="space-y-2 text-gray-300">
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00ff9f] mb-4 font-mono">Frameworks</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Angular</li>
                <li>React</li>
                <li>AngularJS</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#00ff9f] mb-4 font-mono">Tools</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Git</li>
                <li>VS Code</li>
                <li>Webpack</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-black bg-opacity-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">&gt; experience</h2>
          <div className="space-y-8">
            <div className="relative pl-8 border-l-2 border-[#00ff9f]">
              <div className="absolute w-4 h-4 bg-[#00ff9f] rounded-full -left-[9px] top-0"></div>
              <h3 className="text-xl font-semibold text-white">Software Development Engineer</h3>
              <p className="text-[#00ff9f] mb-2">ITH Technologies Pvt. Ltd.</p>
              <p className="text-gray-400 mb-2">Aug 2022 – Jan 2024</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Led front-end development for multiple client projects</li>
                <li>Implemented responsive designs and optimized performance</li>
                <li>Collaborated with cross-functional teams</li>
              </ul>
            </div>
            <div className="relative pl-8 border-l-2 border-[#00ff9f]">
              <div className="absolute w-4 h-4 bg-[#00ff9f] rounded-full -left-[9px] top-0"></div>
              <h3 className="text-xl font-semibold text-white">Software Engineer Trainee</h3>
              <p className="text-[#00ff9f] mb-2">ITH Technologies Pvt. Ltd.</p>
              <p className="text-gray-400 mb-2">Feb 2022 – Aug 2022</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Assisted in developing web applications</li>
                <li>Learned and implemented best practices</li>
                <li>Participated in code reviews and team meetings</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">&gt; education</h2>
          <div className="relative pl-8 border-l-2 border-[#00ff9f]">
            <div className="absolute w-4 h-4 bg-[#00ff9f] rounded-full -left-[9px] top-0"></div>
            <h3 className="text-xl font-semibold text-white">Bachelor of Technology</h3>
            <p className="text-[#00ff9f] mb-2">Computer Science and Engineering</p>
            <p className="text-gray-300">Amity University Lucknow</p>
            <p className="text-gray-400">2018 – 2022</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-me" className="py-20 bg-black bg-opacity-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 font-mono">&gt; contact-me</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Mail className="mr-4" size={20} />
                  <a href="mailto:adityakumar950489@gmail.com" className="hover:text-[#00ff9f]">
                    adityakumar950489@gmail.com
                  </a>
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone className="mr-4" size={20} />
                  <span>+91 9113400868</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="mr-4" size={20} />
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00ff9f]"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00ff9f]"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-2 bg-[#1E1E1E] text-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#00ff9f]"
              ></textarea>
              <button
                type="submit"
                className="px-6 py-2 bg-[#00ff9f] text-[#0d253f] rounded font-semibold hover:bg-opacity-90 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Signature */}
      <div className="fixed bottom-8 right-8 text-gray-300 font-mono">@aditya-kumar</div>
    </div>
  );
}

export default App;