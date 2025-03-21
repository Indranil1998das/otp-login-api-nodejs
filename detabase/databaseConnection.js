import mongoose from "mongoose";
const databaseConnection = () => {
  mongoose
    .connect(process.env.DBURL)
    .then(() => {
      console.log("Database is Connected");
    })
    .catch((error) => {
      console.error(error);
    });
};

export { databaseConnection };
