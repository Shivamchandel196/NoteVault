import styles from "../style/Login.module.css";
import toast from "react-hot-toast";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await api.post("/auth/login", formData);
      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
   <div className={styles.container}>
  <div className={styles.card}>

    <h1>Login</h1>

    <form onSubmit={handleSubmit}>

      <div className={styles.formGroup}>
        <label
          htmlFor="email"
          className={styles.label}
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label
          htmlFor="password"
          className={styles.label}
        >
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Enter Password"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className={styles.button}
      >
        Login
      </button>

    </form>

    <p className={styles.text}>
      Don't have an account?{" "}
      <Link
        to="/register"
        className={styles.link}
      >
        Register
      </Link>
    </p>

  </div>
</div>
  );
};

export default Login;
