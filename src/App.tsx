import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/pages/HomePage';
import { EventsPage } from './components/pages/EventsPage';
import { MapsPage } from './components/pages/MapsPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { SocialPage } from './components/pages/SocialPage';
import { StudySpotsPage } from './components/pages/StudySpotsPage';

export type SpotType = 'Quiet' | 'Active';

export interface StudySpot {
  id: number;
  name: string;
  hours: string;
  type: SpotType;
  description: string;
  imageUrl: string;
}

const studySpots: StudySpot[] = [
  {
    id: 1,
    name: 'MJ Wings',
    hours: 'Mon–Sat 11am–9pm',
    type: 'Active',
    description: 'Cute café with affordable food; can get active depending on time',
    imageUrl: 'https://sst-s3-demo-bucket.s3.amazonaws.com/shops/mjwingsatlanta/1920_dc6a65aa-e20f-4bbe-bda3-78190374e662_image'
  },
  {
    id: 2,
    name: 'GSU Library — 4th Floor',
    hours: '7am–11pm',
    type: 'Quiet',
    description: 'Quiet floor ideal for silent studying',
    imageUrl: 'https://sites.gsu.edu/fall2016engl1101/files/2016/10/library-1jkf7tc.jpg'
  },
  {
    id: 3,
    name: 'GSU Library — 5th Floor',
    hours: '7am–11pm',
    type: 'Quiet',
    description: 'Quietest floor in the library with private study spots',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5a54eff9f43b55c572576f3c/1657209213882-G1HVK9ZEDTDN0DWWX62N/GeorgiaState_20210615MLB_Library_North_Terrace_123-1000.jpg'
  },
  {
    id: 4,
    name: 'GSU Library — Study Commons',
    hours: '6:30am–2am',
    type: 'Active',
    description: 'Large active study area perfect for group work',
    imageUrl: 'https://americanlibrariesmagazine.org/wp-content/uploads/2024/08/lds-georgia1.jpg'
  },
  {
    id: 5,
    name: 'Panther Lounge (Student Center West)',
    hours: '8am–10pm',
    type: 'Active',
    description: 'Lounge-style seating great for collaboration and casual study',
    imageUrl: 'https://engagement.gsu.edu/files/2025/02/IMG_3878-1500x1125.jpeg'
  },
  {
    id: 6,
    name: '55 Park Place — 11th Floor',
    hours: '8:30am–5:15pm',
    type: 'Quiet',
    description: 'Silent study floor with individual desks, amazing Korean-style food downstairs',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5b4677d2b40b9d8a7e9b4c34/1598389656107-JOJ9KXX9203037IX0W61/IMG_3782.jpg'
  },
  {
    id: 7,
    name: '55 Park Place — 12th Floor',
    hours: '8:30am–5:15pm',
    type: 'Quiet',
    description: 'Quiet floor with great views',
    imageUrl: 'https://images.squarespace-cdn.com/content/v1/5b4677d2b40b9d8a7e9b4c34/1623869721794-X2RG5OI5K6FMZ7XD7HF6/IMG_0440.JPG'
  },
  {
    id: 8,
    name: 'Centennial Hall — 2nd Floor (Honors College)',
    hours: 'Mon–Fri 8am–5pm',
    type: 'Quiet',
    description: 'Calm academic environment, nap pods available',
    imageUrl: 'https://events.gsu.edu/files/2019/10/20181107CPR_Fall_Admissions050.jpg'
  },
  {
    id: 9,
    name: 'Law Library — 5th and 6th Floor',
    hours: 'Mon–Fri 8:30am–5pm',
    type: 'Quiet',
    description: 'Quiet floor with amazing window views of the downtown area',
    imageUrl: 'https://lawlibrary.gsu.edu/files/2013/10/4-17-17-directions-library.jpg'
  },
  {
    id: 10,
    name: 'CMII — 2nd Floor',
    hours: 'Mon–Fri 8:30am–10pm',
    type: 'Active',
    description: 'Modern collaborative space with digital media atmosphere',
    imageUrl: 'https://cmii.gsu.edu/files/2024/07/BM5A8596-1.jpg'
  }
];


export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'events':
        return <EventsPage />;
      case 'maps':
        return <MapsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'social':
        return <SocialPage />;
      case 'study-spots':
        return <StudySpotsPage studySpots={studySpots} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
}
