const mongoose = require("mongoose");

// Replace 'your-database-uri' with your MongoDB URI (e.g., mongodb://localhost/mydatabase)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
module.exports = db;
