
import app from "./src/app.js";
import connectDb from "./src/config/database.js";
import config from "./src/config/config.js";

connectDb();









app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
  console.log("NoteVault app");
});