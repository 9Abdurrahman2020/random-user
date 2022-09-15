const express = require("express");
const router = require("./routes/user.routes");

const app = express();
app.use(express.json());
app.use("/user", router);

// not found route handler
app.all("*", (req, res) => {
  res.status(404).send("Route not found");
});

app.get("/", (req, res) => {
  res.send({
    message: "Server is live",
  });
});

app.listen(5000, () => console.log("Server is running"));
