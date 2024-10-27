// src/server.js
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.use("/", (req, res) => {
  res.send("Hello World from Mayank");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
