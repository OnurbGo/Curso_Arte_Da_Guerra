import sequelize from "./config/database";
import app from "./app";
const port = 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database has been synchronized");
  })
  .catch((error) => {
    console.error("ERROR in Database synchronization:", error.message);
  });

app.listen(port, () => {
  console.log("Server is running on port:", port);
});
