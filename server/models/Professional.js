const mongoose = require("mongoose");

const ouvrierProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    governorat: String,

    delegation: String,

    cite: String,

    photo: {type: 
    String,
    default: "https://img.freepik.com/premium-vector/black-silhouette-default-profile-avatar_664995-354.jpg",
  },
   cloudinary_id: String,

    speciality: [String],

    description: String,
    zoneDeplacement: String,

    statutValidation: {
      type: String,
      enum: ["en attente", "validé", "refusé"],
      default: "en attente",
    },
  },
  { timestamps: true }
);

const Profesional = mongoose.model("OuvrierProfile", ouvrierProfileSchema);
module.exports = Profesional;
