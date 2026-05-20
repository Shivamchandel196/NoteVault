import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import api from "../services/api";
import toast from "react-hot-toast";
import styles from "../style/Dashboard.module.css";

const Dashboard = () => {

  const [notes, setNotes] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages,
    setTotalPages] =
    useState(1);

  const getAllNotes =
    async () => {

      try {

        const res =
          await api.get(
            `/notes/getall?search=${search}&page=${page}&limit=5`
          );

        setNotes(
          res.data.notes
        );

        setTotalPages(
          res.data.totalPages
        );

      } catch {

        toast.error(
          "Failed to fetch notes"
        );
      }
    };

  const handleDelete =
    async (id) => {

      try {

        const res =
          await api.delete(
            `/notes/delete/${id}`
          );

        toast.success(
          res.data.message
        );

        getAllNotes();

      } catch {

        toast.error(
          "Delete failed"
        );
      }
    };

  useEffect(() => {

    const timer =
      setTimeout(() => {

        getAllNotes();

      }, 500);

    return () =>
      clearTimeout(timer);

  }, [search, page]);

  return (
    <div
      className={
        styles.dashboard
      }
    >

      <Navbar
        search={search}
        setSearch={
          setSearch
        }
      />

      <div
        className={
          styles.container
        }
      >

        <h1
          className={
            styles.heading
          }
        >
          Your Notes
        </h1>

        {
          notes.length === 0 ? (

            <p>
              No notes found
            </p>

          ) : (

            <>
              <div
                className={
                  styles.notesGrid
                }
              >

                {
                  notes.map(
                    (note) => (
                     <NoteCard
  key={note._id}
  note={note}
  handleDelete={handleDelete}
  getAllNotes={getAllNotes}
/>
                    )
                  )
                }

              </div>

              {/* Pagination */}
              <div
                className={
                  styles.pagination
                }
              >

                <button
                  onClick={() =>
                    setPage(
                      page - 1
                    )
                  }

                  disabled={
                    page === 1
                  }
                >
                  Prev
                </button>

                <span>
                  Page {page}
                  {" "}of{" "}
                  {
                    totalPages
                  }
                </span>

                <button
                  onClick={() =>
                    setPage(
                      page + 1
                    )
                  }

                  disabled={
                    page ===
                    totalPages
                  }
                >
                  Next
                </button>

              </div>
            </>
          )
        }

      </div>

    </div>
  );
};

export default Dashboard;