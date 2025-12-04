import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

// ----------------------
// TYPES
// ----------------------
type Profile = {
  name: string;
  major: string;
  grade: string;
  email: string;
  phone: string;
  studentType: string;
};

type Preferences = {
  studyEnvironment: string;
  notifications: string;
  commute: string;
};

type CommuteDay = {
  hasClass: boolean;
  start: string;
  end: string;
};

type Commute = {
  Monday: CommuteDay;
  Tuesday: CommuteDay;
  Wednesday: CommuteDay;
  Thursday: CommuteDay;
  Friday: CommuteDay;
};

// ----------------------
// MAIN PROFILE PAGE
// ----------------------
export function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    major: "Computer Science",
    grade: "Junior",
    email: "john.doe@student.gsu.edu",
    phone: "(404) 555-0123",
    studentType: "Commuter Student",
  });

  const [preferences, setPreferences] = useState<Preferences>({
    studyEnvironment: "Quiet Space",
    notifications: "Enabled",
    commute: "Mon-Fri, 9am-5pm",
  });

  const [modalField, setModalField] = useState<keyof Profile | keyof Preferences | null>(null);
  const [tempValue, setTempValue] = useState("");

  const [commuteEnabled, setCommuteEnabled] = useState(true);
  const [editingCommute, setEditingCommute] = useState(false);

  const [commute, setCommute] = useState<Commute>({
    Monday: { hasClass: true, start: "09:00", end: "17:00" },
    Tuesday: { hasClass: true, start: "09:00", end: "17:00" },
    Wednesday: { hasClass: true, start: "09:00", end: "17:00" },
    Thursday: { hasClass: true, start: "09:00", end: "17:00" },
    Friday: { hasClass: true, start: "09:00", end: "17:00" },
  });

  const studyOptions = [
    "Quiet Space",
    "Group Environment",
    "Cafe / Lounge",
    "Library",
    "Outdoors",
    "Computer Lab",
  ];

  const weekdays: (keyof Commute)[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const openModal = (field: keyof Profile | keyof Preferences, current: string) => {
    setModalField(field);
    setTempValue(current);
  };

  const saveModal = () => {
    if (!modalField) return;

    if (modalField in profile) {
      setProfile((prev) => ({ ...prev, [modalField]: tempValue } as Profile));
    } else {
      setPreferences((prev) => ({ ...prev, [modalField]: tempValue } as Preferences));
    }

    setModalField(null);
    setTempValue("");
  };

  const toggleDayNoClass = (day: keyof Commute) => {
    setCommute((prev) => ({
      ...prev,
      [day]: { ...prev[day], hasClass: !prev[day].hasClass },
    }));
  };

  const updateDayTime = (day: keyof Commute, key: "start" | "end", value: string) => {
    setCommute((prev) => ({
      ...prev,
      [day]: { ...prev[day], [key]: value },
    }));
  };

  return (
    <main className="w-full min-h-screen bg-gray-50 pb-16">
      {/* HEADER */}
      <header className="w-full bg-white shadow-md py-6 mb-10">
        <h1 className="text-4xl font-bold text-center text-gray-800">My Profile Dashboard</h1>
      </header>

      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 grid lg:grid-cols-[1.4fr,1fr] gap-12">
        {/* LEFT COLUMN */}
        <div className="space-y-10">
          {/* PROFILE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 bg-white shadow-lg rounded-xl">
              <div className="flex gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback>
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
                      <p className="text-gray-500 text-lg">{profile.studentType}</p>
                    </div>

                    <Button
                      onClick={() => openModal("name", profile.name)}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                    >
                      <Edit className="w-5 h-5" /> Edit
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {[
                      { icon: <User className="w-5 h-5" />, label: profile.major, field: "major" },
                      { icon: <Calendar className="w-5 h-5" />, label: profile.grade, field: "grade" },
                      { icon: <Mail className="w-5 h-5" />, label: profile.email, field: "email" },
                      { icon: <Phone className="w-5 h-5" />, label: profile.phone, field: "phone" },
                      { icon: <MapPin className="w-5 h-5" />, label: profile.studentType, field: "studentType" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => openModal(item.field as any, item.label)}
                      >
                        <div className="flex items-center gap-3 text-gray-700">{item.icon}{item.label}</div>
                        <Edit className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* PREFERENCES CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 bg-white shadow-lg rounded-xl">
              <h3 className="text-2xl font-bold mb-5 text-gray-800">Study Preferences</h3>

              <div className="mb-5">
                <p className="text-sm text-gray-500">Selected Environment</p>
                <span className="inline-block mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                  {preferences.studyEnvironment}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {studyOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPreferences((p) => ({ ...p, studyEnvironment: opt }))}
                    className={`px-4 py-2 rounded-lg text-sm border transition-all duration-150 ${
                      preferences.studyEnvironment === opt
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white hover:bg-gray-100"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="mt-7">
                <p className="text-sm text-gray-600 mb-2">Notifications</p>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setPreferences((p) => ({ ...p, notifications: "Enabled" }))}
                    className={preferences.notifications === "Enabled" ? "bg-green-600 text-white" : ""}
                  >
                    Enable
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPreferences((p) => ({ ...p, notifications: "Disabled" }))}
                    className={preferences.notifications === "Disabled" ? "bg-red-100" : ""}
                  >
                    Disable
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-10">
          {/* COMMUTE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-8 bg-white shadow-lg rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Weekly Commute Schedule</h3>
                  <p className="text-sm text-gray-500">Mon - Fri only</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    className={commuteEnabled ? "bg-green-600 text-white" : ""}
                    onClick={() => setCommuteEnabled((s) => !s)}
                  >
                    {commuteEnabled ? "Enabled" : "Disabled"}
                  </Button>
                  <Button onClick={() => setEditingCommute((e) => !e)}>
                    {editingCommute ? "Done" : "Edit"}
                  </Button>
                </div>
              </div>

              {/* Disabled */}
              {!commuteEnabled && (
                <div className="p-6 bg-gray-50 border rounded-lg text-center text-gray-500">
                  Commute schedule is disabled.
                </div>
              )}

              {/* Collapsed view */}
              {commuteEnabled && !editingCommute && (
                <div className="space-y-3">
                  {weekdays.map((day) => (
                    <div
                      key={day}
                      className="p-4 rounded-lg border bg-white flex justify-between items-center shadow-sm"
                    >
                      <div className="flex gap-4 items-center">
                        <span className="font-medium w-24">{day}</span>
                        {commute[day].hasClass ? (
                          <span>{commute[day].start} — {commute[day].end}</span>
                        ) : (
                          <span className="italic text-gray-400">No Class</span>
                        )}
                      </div>
                      <Button onClick={() => setEditingCommute(true)}>Edit</Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Editing view */}
              {commuteEnabled && editingCommute && (
                <div className="space-y-5">
                  {weekdays.map((day) => (
                    <div key={day} className="p-5 bg-gray-50 rounded-lg border shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-lg w-28">{day}</span>
                        <Button
                          onClick={() => toggleDayNoClass(day)}
                          className={commute[day].hasClass ? "bg-blue-600 text-white" : "bg-gray-300"}
                        >
                          {commute[day].hasClass ? "Class" : "No Class"}
                        </Button>
                      </div>

                      {commute[day].hasClass && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Start</p>
                            <input
                              type="time"
                              value={commute[day].start}
                              onChange={(e) => updateDayTime(day, "start", e.target.value)}
                              className="w-full border p-2 rounded"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">End</p>
                            <input
                              type="time"
                              value={commute[day].end}
                              onChange={(e) => updateDayTime(day, "end", e.target.value)}
                              className="w-full border p-2 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex gap-4 mt-3">
                    <Button className="flex-1" onClick={() => setEditingCommute(false)}>
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={() => setEditingCommute(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>

      {/* MODAL */}
      {modalField && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Edit {String(modalField)}</h3>
            <input
              className="w-full p-3 border rounded mb-4"
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <Button onClick={() => setModalField(null)}>Cancel</Button>
              <Button onClick={saveModal}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
