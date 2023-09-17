import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();

const PORT = 4000;

app.listen(PORT);
console.log("Server conetado al puerto", PORT);
