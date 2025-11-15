import { Calendar, Map, BookOpen, Users } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import backgroundImage from 'figma:asset/080f77819a4fbe17c378938467469eb55bd49802.png';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const quickLinks = [
    {
      title: 'Study Spots',
      description: 'Find the perfect place to study on campus',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      page: 'study-spots'
    },
    {
      title: 'Campus Events',
      description: 'Discover upcoming events and activities',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
      page: 'events'
    },
    {
      title: 'Campus Maps',
      description: 'Navigate GSU buildings and facilities',
      icon: Map,
      color: 'bg-green-100 text-green-600',
      page: 'maps'
    },
    {
      title: 'Connect',
      description: 'Meet other commuter students',
      icon: Users,
      color: 'bg-orange-100 text-orange-600',
      page: 'social'
    }
  ];

  return (
    <main
  className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden"
>
  {/* Blurred Background Image */}
  <div
    className="absolute inset-0 -z-10 blur-md opacity-50"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />

  {/* Hero Section */}
  <div className="text-center mb-12">
    <h1 className="text-black mb-4">Welcome to GSU Commuter Hub</h1>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Your one-stop resource for finding study spots, connecting with other commuters, 
      and making the most of your time on campus.
    </p>
  </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Card
              key={link.page}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => onNavigate(link.page)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${link.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-black mb-2">{link.title}</h3>
                  <p className="text-gray-600">{link.description}</p>
                  <Button
                    variant="link"
                    className="text-blue-600 hover:text-blue-700 px-0 mt-2"
                  >
                    Explore →
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-black mb-3">New to GSU?</h2>
        <p className="text-gray-700 mb-4">
          Discover resources designed specifically for commuter students to help you 
          navigate campus life, find study spots, and connect with peers.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Get Started
        </Button>
      </div>
    </main>
  );
}