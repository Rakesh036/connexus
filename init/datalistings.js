const listings = [
  {
    title: "Tech Conference 2024",
    description: "An annual tech conference featuring the latest advancements in technology and innovations from industry leaders.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g",
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h",
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reports: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ]
  },
  {
    title: "AI in Healthcare Workshop",
    description: "A workshop discussing the applications of AI in healthcare, with hands-on sessions and expert talks.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reports: []
  },
  {
    title: "Blockchain for Finance Webinar",
    description: "A webinar on how blockchain technology is transforming the finance sector, featuring industry experts.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d2h",
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    reports: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ]
  },
  {
    title: "Startup Pitch Night",
    description: "A networking event for startups to pitch their ideas to potential investors and mentors.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d0f",
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    reports: []
  },
  {
    title: "Cybersecurity Essentials Course",
    description: "An online course covering the basics of cybersecurity, designed for beginners and intermediate learners.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d0f",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d1g",
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    reports: []
  },
  {
    title: "Innovative UI/UX Design Trends",
    description: "A seminar discussing the latest trends and best practices in UI/UX design.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g",
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reports: []
  },
  {
    title: "Tech Startup Mentorship Program",
    description: "A mentorship program designed to support tech startups with guidance from experienced entrepreneurs.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    reports: []
  },
  {
    title: "Future of Cloud Computing",
    description: "A panel discussion on the future trends and advancements in cloud computing.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    reports: []
  },
  {
    title: "Deep Learning in Artificial Intelligence",
    description: "An in-depth look at how deep learning is revolutionizing artificial intelligence.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g",
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d0f",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    reports: []
  },
  {
    title: "Tech Innovations in E-Commerce",
    description: "A workshop on the latest technological innovations transforming the e-commerce sector.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reports: []
  },
  {
    title: "AI for Customer Experience",
    description: "Exploring how AI can enhance customer experience and drive business growth.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reports: []
  },
  {
    title: "Green Technology and Sustainability",
    description: "A discussion on how green technology is contributing to sustainability and environmental protection.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    reports: []
  },
  {
    title: "The Rise of Quantum Computing",
    description: "An overview of quantum computing and its potential impact on various industries.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d0f"
    ],
    reports: []
  },
  {
    title: "Cybersecurity Threats and Solutions",
    description: "A seminar focusing on current cybersecurity threats and practical solutions to combat them.",
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    owner: "64b27d1f8a8b8d8d8d8d8d0f",
    likes: [
      "64b27d1f8a8b8d8d8d8d2h"
    ],
    reports: []
  },
];

module.exports = { data:listings };