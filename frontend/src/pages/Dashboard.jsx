import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import api from "../services/api";
import toast from "react-hot-toast";
import styles from "../style/Dashboard.module.css";

const Dashboard = () => {

  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const getAllNotes = async () => {

    try {

      const res = await api.get(
        `/notes/getall?search=${search}`
      );

      setNotes(res.data.notes);

    } catch {
      toast.error("Failed to fetch notes");
    }
  };

  useEffect(() => {

    const timer = setTimeout(() => {
      getAllNotes();
    }, 500);

    return () => clearTimeout(timer);

  }, [search]);

  return (
    <div className={styles.dashboard}>

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className={styles.container}>

        <h1 className={styles.heading}>
          Your Notes
        </h1>

        {
          notes.length === 0 ? (
            <p>No notes found</p>
          ) : (
            <div className={styles.notesGrid}>

              {notes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  getAllNotes={getAllNotes}
                />
              ))}

            </div>
          )
        }

      </div>
    </div>
  );
};

export default Dashboard;