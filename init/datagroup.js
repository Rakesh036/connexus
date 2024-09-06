const groups = [
  {
    "name": "Tech Enthusiasts",
    "description": "A group for technology lovers to share and discuss the latest trends.",
    "motto": "Innovate and Inspire",
    "website": "https://www.techenthusiasts.com",
    "contactEmail": "contact@techenthusiasts.com",
    "members": ["641f1d1f8a7f1c0c7d2b4e3b", "641f1d1f8a7f1c0c7d2b4e3c"],
    "owner": "641f1d1f8a7f1c0c7d2b4e3b",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4e3d"],
    "memberCount": 25
  },
  {
    "name": "Book Club",
    "description": "Join us for monthly book discussions and recommendations.",
    "motto": "Read. Reflect. Discuss.",
    "website": "https://www.bookclub.com",
    "contactEmail": "info@bookclub.com",
    "members": ["641f1d1f8a7f1c0c7d2b4e4b", "641f1d1f8a7f1c0c7d2b4e4c"],
    "owner": "641f1d1f8a7f1c0c7d2b4e4b",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4e4d"],
    "memberCount": 15
  },
  {
    "name": "Fitness Fanatics",
    "description": "For those who are passionate about fitness and health.",
    "motto": "Strength Through Unity",
    "website": "https://www.fitnessfanatics.com",
    "contactEmail": "support@fitnessfanatics.com",
    "members": ["641f1d1f8a7f1c0c7d2b4e5b", "641f1d1f8a7f1c0c7d2b4e5c"],
    "owner": "641f1d1f8a7f1c0c7d2b4e5b",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4e5d"],
    "memberCount": 30
  },
  {
    "name": "Photography Club",
    "description": "Explore the art of photography with like-minded individuals.",
    "motto": "Capture Moments",
    "website": "https://www.photographyclub.com",
    "contactEmail": "info@photographyclub.com",
    "members": ["641f1d1f8a7f1c0c7d2b4e6b", "641f1d1f8a7f1c0c7d2b4e6c"],
    "owner": "641f1d1f8a7f1c0c7d2b4e6b",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4e6d"],
    "memberCount": 20
  },
  {
    "name": "Cooking Enthusiasts",
    "description": "Share recipes and cooking tips with fellow food lovers.",
    "motto": "Cook, Share, Enjoy",
    "website": "https://www.cookingenthusiasts.com",
    "contactEmail": "contact@cookingenthusiasts.com",
    "members": ["641f1d1f8a7f1c0c7d2b4e7b", "641f1d1f8a7f1c0c7d2b4e7c"],
    "owner": "641f1d1f8a7f1c0c7d2b4e7b",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4e7d"],
    "memberCount": 18
  },
  {
    "name": "Travel Explorers",
    "description": "A community for sharing travel experiences and tips.",
    "motto": "Explore the World",
    "website": "https://www.travelexplorers.com",
    "contactEmail": "info@travelexplorers.com",
    "members": ["641f1d1f8a7f1c0c7d2b4e8b", "641f1d1f8a7f1c0c7d2b4e8c"],
    "owner": "641f1d1f8a7f1c0c7d2b4e8b",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4e8d"],
    "memberCount": 22
  },
  {
    "name": "Music Lovers",
    "description": "Connect with others who share a love for music.",
    "motto": "Feel the Music",
    "website": "https://www.musiclovers.com",
    "contactEmail": "contact@musiclovers.com",
    "members": ["641f1d1f8a7f1c0c7d2b4e9b", "641f1d1f8a7f1c0c7d2b4e9c"],
    "owner": "641f1d1f8a7f1c0c7d2b4e9b",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4e9d"],
    "memberCount": 28
  },
  {
    "name": "Gardening Gurus",
    "description": "For those who love gardening and growing plants.",
    "motto": "Grow with Passion",
    "website": "https://www.gardeninggurus.com",
    "contactEmail": "info@gardeninggurus.com",
    "members": ["641f1d1f8a7f1c0c7d2b4eab", "641f1d1f8a7f1c0c7d2b4eac"],
    "owner": "641f1d1f8a7f1c0c7d2b4eab",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4ead"],
    "memberCount": 12
  },
  {
    "name": "Gaming Squad",
    "description": "Join us for gaming sessions and discussions.",
    "motto": "Game On",
    "website": "https://www.gamingsquad.com",
    "contactEmail": "support@gamingsquad.com",
    "members": ["641f1d1f8a7f1c0c7d2b4ebd", "641f1d1f8a7f1c0c7d2b4ebe"],
    "owner": "641f1d1f8a7f1c0c7d2b4ebd",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4ebf"],
    "memberCount": 35
  },
  {
    "name": "Art Aficionados",
    "description": "For those who appreciate and create art.",
    "motto": "Art is Life",
    "website": "https://www.artaficionados.com",
    "contactEmail": "info@artaficionados.com",
    "members": ["641f1d1f8a7f1c0c7d2b4ecb", "641f1d1f8a7f1c0c7d2b4ecc"],
    "owner": "641f1d1f8a7f1c0c7d2b4ecb",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4ecd"],
    "memberCount": 10
  },
  {
    "name": "Entrepreneur Network",
    "description": "Connect with other entrepreneurs and share business ideas.",
    "motto": "Innovate Together",
    "website": "https://www.entrepreneurnetwork.com",
    "contactEmail": "contact@entrepreneurnetwork.com",
    "members": ["641f1d1f8a7f1c0c7d2b4edd", "641f1d1f8a7f1c0c7d2b4ede"],
    "owner": "641f1d1f8a7f1c0c7d2b4edd",
    "quizzes": ["641f1d1f8a7f1c0c7d2b4edf"],
    "memberCount": 45
  },
];

module.exports = { data: groups };
