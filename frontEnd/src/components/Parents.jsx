import { useState, useEffect } from "react";

const Parents = () => {
  const token = localStorage.getItem("token");
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChildren = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:3000/children", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch children");
        const data = await res.json();
        setChildren(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChildren();
  }, [token]);

  const openChildModal = async (childId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/children/${childId}/details`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch child details");
      const data = await res.json();
      setSelectedChild({ ...data, Notes: data.Notes || [] });
    } catch (err) {
      setError(err.message);
    }
  };

  const addNote = async () => {
    if (!noteContent.trim()) return;
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
      if (!res.ok) throw new Error("Failed to add note");
      const newNote = await res.json();
      setSelectedChild((prev) => ({
        ...prev,
        Notes: [...prev.Notes, newNote],
      }));
      setNoteContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Parents Dashboard</h1>

      {error && (
        <p className="text-red-500 text-center mb-4 break-words">{error}</p>
      )}
      {loading && <p className="text-center mb-4">Loading children...</p>}

      {/* Children Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {children.map((child) => (
          <div
            key={child.id}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:scale-105 transition-transform"
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
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50"
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedChild(null)
          }
        >
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-red-500 font-bold"
              onClick={() => setSelectedChild(null)}
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {selectedChild.firstName} {selectedChild.lastName}
            </h2>
            <p className="text-gray-700 mb-1">Age: {selectedChild.age}</p>
            <p className="text-gray-700 mb-1">
              Parent:{" "}
              {selectedChild.Parent
                ? `${selectedChild.Parent.firstName} ${selectedChild.Parent.lastName}`
                : "N/A"}
            </p>
            <p className="text-gray-700 mb-2">
              Caregiver:{" "}
              {selectedChild.Caregiver
                ? `${selectedChild.Caregiver.firstName} ${selectedChild.Caregiver.lastName}`
                : "N/A"}
            </p>

            {/* Notes */}
            <h3 className="font-semibold mb-2">Notes:</h3>
            <div className="max-h-40 overflow-y-auto mb-2">
              {selectedChild.Notes.length > 0 ? (
                selectedChild.Notes.map((note) => (
                  <div
                    key={note.id}
                    className="border p-2 mb-1 rounded bg-gray-50"
                  >
                    <strong>{note.authorType || "Unknown"}:</strong>{" "}
                    {note.content}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No notes yet</p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={noteContent}
                placeholder="Add a note"
                onChange={(e) => setNoteContent(e.target.value)}
                className="flex-1 border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={addNote}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parents;
