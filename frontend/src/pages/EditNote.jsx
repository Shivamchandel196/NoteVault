import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import styles from "../style/EditNote.module.css";

const EditNote = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchNote = async () => {

      try {

        const res = await api.get(
          `/notes/get/${id}`
        );

        setFormData({
          title: res.data.note.title || "",
          content: res.data.note.content || "",
          tags:
            res.data.note.tags?.join(", ") || "",
        });

      } catch (error) {

        toast.error(
          error.response?.data?.message ||
          "Failed to fetch note"
        );

        navigate("/dashboard");
      }
    };

    if (id) {
      fetchNote();
    }

  }, [id, navigate]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await api.put(
        `/notes/update/${id}`,
        {
          title: formData.title,
          content: formData.content,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }
      );

      toast.success(res.data.message);

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Update failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.card}>

        <h1 className={styles.heading}>
          Edit Note
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
            placeholder="Write note..."
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
            {loading
              ? "Updating..."
              : "Update Note"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditNote;