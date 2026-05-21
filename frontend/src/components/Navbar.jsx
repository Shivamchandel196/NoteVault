import styles from "../style/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";
import { FaSearch } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
<nav className={styles.navbar}>
  
  <div className={styles.logoContainer}>
    <h2 className={styles.logo}>NoteVault</h2>
    <MdEventNote className={styles.noteIcon} />
  </div>

  <div className={styles.searchBox}>
    <FaSearch className={styles.searchIcon} />

    <input
      type="text"
      placeholder="Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.searchInput}
    />
  </div>

  <div className={styles.btnContainer}>
    <button
      onClick={() => navigate("/create")}
      className={styles.createBtn}
    > +
      Create Note
    </button>

    <button
      onClick={handleLogout}
      className={styles.logoutBtn}
    >
      <LuLogOut />
    </button>
  </div>

</nav>
  );
};

export default Navbar;
