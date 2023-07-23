import app from "./app.js";
import dbConnect from "../config/databaseConfig.js";

const PORT = process.env.PORT || 5000;

(async () => {
  await dbConnect();

  app.on("error", (err) => {
    console.log(err);
  });

  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
})();
