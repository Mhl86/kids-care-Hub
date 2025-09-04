import { useState, useEffect } from "react";

const Parents = () => {
  const token = localStorage.getItem("token");
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [activityContent, setActivityContent] = useState("");

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await fetch("http://localhost:3000/children", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`Failed to fetch children: ${res.status} ${errText}`);
        }

        const data = await res.json();
        setChildren(data);
      } catch (err) {
        console.error(err.message);
        alert("Error loading children: " + err.message);
      }
    };
    if (token) fetchChildren();
  }, [token]);

  const openChildModal = async (childId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/children/${childId}/details`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error("Failed to fetch child details");

      const data = await res.json();
      setSelectedChild(data);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  const addNote = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/children/${selectedChild.id}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ content: noteContent }),
        }
      );

      if (!res.ok) throw new Error("Failed to save note");

      const newNote = await res.json();
      setSelectedChild({
        ...selectedChild,
        Notes: [...(selectedChild.Notes || []), newNote],
      });
      setNoteContent("");
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  const addActivity = async () => {
    if (!activityContent.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:3000/children/${selectedChild.id}/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ activity: activityContent }),
        }
      );

      if (!res.ok) throw new Error("Failed to save activity");

      const newActivity = await res.json();
      setSelectedChild({
        ...selectedChild,
        Activities: [...(selectedChild.Activities || []), newActivity],
      });
      setActivityContent("");
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Parents Dashboard</h1>

      {/* Child Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {children.map((child) => (
          <div
            key={child.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
            onClick={() => openChildModal(child.id)}
          >
            <h2 className="text-xl font-semibold">
              {child.firstName} {child.lastName}
            </h2>
            <p className="text-gray-600">Age: {child.age}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedChild && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => setSelectedChild(null)}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-2">
              {selectedChild.firstName} {selectedChild.lastName}
            </h2>
            <p>Age: {selectedChild.age}</p>
            <p>
              Parent: {selectedChild.Parent.firstName}{" "}
              {selectedChild.Parent.lastName}
            </p>
            <p>
              Caregiver: {selectedChild.Caregiver.firstName}{" "}
              {selectedChild.Caregiver.lastName}
            </p>

            {/* Notes */}
            <h3 className="mt-4 font-semibold">Notes:</h3>
            <ul className="mb-4">
              {selectedChild.Notes.map((note) => (
                <li key={note.id} className="border p-2 my-1 rounded">
                  <strong>{note.authorType}:</strong> {note.content}
                </li>
              ))}
            </ul>
            <textarea
              className="border w-full p-2 mb-2 rounded"
              placeholder="Add a note"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={addNote}
            >
              Add Note
            </button>

            {/* Activities */}
            <h3 className="mt-4 font-semibold">Activities:</h3>
            <ul className="mb-2">
              {selectedChild.Activities?.length > 0 ? (
                selectedChild.Activities.map((act) => (
                  <li
                    key={act.id}
                    className="border p-2 my-1 rounded bg-yellow-50"
                  >
                    <strong>{act.authorType || "Caregiver"}:</strong>{" "}
                    {act.activity}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No activities yet</p>
              )}
            </ul>
            <textarea
              className="border w-full p-2 mb-2 rounded"
              placeholder="Add an activity"
              value={activityContent}
              onChange={(e) => setActivityContent(e.target.value)}
            />
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
              onClick={addActivity}
            >
              Add Activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parents;
