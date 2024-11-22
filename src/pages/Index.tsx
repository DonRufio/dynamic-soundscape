import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AudioPlayer from '@/components/AudioPlayer';
import { Mail, Phone, MapPin } from 'lucide-react';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            THE <span className="text-primary">ROCK</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in">
            Your Ultimate Rock Music Destination
          </p>
          <a
            href="#listen"
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors duration-200 inline-block"
          >
            Listen Live
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-rock-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300">
                Welcome to The Rock, where we bring you the best in rock music 24/7. From classic hits to the latest tracks,
                we're your premier destination for everything rock.
              </p>
              <p className="text-gray-300">
                Our passionate team of DJs and music experts curate the perfect mix of rock genres, ensuring you stay
                connected to the music you love.
              </p>
            </div>
            <div className="aspect-video bg-rock-light rounded-lg overflow-hidden">
              {/* Add studio image here */}
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-rock-dark" />
            </div>
          </div>
        </div>
      </section>

      {/* Listen Live Section */}
      <section id="listen" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Listen Live</h2>
          <div className="max-w-2xl mx-auto">
            <AudioPlayer />
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section id="sponsors" className="py-20 bg-rock-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((sponsor) => (
              <div
                key={sponsor}
                className="aspect-video bg-rock-light rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-500">Sponsor Logo</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <Mail className="text-primary" size={24} />
                <span className="text-gray-300">contact@therock.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="text-primary" size={24} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="text-primary" size={24} />
                <span className="text-gray-300">123 Rock Street, Music City</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-rock-dark text-white px-4 py-3 rounded-lg"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-rock-dark text-white px-4 py-3 rounded-lg"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full bg-rock-dark text-white px-4 py-3 rounded-lg"
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;