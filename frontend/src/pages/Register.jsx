import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../style/Register.module.css";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
