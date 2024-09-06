const successStories = [
  {
    title: "Innovative Education Program",
    description: "A groundbreaking education program that has transformed learning for underprivileged children.",
    image: {
      url: "http://example.com/images/education-program.jpg",
      filename: "education-program.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h",
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ]
  },
  {
    title: "Tech Startup Success",
    description: "A tech startup that started from scratch and became a major player in the industry.",
    image: {
      url: "http://example.com/images/tech-startup.jpg",
      filename: "tech-startup.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d0f",
      "64b27d1f8a8b8d8d8d8d8d2h"
    ]
  },
  {
    title: "Green Energy Initiative",
    description: "A successful initiative aimed at promoting green energy and reducing carbon footprints.",
    image: {
      url: "http://example.com/images/green-energy.jpg",
      filename: "green-energy.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ]
  },
  {
    title: "Health Tech Breakthrough",
    description: "A breakthrough in health technology that has significantly improved patient outcomes.",
    image: {
      url: "http://example.com/images/health-tech.jpg",
      filename: "health-tech.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d1g",
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ]
  },
  {
    title: "Education Technology Revolution",
    description: "An education technology tool that revolutionized the way students learn and teachers teach.",
    image: {
      url: "http://example.com/images/education-tech.jpg",
      filename: "education-tech.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d0f",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ]
  },
  {
    title: "Social Impact Project",
    description: "A social impact project that has made a significant difference in the lives of many individuals.",
    image: {
      url: "http://example.com/images/social-impact.jpg",
      filename: "social-impact.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ]
  },
  {
    title: "Innovative Healthcare Solution",
    description: "An innovative solution in healthcare that has transformed patient care and treatment methods.",
    image: {
      url: "http://example.com/images/healthcare-solution.jpg",
      filename: "healthcare-solution.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ]
  },
  {
    title: "Breakthrough in AI",
    description: "A major breakthrough in AI technology that has opened new possibilities in various fields.",
    image: {
      url: "http://example.com/images/ai-breakthrough.jpg",
      filename: "ai-breakthrough.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d0f",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d1g"
    ]
  },
  {
    title: "Community Empowerment Program",
    description: "A program focused on empowering local communities through various initiatives and support systems.",
    image: {
      url: "http://example.com/images/community-empowerment.jpg",
      filename: "community-empowerment.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h",
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ]
  },
  {
    title: "Sustainable Development Initiative",
    description: "An initiative aimed at promoting sustainable development practices and reducing environmental impact.",
    image: {
      url: "http://example.com/images/sustainable-development.jpg",
      filename: "sustainable-development.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d0f"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d1g"
    ]
  },
  {
    title: "Next-Gen Robotics Project",
    description: "A robotics project that introduces next-generation technology to enhance automation and efficiency.",
    image: {
      url: "http://example.com/images/robotics-project.jpg",
      filename: "robotics-project.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d1g"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d0f"
    ]
  },
  {
    title: "Renewable Energy Campaign",
    description: "A campaign promoting the use of renewable energy sources to combat climate change and reduce reliance on fossil fuels.",
    image: {
      url: "http://example.com/images/renewable-energy.jpg",
      filename: "renewable-energy.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d1g",
    likes: [
      "64b27d1f8a8b8d8d8d8d8d2h"
    ],
    reviews: [
      "64b27d1f8a8b8d8d8d8d0f"
    ]
  },
  {
    title: "Revolutionary FinTech Solution",
    description: "A fintech solution that has revolutionized the way financial transactions are conducted.",
    image: {
      url: "http://example.com/images/fintech-solution.jpg",
      filename: "fintech-solution.jpg"
    },
    owner: "64b27d1f8a8b8d8d8d8d8d2h",
    likes: [],
    reviews: [
      "64b27d1f8a8b8d8d8d8d0f"
    ]}];
    module.exports = { data: successStories};  
