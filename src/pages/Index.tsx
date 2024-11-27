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
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("./images/bg1.jpg")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            THE <span className="text-primary">ROCK</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in">
            Where Great Rock Lives
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
                The Rock is committed to delivering the worlds best selection of rock music ,whilst giving a new home to irish rock and metal bands.
              </p>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src="./images/aboutus.jpg" 
                alt="Radio Studio" 
                className="w-full h-full object-cover"
              />
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
            {[
              'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f',
              'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
              'https://images.unsplash.com/photo-1554469384-e58fac16e23a'
            ].map((image, index) => (
              <div
                key={index}
                className="aspect-video bg-rock-light rounded-lg overflow-hidden"
              >
                <img src={image} alt={`Sponsor ${index + 1}`} className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="live-shows" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Live Shows</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Morning Rock",
                time: "6:00 AM - 10:00 AM",
                dj: "Alex Thunder",
                image: "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742"
              },
              {
                title: "Afternoon Drive",
                time: "2:00 PM - 6:00 PM",
                dj: "Sarah Storm",
                image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad"
              },
              {
                title: "Night Rocks",
                time: "8:00 PM - 12:00 AM",
                dj: "Mike Lightning",
                image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
              }
            ].map((show, index) => (
              <div key={index} className="bg-rock-light rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                <div className="aspect-video">
                  <img src={show.image} alt={show.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{show.title}</h3>
                  <p className="text-gray-400 mb-1">{show.time}</p>
                  <p className="text-primary">with {show.dj}</p>
                </div>
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
