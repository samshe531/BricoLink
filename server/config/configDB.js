//require de mongoose
const mongoose = require ('mongoose')
    
    const connectDB = async () => {
        try {
            await mongoose.connect(process.env.DB_URI);
            console.log("Base donnée connectée...")
        } catch (error) {
            console.log("connexion de la base donnée iimpossible...", error)
            process.exit(1) // sortie si on arrive pas à se connecter à la BD
        }
    }
    module.exports = connectDB;