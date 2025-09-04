import { useState, useEffect } from "react";

const Caregiver = () => {
  const token = localStorage.getItem("token");
  const caregiverId = parseInt(localStorage.getItem("id"));
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAssignedOnly, setShowAssignedOnly] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [activityContent, setActivityContent] = useState("");

  const isAssignedToMe = (child) =>
    child.Caregiver_Id === caregiverId ||
    (child.Caregiver && child.Caregiver.id === caregiverId);

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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch child details");
      const data = await res.json();
      setSelectedChild(data);
      setNoteContent(""); // reset input
      setActivityContent(""); // reset input
    } catch (err) {
      setError(err.message);
    }
  };

  const assignChild = async (childId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/children/${childId}/assign`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error("Failed to assign child");
      const data = await res.json();

      const updatedChild = {
        ...data.child,
        Caregiver_Id: caregiverId,
        Caregiver: { id: caregiverId, firstName: "You", lastName: "" },
      };

      setChildren((prev) =>
        prev.map((c) => (c.id === childId ? updatedChild : c))
      );
      if (selectedChild?.id === childId) setSelectedChild(updatedChild);
    } catch (err) {
      setError(err.message);
    }
  };

  const saveNote = async (childId) => {
    if (!noteContent.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:3000/children/${childId}/notes`,
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

      setSelectedChild((prev) => ({
        ...prev,
        Notes: [...(prev.Notes || []), newNote],
      }));
      setNoteContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  const saveActivity = async (childId) => {
    if (!activityContent.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:3000/children/${childId}/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            activity: activityContent,
            authorType: "Caregiver",
          }),
        }
      );
      if (!res.ok) throw new Error("Failed to save activity");
      const newActivity = await res.json();

      setSelectedChild((prev) => ({
        ...prev,
        Activities: [...(prev.Activities || []), newActivity],
      }));
      setActivityContent("");
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredChildren = children.filter((c) => {
    if (!showAssignedOnly) return true;
    return isAssignedToMe(c);
  });

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">
        Caregiver Dashboard
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {loading && <p className="text-center">Loading children...</p>}

      <div className="flex justify-center mb-6 gap-2">
        <button
          className={`px-4 py-2 rounded font-semibold ${
            !showAssignedOnly ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setShowAssignedOnly(false)}
        >
          All Children
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            showAssignedOnly ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setShowAssignedOnly(true)}
        >
          Assigned to Me
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredChildren.map((child) => (
          <div
            key={child.id}
            className={`p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-md border-2 ${
              child.Caregiver_Id === caregiverId
                ? "border-green-500 bg-green-50"
                : child.Caregiver_Id
                ? "border-gray-400 bg-gray-50"
                : "border-blue-500 bg-blue-50"
            }`}
            onClick={() => openChildModal(child.id)}
          >
            <h2 className="text-xl font-bold">
              {child.firstName} {child.lastName}
            </h2>
            <p className="text-gray-600">Age: {child.age}</p>
            {!isAssignedToMe(child) && !child.Caregiver_Id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  assignChild(child.id);
                }}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Assign to me
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedChild && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 p-4"
          onClick={(e) =>
            e.target === e.currentTarget && setSelectedChild(null)
          }
        >
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-3 text-red-500 font-bold"
              onClick={() => setSelectedChild(null)}
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {selectedChild.firstName} {selectedChild.lastName}
            </h2>
            <p className="text-gray-600">Age: {selectedChild.age}</p>
            <p className="text-gray-600">
              Parent:{" "}
              {selectedChild.Parent
                ? `${selectedChild.Parent.firstName} ${selectedChild.Parent.lastName}`
                : "N/A"}
            </p>
            <p className="text-gray-600">
              Caregiver:{" "}
              {selectedChild.Caregiver
                ? `${selectedChild.Caregiver.firstName} ${selectedChild.Caregiver.lastName}`
                : "Not assigned"}
            </p>

            {/* Notes */}
            <textarea
              className="w-full border rounded p-2 mt-4"
              placeholder="Add a note..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <button
              onClick={() => saveNote(selectedChild.id)}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Save Note
            </button>

            {/* Activities */}
            <h3 className="mt-4 font-semibold">Add Activity:</h3>
            <textarea
              className="w-full border rounded p-2 mt-1"
              placeholder="Describe activity for this child..."
              value={activityContent}
              onChange={(e) => setActivityContent(e.target.value)}
            />
            <button
              onClick={() => saveActivity(selectedChild.id)}
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
            >
              Save Activity
            </button>

            {/* Display existing notes */}
            <div className="mt-4">
              {selectedChild.Notes && selectedChild.Notes.length > 0 ? (
                selectedChild.Notes.map((note) => (
                  <div
                    key={note.id}
                    className="border p-2 mb-1 rounded bg-green-50"
                  >
                    <strong>{note.authorType || "Parent"}:</strong>{" "}
                    {note.content}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No notes yet</p>
              )}
            </div>

            {/* Display existing activities */}
            <div className="mt-4">
              {selectedChild.Activities &&
              selectedChild.Activities.length > 0 ? (
                selectedChild.Activities.map((act) => (
                  <div
                    key={act.id}
                    className="border p-2 mb-1 rounded bg-yellow-50"
                  >
                    <strong>{act.authorType || "Caregiver"}:</strong>{" "}
                    {act.activity}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No activities yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Caregiver;
