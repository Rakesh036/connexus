const successReviews = [
  {
    comment: "This education program has truly changed the lives of many children. A remarkable initiative!",
    createdAt: "2024-09-01T10:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "The tech startup's success is truly inspiring. Their growth and impact are impressive.",
    createdAt: "2024-09-02T11:15:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Green Energy Initiative is a game changer. Their efforts in sustainability are commendable.",
    createdAt: "2024-09-03T12:30:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "This health tech breakthrough has made a significant impact on patient care. Excellent work!",
    createdAt: "2024-09-04T13:45:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "The education technology tool is revolutionary. It has transformed both learning and teaching.",
    createdAt: "2024-09-05T14:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "Social Impact Project has positively influenced many lives. Truly a heartwarming success.",
    createdAt: "2024-09-06T15:15:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "The innovative healthcare solution is groundbreaking. It’s making a huge difference in the field.",
    createdAt: "2024-09-07T16:30:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "AI breakthrough is incredible. It opens up numerous opportunities for various industries.",
    createdAt: "2024-09-08T17:45:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Community Empowerment Program is doing amazing work. It’s empowering people and changing lives.",
    createdAt: "2024-09-09T18:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "The sustainable development initiative is a significant step forward in protecting our environment.",
    createdAt: "2024-09-10T19:15:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Next-Gen Robotics Project is pushing the boundaries of automation. The future looks bright!",
    createdAt: "2024-09-11T20:30:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Renewable Energy Campaign is essential for a sustainable future. Their efforts are greatly appreciated.",
    createdAt: "2024-09-12T21:45:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "The fintech solution is revolutionary and changing the financial landscape significantly.",
    createdAt: "2024-09-13T22:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "An innovative approach to renewable energy is showcased here. It’s truly groundbreaking.",
    createdAt: "2024-09-14T23:15:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "The impact of this success story on the community is evident and commendable.",
    createdAt: "2024-09-15T00:30:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "A fantastic achievement in the field of health tech. It’s transforming patient care.",
    createdAt: "2024-09-16T01:45:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "The education tech tool is a significant advancement. It’s reshaping how education is delivered.",
    createdAt: "2024-09-17T02:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "A truly impactful social project. It’s making a real difference in people’s lives.",
    createdAt: "2024-09-18T03:15:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "The healthcare solution is a major leap forward. It’s improving health outcomes significantly.",
    createdAt: "2024-09-19T04:30:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "AI innovation here is outstanding. It’s paving the way for future advancements in the field.",
    createdAt: "2024-09-20T05:45:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "The community program is empowering individuals and making a huge impact.",
    createdAt: "2024-09-21T07:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Sustainable development efforts are crucial. This initiative is making great strides.",
    createdAt: "2024-09-22T08:15:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "The robotics project is leading the way in automation. It’s a fascinating development.",
    createdAt: "2024-09-23T09:30:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "The renewable energy campaign is vital for our future. Their work is highly valuable.",
    createdAt: "2024-09-24T10:45:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "A game-changing fintech solution that is revolutionizing financial transactions.",
    createdAt: "2024-09-25T12:00:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
  {
    comment: "Innovative approach to renewable energy that promises a greener future.",
    createdAt: "2024-09-26T13:15:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d0f"
  },
  {
    comment: "The social impact project is making waves and contributing positively to the community.",
    createdAt: "2024-09-27T14:30:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d2h"
  },
  {
    comment: "Healthcare advancements showcased here are groundbreaking and transformative.",
    createdAt: "2024-09-28T15:45:00Z",
    author: "64b27d1f8a8b8d8d8d8d8d1g"
  },
];
module.exports = { data:successReviews };