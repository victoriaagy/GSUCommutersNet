import { Users, MessageCircle, UserPlus, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useState, useRef, useEffect } from 'react';

const connections = [
  { name: 'Estelle Bennett', major: 'Computer Science', initials: 'EB', color: 'bg-green-600', status: 'online' },
  { name: 'Sarah O Brian', major: 'Computer Science', initials: 'SO', color: 'bg-blue-600', status: 'idle' },
  { name: 'Charlie Purvis', major: 'Computer Science', initials: 'CP', color: 'bg-orange-600', status: 'offline' },
  { name: 'Victoria Agyare', major: 'Computer Science', initials: 'VA', color: 'bg-purple-600', status: 'online' }
];

export function SocialPage() {
  const [joinedGroups, setJoinedGroups] = useState<number[]>([]);
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const [groupSearch, setGroupSearch] = useState('');
  const [unread, setUnread] = useState<{ [key: string]: number }>({});
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Commuter Students Network',
      members: 265,
      description: 'Connect with fellow commuter students, share tips, and coordinate carpools!',
      messages: [],
      events: [],
      memberNames: ['Estelle', 'Sarah', 'Charlie']
    },
    {
      id: 2,
      name: 'Computer Science',
      members: 90,
      description: 'This is a group for computer science students to share resources and study together!',
      messages: [],
      events: [],
      memberNames: ['Victoria', 'Sarah']
    },
    {
      id: 3,
      name: 'Evening Commuters',
      members: 87,
      description: 'For students with evening classes who want to connect and study together!',
      messages: [],
      events: [],
      memberNames: ['Charlie', 'Estelle']
    }
  ]);

  const [activeChat, setActiveChat] = useState<{
    name: string;
    messages: { text: string; sender: 'you' | 'other'; time: string }[];
  } | null>(null);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [activeGroup, setActiveGroup] = useState<any>(null);
  const [newGroupEvent, setNewGroupEvent] = useState('');
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, activeGroup?.messages]);

  const getTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const handleJoinGroup = (groupId: number) => {
    setJoinedGroups(prev =>
      prev.includes(groupId) ? prev : [...prev, groupId]
    );
  };

  const openChatWith = (connectionName: string) => {
    setUnread(prev => ({ ...prev, [connectionName]: 0 }));
    setActiveChat({
      name: connectionName,
      messages: activeChat?.messages || []
    });
  };

  const sendMessageToChat = () => {
    if (!newMessage.trim()) return;

    const time = getTime();

    setActiveChat(prev =>
      prev
        ? {
            ...prev,
            messages: [
              ...prev.messages,
              { text: newMessage, sender: 'you', time },
              { text: 'Hey!', sender: 'other', time }
            ]
          }
        : prev
    );

    setUnread(prev => ({
      ...prev,
      [activeChat!.name]: (prev[activeChat!.name] || 0) + 1
    }));

    setNewMessage('');
  };

  const openGroupPage = (group: any) => {
    setActiveGroup(group);
  };

  const sendMessageToGroup = (text: string) => {
    if (!text.trim()) return;
    const time = getTime();

    setGroups(prevGroups =>
      prevGroups.map(g =>
        g.id === activeGroup.id
          ? {
              ...g,
              messages: [
                ...g.messages,
                { text, sender: 'you', time },
                { text: 'Thanks for sharing!', sender: 'other', time }
              ]
            }
          : g
      )
    );

    setActiveGroup(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        { text, sender: 'you', time },
        { text: 'Thanks for sharing!', sender: 'other', time }
      ]
    }));
  };

  const addEventToGroup = () => {
    if (!newGroupEvent.trim()) return;

    setGroups(prev =>
      prev.map(g =>
        g.id === activeGroup.id
          ? { ...g, events: [...g.events, newGroupEvent] }
          : g
      )
    );

    setActiveGroup(prev => ({
      ...prev,
      events: [...prev.events, newGroupEvent]
    }));

    setNewGroupEvent('');
    setShowEventPopup(false);
  };

  if (activeGroup) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Button variant="ghost" className="mb-4" onClick={() => setActiveGroup(null)}>
          ← Back
        </Button>

        {}
        <div className="w-full h-32 bg-blue-200 rounded-lg mb-6"></div>

        <h1 className="text-2xl font-bold text-black">{activeGroup.name}</h1>
        <p className="text-gray-600 mb-6">{activeGroup.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {}
          <div className="space-y-6 col-span-1">

            {}
            <Card className="p-4 shadow-md">
              <h2 className="text-lg font-semibold text-black mb-3">Events</h2>

              {activeGroup.events.length === 0 ? (
                <p className="text-gray-500 text-sm">No events yet.</p>
              ) : (
                <ul className="space-y-2">
                  {activeGroup.events.map((e: string, idx: number) => (
                    <li key={idx} className="border p-2 rounded-md">
                      {e}
                    </li>
                  ))}
                </ul>
              )}

              <Button
                size="sm"
                className="mt-3 bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setShowEventPopup(true)}
              >
                + Add Event
              </Button>
            </Card>

            {}
            <Card className="p-4 shadow-md">
              <h2 className="text-lg font-semibold text-black mb-3">Members</h2>

              <ul className="space-y-2">
                {activeGroup.memberNames.map((m: string, idx: number) => (
                  <li key={idx} className="text-gray-700">{m}</li>
                ))}
              </ul>
            </Card>
          </div>

          {}
          <Card className="p-4 shadow-md col-span-2 flex flex-col h-[450px]">
            <h2 className="text-lg font-semibold text-black mb-3">
              Group Chat
            </h2>

            <div className="flex-1 overflow-y-auto bg-white p-3 rounded-md space-y-3">
              {activeGroup.messages.length === 0 ? (
                <p className="text-gray-400 text-center mt-10 text-sm">No messages yet.</p>
              ) : (
                activeGroup.messages.map((msg: any, i: number) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === 'you' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`px-3 py-2 rounded-lg shadow-sm max-w-[70%] ${
                        msg.sender === 'you'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-black'
                      }`}
                    >
                      {msg.text}
                      <div className="text-xs mt-1 opacity-70">{msg.time}</div>
                    </div>
                  </div>
                ))
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="flex mt-3 gap-2">
              <input
                type="text"
                className="flex-1 border px-3 py-2 rounded-full"
                placeholder="Type a message..."
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
              />
              <Button
                className="bg-blue-600 text-white rounded-full px-4"
                onClick={() => {
                  sendMessageToGroup(newMessage);
                  setNewMessage('');
                }}
              >
                Send
              </Button>
            </div>
          </Card>
        </div>

        {}
        {showEventPopup && (
          <Card className="p-6 mt-6 shadow-lg border max-w-md mx-auto">
            <h2 className="text-black mb-4 text-lg font-semibold">Add Event</h2>
            <input
              type="text"
              value={newGroupEvent}
              onChange={e => setNewGroupEvent(e.target.value)}
              placeholder="Event name..."
              className="w-full border p-2 rounded-md mb-4"
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowEventPopup(false)}>
                Cancel
              </Button>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={addEventToGroup}
              >
                Add
              </Button>
            </div>
          </Card>
        )}
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">

      {}
      <div className="text-center mb-8">
        <h1 className="text-black mb-2">Connect & Socialize</h1>
        <p className="text-gray-600">Meet other commuter students and join study groups!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {}
        <div className="lg:col-span-2 space-y-6">

          {}
          <input
            type="text"
            placeholder="Search groups..."
            className="w-full border rounded-md p-2 mb-4"
            value={groupSearch}
            onChange={e => setGroupSearch(e.target.value)}
          />

          {}
          {filteredGroups.map(group => (
            <Card
              key={group.id}
              className="p-6 shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => openGroupPage(group)}
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <h3 className="text-black text-lg mb-1">{group.name}</h3>
                  <p className="text-gray-700 mb-3">{group.description}</p>

                  <span className="text-gray-600">{group.members} members</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {}
        <div className="space-y-6">

          <Card className="p-6 shadow-md">
            <h3 className="text-black mb-4 text-lg font-semibold">Your Connections</h3>

            <div className="space-y-4">
              {connections.map((c, index) => (
                <div key={index} className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className={`${c.color} text-white`}>
                        {c.initials}
                      </AvatarFallback>
                    </Avatar>

                    {}
                    <span
                      className={`h-3 w-3 rounded-full ${
                        c.status === 'online'
                          ? 'bg-green-500'
                          : c.status === 'idle'
                            ? 'bg-yellow-400'
                            : 'bg-red-500'
                      }`}
                    ></span>

                    <div>
                      <div className="text-gray-900">{c.name}</div>
                      <div className="text-gray-500 text-sm">{c.major}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {}
                    {unread[c.name] > 0 && (
                      <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">
                        {unread[c.name]} new
                      </span>
                    )}

                    <Button variant="outline" size="sm" onClick={() => openChatWith(c.name)}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>

                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
