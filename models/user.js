const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

// User Schema Definition
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure unique usernames
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique emails
    lowercase: true, // Normalize email to lowercase
  },
  phone: {
    type: String,
  },
  dob: {
    type: Date,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  graduationYear: {
    type: Number,
  },
  degree: {
    type: String,
  },
  department: {
    type: String,
  },
  employer: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  industry: {
    type: String,
  },
  experience: {
    type: Number, // in years
  },
  skills: [String],
  projects: [String],
  achievements: [String],
  linkedin: {
    type: String,
  },
  github: {
    type: String,
  },
  profilePicture: {
    type: String, // Store path to the profile picture
  },
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  groupCreated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group"
    }
  ],
  groupJoined: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  quizParticipated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  donations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
  jobPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  discussionPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
    },
  ],
  eventsOrganised: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  eventsJoined: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  points: {
    type: Number,
    default: 0,
  },
  isStarAlumni: {
    type: Boolean,
    default: false,
  },
});

// Passport-Local-Mongoose plugin for authentication
userSchema.plugin(passportLocalMongoose);

// Middleware to handle user-related data deletion
userSchema.pre("remove", async function (next) {
  const userId = this._id;

  // Remove all user-related references
  await mongoose.model("Job").deleteMany({ owner: userId });
  await mongoose.model("Discussion").deleteMany({ owner: userId });
  await mongoose.model("Event").deleteMany({ organiser: userId });

  // Remove the user from group memberships and quiz participation
  await mongoose.model("Group").updateMany({}, { $pull: { members: userId } });
  await mongoose.model("Quiz").updateMany({}, { $pull: { participants: userId } });

  // Handle donations: Replace user reference with "anonymous user"
  const anonymousUser = await mongoose.model("User").findOne({ username: "anonymous user" });
  if (anonymousUser) {
    await mongoose.model("Donation").updateMany({ owner: userId }, { owner: anonymousUser._id });
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
