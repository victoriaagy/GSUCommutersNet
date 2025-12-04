import { Users, MessageCircle, UserPlus, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useState, useRef, useEffect } from 'react';

const connections = [
  { name: 'Estelle Bennett', major: 'Computer Science', initials: 'EB', color: 'bg-green-600' },
  { name: 'Sarah O Brian', major: 'Computer Science', initials: 'SO', color: 'bg-blue-600' },
  { name: 'Charlie Purvis', major: 'Computer Science', initials: 'CP', color: 'bg-orange-600' },
  { name: 'Victoria Agyare', major: 'Computer Science', initials: 'VA', color: 'bg-purple-600' }
];

export function SocialPage() {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const [groups, setGroups] = useState([
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
  ]);

  // Chat state
  const [activeChat, setActiveChat] = useState<{
    name: string;
    messages: { text: string; sender: 'you' | 'other' }[];
  } | null>(null);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleJoinGroup = (groupId: number) => {
    setJoinedGroups(prev =>
      prev.includes(groupId) ? prev : [...prev, groupId]
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-black mb-2">Connect & Socialize</h1>
        <p className="text-gray-600">Meet other commuter students and join study groups!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">

          {/* CREATE GROUP POPUP AT TOP */}
          {showCreatePopup && (
            <Card className="p-6 border border-gray-300 shadow-md">
              <h2 className="text-black mb-4 text-lg font-semibold">Create New Group</h2>

              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter group name"
                className="w-full border border-gray-300 rounded-md p-2 mb-4"
              />

              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setShowCreatePopup(false)}>
                  Cancel
                </Button>

                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    if (!newGroupName.trim()) return;

                    const newGroup = {
                      id: groups.length + 1,
                      name: newGroupName,
                      members: 1,
                      description: "New group created by you!"
                    };

                    setGroups([...groups, newGroup]);
                    setShowCreatePopup(false);
                    setNewGroupName('');
                  }}
                >
                  Create
                </Button>
              </div>
            </Card>
          )}

          {/* Groups Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-black text-xl">Groups & Communities</h2>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowCreatePopup(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>

          {/* GROUP CARDS */}
          {groups.map(group => (
            <Card key={group.id} className="p-6 shadow-md hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-black text-lg mb-1">{group.name}</h3>
                  <p className="text-gray-700 mb-3">{group.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{group.members} members</span>

                    <Button
                      variant="outline"
                      className={`border-blue-600 text-blue-600 hover:bg-blue-50 ${
                        joinedGroups.includes(group.id) ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={joinedGroups.includes(group.id)}
                      onClick={() => handleJoinGroup(group.id)}
                    >
                      {joinedGroups.includes(group.id) ? "Joined" : "Join Group"}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

        </div>

        {/* RIGHT COLUMN – CONNECTIONS & CHAT */}
        <div className="space-y-6">

          {/* CONNECTIONS LIST */}
          <Card className="p-6 shadow-md">
            <h3 className="text-black mb-4 text-lg font-semibold">Your Connections</h3>

            <div className="space-y-4">
              {connections.map((c, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className={`${c.color} text-white`}>
                      {c.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="text-gray-900">{c.name}</div>
                    <div className="text-gray-500 text-sm">{c.major}</div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setActiveChat({
                        name: c.name,
                        messages: []
                      })
                    }
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              View All Connections
            </Button>
          </Card>

          {/* CHAT WINDOW */}
          {activeChat && (
            <Card className="p-0 border border-gray-300 shadow-md flex flex-col h-[450px]">

              {/* Chat Header */}
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h2 className="text-black font-semibold">{activeChat.name}</h2>
                <Button variant="ghost" size="sm" onClick={() => setActiveChat(null)}>X</Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
                {activeChat.messages.length === 0 ? (
                  <p className="text-gray-400 text-center text-sm mt-10">No messages yet.</p>
                ) : (
                  activeChat.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.sender === "you" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] px-3 py-2 rounded-2xl shadow-sm ${
                          msg.sender === "you"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-gray-200 text-black rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Bar */}
              <div className="p-3 border-t bg-gray-50 flex gap-2">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />

                <Button
                  className="bg-blue-600 hover:bg-blue-700 rounded-full px-4"
                  onClick={() => {
                    if (!newMessage.trim()) return;

                    setActiveChat(prev =>
                      prev
                        ? {
                            ...prev,
                            messages: [
                              ...prev.messages,
                              { text: newMessage, sender: "you" },
                              { text: "Got it!", sender: "other" }
                            ]
                          }
                        : prev
                    );

                    setNewMessage("");
                  }}
                >
                  Send
                </Button>
              </div>
            </Card>
          )}

        </div>
      </div>
    </main>
  );
}
