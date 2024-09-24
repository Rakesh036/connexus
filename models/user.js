const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

// User Schema Definition
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: "",
  },
  dob: {
    type: Date,
    default: null,
  },
  city: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  graduationYear: {
    type: Number,
    default: null,
  },
  degree: {
    type: String,
    default: "",
  },
  department: {
    type: String,
    default: "",
  },
  employer: {
    type: String,
    default: "",
  },
  jobTitle: {
    type: String,
    default: "",
  },
  industry: {
    type: String,
    default: "",
  },
  experience: {
    type: Number,
    default: 0,
  },
  skills: {
    type: [String],
    default: [],
  },
  projects: {
    type: [String],
    default: [],
  },
  achievements: {
    type: [String],
    default: [],
  },
  linkedin: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  connections: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  groupsCreated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: [],
    },
  ],
  groupsJoined: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: [],
    },
  ],
  quizzesCreated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      default: [],
    },
  ],
  quizzesParticipated: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      default: [],
    },
  ],
  donations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Donation",
      default: [],
    },
  ],
  payments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      default: [],
    },
  ],
  jobPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Job",
      default: [],
    },
  ],
  discussionPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Discussion",
      default: [],
    },
  ],
  eventsOrganised: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: [],
    },
  ],
  eventsJoined: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      default: [],
    },
  ],
  successStories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Success",
      default: [],
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
  try {
    const userId = this._id;

    await mongoose.model("Job").deleteMany({ owner: userId });
    await mongoose.model("Discussion").deleteMany({ owner: userId });
    await mongoose.model("Event").deleteMany({ organiser: userId });

    await mongoose.model("Group").updateMany({}, { $pull: { members: userId } });
    await mongoose.model("Quiz").updateMany({}, { $pull: { participants: userId } });

    const anonymousUser = await mongoose.model("User").findOne({ username: "anonymous user" });
    if (anonymousUser) {
      await mongoose.model("Donation").updateMany({ owner: userId }, { owner: anonymousUser._id });
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
