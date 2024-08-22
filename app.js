const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const PORT = config.get("port") || 3003;
const mainRouter = require("./routes/index.routes");

const app = express();

app.use(express.json());
app.use("/api", mainRouter);

async function start() {
  try {
    await mongoose.connect(config.get("Uri"));
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

start();
