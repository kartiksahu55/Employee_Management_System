import app from "./app.js";
import dbConnect from "../config/databaseConfig.js";

const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME;

(async () => {
  await dbConnect();

  app.on("error", (err) => {
    console.log(err);
  });

  app.listen(PORT, () => {
    console.log(`Server running at ${HOSTNAME}:${PORT}`);
  });
})();
