const jobReviews = [
  {
    comment: "Great company with a fantastic team!",
    createdAt: "2024-08-01T10:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Challenging work but rewarding.",
    createdAt: "2024-08-02T11:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Supportive management and good career growth.",
    createdAt: "2024-08-03T12:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Competitive salary but long working hours.",
    createdAt: "2024-08-04T13:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Wonderful work environment with flexible hours.",
    createdAt: "2024-08-05T14:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Opportunities for growth and learning.",
    createdAt: "2024-08-06T15:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Decent pay but lack of work-life balance.",
    createdAt: "2024-08-07T16:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Innovative projects and great team spirit.",
    createdAt: "2024-08-08T17:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Good benefits but high pressure work environment.",
    createdAt: "2024-08-09T18:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Flexible working hours and supportive colleagues.",
    createdAt: "2024-08-10T19:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Great opportunities for professional development.",
    createdAt: "2024-08-11T20:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "High expectations but rewarding experience.",
    createdAt: "2024-08-12T21:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Supportive team and excellent training programs.",
    createdAt: "2024-08-13T22:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Fast-paced environment with many learning opportunities.",
    createdAt: "2024-08-14T23:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "High pressure but with good compensation.",
    createdAt: "2024-08-15T08:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Excellent work culture and team dynamics.",
    createdAt: "2024-08-16T09:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Great place to learn and grow.",
    createdAt: "2024-08-17T10:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Challenging projects with supportive management.",
    createdAt: "2024-08-18T11:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Good salary but demanding work hours.",
    createdAt: "2024-08-19T12:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Innovative work with a focus on personal development.",
    createdAt: "2024-08-20T13:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Dynamic work environment and skilled team.",
    createdAt: "2024-08-21T14:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Excellent benefits and career advancement opportunities.",
    createdAt: "2024-08-22T15:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Good work-life balance but limited advancement opportunities.",
    createdAt: "2024-08-23T16:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Great team and supportive management.",
    createdAt: "2024-08-24T17:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Challenging role with room for growth.",
    createdAt: "2024-08-25T18:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Good salary but high-pressure environment.",
    createdAt: "2024-08-26T19:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Supportive colleagues and rewarding work.",
    createdAt: "2024-08-27T20:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Great place to work but demanding deadlines.",
    createdAt: "2024-08-28T21:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Opportunities for learning and development.",
    createdAt: "2024-08-29T22:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Dynamic and challenging role with a great team.",
    createdAt: "2024-08-30T23:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  }
];
module.exports={data:jobReviews};