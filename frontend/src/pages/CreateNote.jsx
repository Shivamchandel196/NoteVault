import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import styles from "../style/CreateNote.module.css";

const CreateNote = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const res =
          await api.post(
            "/notes",
            {
              title:
                formData.title,

              content:
                formData.content,

              tags:
                formData.tags
                  .split(",")
                  .map((tag) =>
                    tag.trim()
                  )
                  .filter(Boolean),
            }
          );

        toast.success(
          res.data.message
        );

        navigate("/dashboard");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Failed to create note"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h1 className={styles.heading}>
          Create Note
        </h1>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <textarea
            name="content"
            placeholder="Write your note..."
            value={formData.content}
            onChange={handleChange}
            className={styles.textarea}
            required
          />

          <input
            type="text"
            name="tags"
            placeholder="react, mern, js"
            value={formData.tags}
            onChange={handleChange}
            className={styles.input}
          />

          <button
            type="submit"
            className={styles.button}
          >
            {
              loading
                ? "Creating..."
                : "Create Note"
            }
          </button>

        </form>

      </div>

    </div>
  );
};

export default CreateNote;