const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: false },
  phone: { type: String, required: false },
  dob: { type: Date },
  city: { type: String },
  country: { type: String },
  graduationYear: { type: Number },
  degree: { type: String },
  department: { type: String },
  employer: { type: String },
  jobTitle: { type: String },
  industry: { type: String },
  experience: { type: Number }, // in years
  skills: [String],
  projects: [String],
  achievements: [String],
  linkedin: { type: String },
  github: { type: String },
  profilePicture: { type: String }, // store path to the profile picture
  connections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  groupJoined: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  quizParticipated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
  jobPost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  listingPost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
  ],
  eventOrganised: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  joinEvent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  point:{
  type: Number,
    default:0,
  },
  isStarAlumni: {
    type: Boolean,
    default: false,
  }
});

UserSchema.plugin(passportLocalMongoose); // Automatically handle password hashing and user authentication

// Middleware to handle deletion of user-related data
UserSchema.pre("remove", async function (next) {
  const userId = this._id;

  // Remove all user-related references (except donations)
  await mongoose.model("Job").deleteMany({ owner: userId });
  await mongoose.model("Listing").deleteMany({ owner: userId });
  await mongoose.model("Event").deleteMany({ organiser: userId });

  // Remove the user from group memberships and quiz participation
  await mongoose.model("Group").updateMany({}, { $pull: { members: userId } });
  await mongoose
    .model("Quiz")
    .updateMany({}, { $pull: { participants: userId } });

  // Handle donations: Replace user reference with "anonymous user"
  const anonymousUser = await mongoose
    .model("User")
    .findOne({ username: "anonymous user" });
  if (anonymousUser) {
    await mongoose
      .model("Donation")
      .updateMany({ owner: userId }, { owner: anonymousUser._id });
  }

  next();
});

module.exports = mongoose.model("User", UserSchema);
