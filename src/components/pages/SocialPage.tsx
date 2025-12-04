import { Users, MessageCircle, UserPlus } from 'lucide-react';
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

  const handleJoinGroup = (groupId: number) => {
    setJoinedGroups(prev => (prev.includes(groupId) ? prev : [...prev, groupId]));
  };

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const openChatWith = (name: string) => {
    setUnread(prev => ({ ...prev, [name]: 0 }));
    setActiveChat({
      name,
      messages: activeChat?.name === name ? activeChat.messages : []
    });
  };

  const sendDirectMessage = () => {
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

    if (activeChat) {
      setUnread(prev => ({
        ...prev,
        [activeChat.name]: (prev[activeChat.name] || 0) + 1
      }));
    }

    setNewMessage('');
  };

  const openGroupPage = (group: any) => {
    setActiveGroup(group);
  };

  const sendGroupMessage = (text: string) => {
    if (!text.trim()) return;
    const time = getTime();

    setGroups(prev =>
      prev.map(g =>
        g.id === activeGroup.id
          ? {
              ...g,
              messages: [...g.messages, { text, sender: 'you', time }, { text: 'Thanks for sharing!', sender: 'other', time }]
            }
          : g
      )
    );

    setActiveGroup(prev => ({
      ...prev,
      messages: [...prev.messages, { text, sender: 'you', time }, { text: 'Thanks for sharing!', sender: 'other', time }]
    }));

    setNewMessage('');
  };

  const addGroupEvent = () => {
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
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Button variant="ghost" className="mb-4" onClick={() => setActiveGroup(null)}>
          ← Back
        </Button>

        {/* Banner */}
        <div className="w-full h-32 bg-blue-200 rounded-lg mb-4" />

        <h1 className="text-2xl text-black font-bold">{activeGroup.name}</h1>
        <p className="text-gray-600 mb-4">{activeGroup.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Events */}
            <Card className="p-6 shadow-md">
              <h2 className="text-black mb-3 text-lg font-semibold">Events</h2>
              {activeGroup.events.length === 0 ? (
                <p className="text-gray-500 text-sm">No events yet.</p>
              ) : (
                <ul className="space-y-2">
                  {activeGroup.events.map((event: string, idx: number) => (
                    <li key={idx} className="border p-2 rounded-md">{event}</li>
                  ))}
                </ul>
              )}

              <Button
                size="sm"
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setShowEventPopup(true)}
              >
                + Add Event
              </Button>
            </Card>

            {/* Members */}
            <Card className="p-6 shadow-md">
              <h2 className="text-black mb-3 text-lg font-semibold">Members</h2>
              <ul className="space-y-1">
                {activeGroup.memberNames.map((m: string, i: number) => (
                  <li key={i} className="text-gray-700">{m}</li>
                ))}
              </ul>
            </Card>
          </div>

          {/* RIGHT COLUMN — Group Chat */}
          <Card className="p-0 border shadow-md flex flex-col h-[450px] col-span-2">

            {/* Chat Header */}
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-black font-semibold">Group Chat</h2>
            </div>

            {/* Group Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-white">
              {activeGroup.messages.length === 0 ? (
                <p className="text-gray-400 text-center text-sm mt-10">No messages yet.</p>
              ) : (
                activeGroup.messages.map((msg: any, i: number) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl shadow-sm ${
                        msg.sender === "you"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-200 text-black rounded-bl-none"
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

            {/* Input */}
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
                onClick={() => sendGroupMessage(newMessage)}
              >
                Send
              </Button>
            </div>
          </Card>
        </div>

        {/* Add Event Popup */}
        {showEventPopup && (
          <Card className="p-6 max-w-md mx-auto mt-6 shadow-md">
            <h2 className="text-black text-lg font-semibold mb-3">Add Event</h2>

            <input
              type="text"
              value={newGroupEvent}
              onChange={(e) => setNewGroupEvent(e.target.value)}
              placeholder="Event name..."
              className="w-full border p-2 rounded-md mb-4"
            />

            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowEventPopup(false)}>Cancel</Button>
              <Button className="bg-blue-600 text-white" onClick={addGroupEvent}>Add</Button>
            </div>
          </Card>
        )}
      </main>
    );
  }


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
                <Button variant="ghost" onClick={() => setShowCreatePopup(false)}>Cancel</Button>

                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    if (!newGroupName.trim()) return;

                    const newGroup = {
                      id: groups.length + 1,
                      name: newGroupName,
                      members: 1,
                      description: "New group created by you!",
                      messages: [],
                      events: [],
                      memberNames: []
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

            {/* NEW search bar */}
            <input
              type="text"
              placeholder="Search groups..."
              value={groupSearch}
              onChange={(e) => setGroupSearch(e.target.value)}
              className="border p-2 rounded-md w-40"
            />

            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowCreatePopup(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>

          {/* GROUP CARDS */}
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

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{group.members} members</span>

                    <Button
                      variant="outline"
                      className={`border-blue-600 text-blue-600 hover:bg-blue-50 ${
                        joinedGroups.includes(group.id)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={joinedGroups.includes(group.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJoinGroup(group.id);
                      }}
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
                <div key={index} className="flex items-center gap-3 justify-between">

                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className={`${c.color} text-white`}>
                        {c.initials}
                      </AvatarFallback>
                    </Avatar>

                    {/* NEW: Status dot */}
                    <span
                      className={`h-3 w-3 rounded-full ${
                        c.status === 'online'
                          ? 'bg-green-500'
                          : c.status === 'idle'
                            ? 'bg-yellow-400'
                            : 'bg-red-500'
                      }`}
                    />

                    <div>
                      <div className="text-gray-900">{c.name}</div>
                      <div className="text-gray-500 text-sm">{c.major}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* 🟢 NEW: Unread messages badge */}
                    {unread[c.name] > 0 && (
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                        {unread[c.name]} new
                      </span>
                    )}

                    <Button variant="ghost" size="sm" onClick={() => openChatWith(c.name)}>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>

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
                        <div className="text-xs mt-1 opacity-70">{msg.time}</div>
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
                  onClick={sendDirectMessage}
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
