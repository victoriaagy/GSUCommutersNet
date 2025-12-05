import { Calendar, Map, BookOpen, Users } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

const backgroundImageUrl = 
'https://news.gsu.edu/files/2024/08/20190814_MLB_Science_Center_2_night_061.jpg';

// declare module '*.jpg' {
//   const value: string;
//   export default value;
// }
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
  <main className = "font-poppins relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
  {/*Background Image */}
  <div
    className="absolute inset-0 z-0 blur-[10px]"
    style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />

  <div className= "absolute inset-0 z-0 bg-black/60 backdrop-blur-sm" />

  <div className="relative z-10">

  {/* Hero Section */}
  <div className="text-left mb-12">
    <h1
      className="text-white font-bold mb-4 font-poppins"
      style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', lineHeight: 1.1 }}
    > Welcome to
      <br></br> GSU Commuters Net
    </h1>
    <p className="text-lg sm:text-xl text-white max-w-2xl">
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
              className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] w-96"
              onClick={() => onNavigate(link.page)}
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(4px)'}} >
              <div className="flex items-start gap-3">
                <div className={`p-3 rounded-lg ${link.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-grey-900 mb-1">{link.title}</h3>
                  <p className="text-gray-600">{link.description}</p>
  
               </div>
                </div>
              </Card>
          );
        })}
      </div>
  </div>
  </main>
  );
}
