const mongoose = require("mongoose");
const Donation = require("../models/donation");
const User = require("../models/user");
const { validateDonation } = require("../schemas/donationSchema"); // Import validation function
const logger = require("../utils/logger"); // Import logger

const donationData = [
  {
    title: "Support for Education",
    description:
      "A donation to support education for underprivileged children.",
    isEmergency: false,
  },
  {
    title: "Medical Aid",
    description: "Emergency medical aid for a critical case.",
    isEmergency: true,
  },
  {
    title: "Environmental Conservation",
    description: "Funding for a project aimed at environmental conservation.",
    isEmergency: false,
  },
  {
    title: "Support for Local Artisans",
    description:
      "Helping local artisans with financial support to grow their businesses.",
    isEmergency: false,
  },
  {
    title: "Disaster Relief Fund",
    description: "Aid for disaster relief efforts in affected areas.",
    isEmergency: true,
  },
  {
    title: "Wildlife Protection",
    description:
      "Donations for wildlife protection and rehabilitation efforts.",
    isEmergency: false,
  },
  {
    title: "Cancer Treatment Support",
    description: "Providing financial aid to cancer patients for treatment.",
    isEmergency: true,
  },
  {
    title: "Clean Water Initiative",
    description: "Funding to provide clean water in drought-stricken regions.",
    isEmergency: false,
  },
  {
    title: "Food for the Homeless",
    description:
      "A donation to support food distribution to homeless communities.",
    isEmergency: false,
  },
  {
    title: "Flood Relief Support",
    description: "Emergency aid for communities affected by severe flooding.",
    isEmergency: true,
  },
  {
    title: "School Supplies for Children",
    description:
      "Providing school supplies to children in underprivileged areas.",
    isEmergency: false,
  },
  {
    title: "Emergency Housing Aid",
    description: "Emergency funding to provide housing for displaced families.",
    isEmergency: true,
  },
  {
    title: "Solar Power for Villages",
    description: "Helping rural villages get access to solar power.",
    isEmergency: false,
  },
  {
    title: "Emergency Medical Supplies",
    description: "Critical medical supplies for regions in urgent need.",
    isEmergency: true,
  },
  {
    title: "Rebuilding Homes After Disaster",
    description: "Helping rebuild homes destroyed by natural disasters.",
    isEmergency: false,
  },
  {
    title: "Mental Health Support",
    description: "Funding mental health programs for those in need.",
    isEmergency: false,
  },
  {
    title: "Emergency Response Fund",
    description: "Immediate aid for emergency responders in crisis situations.",
    isEmergency: true,
  },
  {
    title: "Animal Shelter Support",
    description:
      "Donations for local animal shelters to care for rescued animals.",
    isEmergency: false,
  },
  {
    title: "Support for COVID-19 Response",
    description:
      "Emergency support for healthcare workers and COVID-19 patients.",
    isEmergency: true,
  },
  {
    title: "Veterans Support Fund",
    description:
      "Helping veterans with financial aid and mental health services.",
    isEmergency: false,
  },
  {
    title: "Hurricane Relief Fund",
    description: "Emergency aid for communities affected by hurricanes.",
    isEmergency: true,
  },
  {
    title: "Scholarships for Girls' Education",
    description:
      "Providing scholarships to girls from marginalized communities.",
    isEmergency: false,
  },
  {
    title: "Firefighter Relief Fund",
    description:
      "Emergency funding for firefighters injured in the line of duty.",
    isEmergency: true,
  },
  {
    title: "Support for Refugees",
    description: "Helping refugees with shelter, food, and basic necessities.",
    isEmergency: false,
  },
  {
    title: "Emergency Rescue Operations",
    description: "Funding emergency rescue operations in disaster zones.",
    isEmergency: true,
  },
  {
    title: "Orphanage Support",
    description:
      "Donations to support orphanages in providing care for children.",
    isEmergency: false,
  },
  {
    title: "Earthquake Relief Efforts",
    description: "Emergency aid for regions affected by earthquakes.",
    isEmergency: true,
  },
  {
    title: "Support for Farmers",
    description:
      "Financial aid to farmers affected by drought and crop failure.",
    isEmergency: false,
  },
  {
    title: "Malaria Treatment Fund",
    description:
      "Providing critical aid for malaria treatment in affected regions.",
    isEmergency: true,
  },
  {
    title: "Women's Empowerment Programs",
    description:
      "Supporting programs that empower women in developing countries.",
    isEmergency: false,
  },
  {
    title: "Typhoon Emergency Relief",
    description: "Emergency relief for communities devastated by typhoons.",
    isEmergency: true,
  },
  {
    title: "Books for Rural Libraries",
    description:
      "Providing books and educational resources to rural libraries.",
    isEmergency: false,
  },
  {
    title: "Emergency Child Nutrition Aid",
    description: "Critical aid for malnourished children in conflict zones.",
    isEmergency: true,
  },
  {
    title: "Reforestation Project",
    description: "Donations to plant trees and support reforestation efforts.",
    isEmergency: false,
  },
  {
    title: "Emergency Earthquake Shelter",
    description: "Providing emergency shelter for earthquake survivors.",
    isEmergency: true,
  },
  {
    title: "LGBTQ+ Support Programs",
    description: "Supporting programs for LGBTQ+ communities in need.",
    isEmergency: false,
  },
  {
    title: "Support for Typhoon Victims",
    description: "Aid for families impacted by a recent typhoon disaster.",
    isEmergency: true,
  },
  {
    title: "Clean Energy Projects",
    description: "Supporting clean energy projects in rural and urban areas.",
    isEmergency: false,
  },
  {
    title: "Flood Relief Emergency Fund",
    description: "Urgent aid for communities hit by heavy flooding.",
    isEmergency: true,
  },
  {
    title: "Support for Child Labor Prevention",
    description:
      "Funding programs to prevent child labor and provide education.",
    isEmergency: false,
  },
  {
    title: "Famine Relief Efforts",
    description: "Emergency food supplies for famine-stricken regions.",
    isEmergency: true,
  },
  {
    title: "Affordable Housing Initiative",
    description:
      "Supporting projects to build affordable housing for low-income families.",
    isEmergency: false,
  },
  {
    title: "Emergency Medical Evacuation",
    description: "Funding emergency medical evacuations in conflict areas.",
    isEmergency: true,
  },
  {
    title: "Water Purification Project",
    description: "Helping provide water purification systems to remote areas.",
    isEmergency: false,
  },
  {
    title: "Support for Disabled Veterans",
    description:
      "Providing financial aid and rehabilitation support to disabled veterans.",
    isEmergency: false,
  },
  {
    title: "Emergency Shelter for Homeless",
    description:
      "Urgent donations to provide emergency shelter for homeless populations during winter.",
    isEmergency: true,
  },
  {
    title: "Vocational Training for Youth",
    description:
      "Funding vocational training programs for underprivileged youth.",
    isEmergency: false,
  },
  {
    title: "Emergency Aid for Flood Victims",
    description: "Urgent support for families displaced by severe floods.",
    isEmergency: true,
  },
  {
    title: "Sanitation and Hygiene Projects",
    description:
      "Supporting projects to improve sanitation and hygiene in rural areas.",
    isEmergency: false,
  },
  {
    title: "Drought Relief Fund",
    description: "Emergency aid for communities affected by severe drought.",
    isEmergency: true,
  },
  {
    title: "Support for War Victims",
    description: "Providing aid to civilians affected by war and conflict.",
    isEmergency: false,
  },
  {
    title: "Tornado Emergency Relief",
    description: "Emergency relief efforts for tornado-stricken areas.",
    isEmergency: true,
  },
  {
    title: "Support for Indigenous Communities",
    description:
      "Donations to support the rights and development of indigenous communities.",
    isEmergency: false,
  },
  {
    title: "Emergency Aid for Wildfire Victims",
    description:
      "Providing emergency shelter and aid for victims of wildfires.",
    isEmergency: true,
  },
  {
    title: "Mental Health Support for Youth",
    description: "Funding mental health services for young people in crisis.",
    isEmergency: false,
  },
  {
    title: "Hurricane Emergency Response Fund",
    description: "Immediate support for hurricane-affected regions.",
    isEmergency: true,
  },
  {
    title: "Support for Clean Cooking Projects",
    description:
      "Funding projects that provide clean cooking stoves to reduce indoor air pollution.",
    isEmergency: false,
  },
  {
    title: "Emergency Pediatric Care",
    description:
      "Providing critical pediatric care in conflict zones and disaster areas.",
    isEmergency: true,
  },
  {
    title: "Housing for Displaced Families",
    description:
      "Building housing for families displaced by natural disasters.",
    isEmergency: false,
  },
  {
    title: "Emergency Relief for Cyclone Victims",
    description: "Immediate relief for victims of a devastating cyclone.",
    isEmergency: true,
  },
  {
    title: "Support for Local Women's Cooperatives",
    description:
      "Helping local women's cooperatives grow and become self-sustaining.",
    isEmergency: false,
  },
  {
    title: "Critical Aid for War Refugees",
    description: "Emergency food and medical supplies for war refugees.",
    isEmergency: true,
  },
  {
    title: "Support for LGBTQ+ Youth Programs",
    description:
      "Funding for programs that provide safe spaces for LGBTQ+ youth.",
    isEmergency: false,
  },
  {
    title: "Earthquake Emergency Relief",
    description: "Critical aid for survivors of a major earthquake.",
    isEmergency: true,
  },
  {
    title: "Small Business Grants for Women",
    description: "Providing grants to women-owned small businesses.",
    isEmergency: false,
  },
  {
    title: "Emergency Flood Shelter Fund",
    description: "Funding to provide shelter for flood victims.",
    isEmergency: true,
  },
  {
    title: "Support for Children's Hospitals",
    description:
      "Helping children's hospitals with funding for new equipment and facilities.",
    isEmergency: false,
  },
  {
    title: "Emergency Response for Landslides",
    description: "Providing aid for communities affected by landslides.",
    isEmergency: true,
  },
  {
    title: "Support for Renewable Energy Projects",
    description:
      "Donations for renewable energy projects in developing countries.",
    isEmergency: false,
  },
  {
    title: "Emergency Supplies for Disaster Victims",
    description:
      "Urgent donations to provide emergency supplies for disaster victims.",
    isEmergency: true,
  },
  {
    title: "Support for Clean Ocean Initiatives",
    description:
      "Funding projects aimed at reducing ocean pollution and plastic waste.",
    isEmergency: false,
  },
  {
    title: "Tsunami Emergency Relief Fund",
    description: "Immediate support for victims of a devastating tsunami.",
    isEmergency: true,
  },
  {
    title: "Support for Farmers Affected by Climate Change",
    description: "Helping farmers adapt to the challenges of climate change.",
    isEmergency: false,
  },
  {
    title: "Emergency Evacuation for War Zones",
    description:
      "Funding emergency evacuations for civilians trapped in war zones.",
    isEmergency: true,
  },
  {
    title: "Support for Animal Rescue Organizations",
    description:
      "Helping animal rescue organizations care for abandoned and injured animals.",
    isEmergency: false,
  },
  {
    title: "Emergency Support for Cyclone Survivors",
    description: "Urgent relief for survivors of a recent cyclone disaster.",
    isEmergency: true,
  },
  {
    title: "Support for Early Childhood Education Programs",
    description:
      "Funding programs that provide early education to children in need.",
    isEmergency: false,
  },
  {
    title: "Critical Medical Supplies for Disaster Zones",
    description:
      "Urgent medical supplies for regions hit by natural disasters.",
    isEmergency: true,
  },
  {
    title: "Support for Sustainable Agriculture",
    description:
      "Helping farmers adopt sustainable agriculture practices to improve crop yield.",
    isEmergency: false,
  },
  {
    title: "Emergency Fire Relief Fund",
    description: "Immediate relief for communities affected by wildfires.",
    isEmergency: true,
  },
  {
    title: "Support for Rural Healthcare",
    description:
      "Providing financial aid to rural healthcare clinics and programs.",
    isEmergency: false,
  },
  {
    title: "Emergency Drought Relief",
    description:
      "Providing immediate water supplies to drought-stricken areas.",
    isEmergency: true,
  },
  {
    title: "Support for Educational Technology in Schools",
    description:
      "Funding for educational technology programs in underfunded schools.",
    isEmergency: false,
  },
  {
    title: "Emergency Response for Monsoon Floods",
    description: "Urgent relief for communities impacted by monsoon floods.",
    isEmergency: true,
  },
  {
    title: "Support for Food Security Programs",
    description:
      "Funding programs that ensure food security in developing countries.",
    isEmergency: false,
  },
];

async function donationSeeder() {
  try {
    // Clear existing donations
    await Donation.deleteMany({});
    logger.info("Existing donations cleared.");

    // Fetch all user IDs
    const users = await User.find({});
    const userIds = users.map((user) => user._id);

    for (const donation of donationData) {
      // Validate the donation data
      try {
        validateDonation(donation);
      } catch (validationError) {
        logger.error(`Failed to validate donation: ${validationError.message}`);
        continue; // Skip this donation and move to the next one
      }

      // Pick a random user ID
      donation.owner = userIds[Math.floor(Math.random() * userIds.length)];

      // Create the donation
      const newDonation = await Donation.create(donation);
      logger.info(`Donation "${donation.title}" added.`);

      // Update the user's donations array
      await User.findByIdAndUpdate(donation.owner, {
        $push: { donations: newDonation._id },
      });
      logger.info(`User "${donation.owner}" updated with new donation.`);
    }

    logger.info("Donation data seeded successfully!");
  } catch (error) {
    logger.error("Error seeding donation data:", error);
  }
}

module.exports = donationSeeder;
