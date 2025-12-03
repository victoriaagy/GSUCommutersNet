import { Users, MessageCircle, UserPlus, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useState } from 'react';

const groups = [
  {
    id: 1,
    name: 'Commuter Students Network',
    members: 265,
    description: 'Connect with fellow commuter students, share tips, and coordinate carpools!'
  },
  {
    id: 2,
    name: 'Computer Science',
    members: 90,
    description: 'This is a group for computer science students to share resources and study together!'
  },
  {
    id: 3,
    name: 'Evening Commuters',
    members: 87,
    description: 'For students with evening classes who want to connect and study together!'
  }
];

const connections = [
  { name: 'Estelle Bennett', major: 'Computer Science', initials: 'EB', color: 'bg-pink-600' },
  { name: 'Sarah O Brian', major: 'Computer Science', initials: 'SO', color: 'bg-blue-600' },
  { name: 'Charlie Purvis', major: 'Computer Science', initials: 'CP', color: 'bg-yellow-600' },
  { name: 'Victoria Agyare', major: 'Computer Science', initials: 'VA', color: 'bg-purple-600' }
];

export function SocialPage() {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  // NEW — Popup chat for groups
  const [activeChat, setActiveChat] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleJoinGroup = (group: any) => {
    setJoinedGroups((prev) => (prev.includes(group.id) ? prev : [...prev, group.id]));
    setActiveChat({ name: group.name, messages: [] });
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-black mb-2">Connect & Socialize</h1>
          <p className="text-gray-600">Meet other commuter students and join study groups!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-black">Groups & Communities</h2>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowCreatePopup(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </div>

            {groups.map((group) => (
              <Card key={group.id} className="p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-black mb-2">{group.name}</h3>
                    <p className="text-gray-700 mb-3">{group.description}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">{group.members} members</span>
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={() => handleJoinGroup(group)}
                      >
                        Join Group
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="p-6 shadow-md">
              <h3 className="text-black mb-4">Your Connections</h3>
              <div className="space-y-4">
                {connections.map((connection, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className={`${connection.color} text-white`}>
                        {connection.initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="text-gray-900">{connection.name}</div>
                      <div className="text-gray-500">{connection.major}</div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveChat({ name: connection.name, messages: [] })}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* GROUP CHAT POPUP */}
      {activeChat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setActiveChat(null)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-black font-semibold">{activeChat.name}</h2>
              <Button variant="ghost" size="sm" onClick={() => setActiveChat(null)}>X</Button>
            </div>

            <div className="flex-1 overflow-y-auto border-t border-b p-2 mb-2 h-64">
              {activeChat.messages.length === 0 ? (
                <p className="text-gray-400 text-sm">No messages yet.</p>
              ) : (
                activeChat.messages.map((msg, index) => (
                  <div key={index} className="mb-1">
                    <span className="text-gray-800">{msg}</span>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-md p-2"
              />

              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  if (!newMessage.trim()) return;
                  setActiveChat((prev: any) => ({ ...prev, messages: [...prev.messages, newMessage] }));
                  setNewMessage('');
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
