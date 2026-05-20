import styles from "../style/NoteCard.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

const NoteCard = ({
  note,
  handleDelete,
  getAllNotes,
}) => {

  const navigate =
    useNavigate();

  const handleEdit =
    () => {

      navigate(
        `/edit/${note._id}`
      );
    };

  const handlePin =
    async () => {

      try {

        const res =
          await api.patch(
            `/notes/pin/${note._id}`
          );

        toast.success(
          res.data.message
        );

        getAllNotes();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Pin failed"
        );
      }
    };

  return (
    <div className={styles.card}>

      <div className={styles.top}>

        <h2 className={styles.title}>
          {note.title}
        </h2>

        <button
          onClick={handlePin}
          className={styles.pinBtn}
        >
          {
            note.isPinned
              ? "📌"
              : "📍"
          }
        </button>

      </div>

      <p className={styles.content}>
        {note.content}
      </p>

      <div
        className={
          styles.tagsContainer
        }
      >

        {
          note.tags?.map(
            (
              tag,
              index
            ) => (
              <span
                key={index}
                className={
                  styles.tag
                }
              >
                #{tag}
              </span>
            )
          )
        }

      </div>

      <div
        className={
          styles.buttonContainer
        }
      >

        <button
          onClick={
            handleEdit
          }
          className={
            styles.editBtn
          }
        >
          Edit
        </button>

        <button
          onClick={() =>
            handleDelete(
              note._id
            )
          }
          className={
            styles.deleteBtn
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default NoteCard;