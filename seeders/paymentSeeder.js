const mongoose = require("mongoose");
const Payment = require("../models/payment");
const Donation = require("../models/donation");
const User = require("../models/user");

const paymentData = [
  {
    fullName: "Alice Johnson",
    email: "alice.johnson@example.com",
    amount: 100,
    paymentMethod: "Credit Card",
    cardNumber: "1234",
    expiryDate: "12/25",
  },
  {
    fullName: "Bob Brown",
    email: "bob.brown@example.com",
    amount: 250,
    paymentMethod: "UPI",
    upiId: "bob.brown@upi",
  },
  {
    fullName: "Charlie Smith",
    email: "charlie.smith@example.com",
    amount: 500,
    paymentMethod: "Debit Card",
    cardNumber: "5678",
    expiryDate: "11/24",
  },
  // Add more payment entries as needed
];

async function paymentSeeder() {
  try {
    // Clear existing payments
    await Payment.deleteMany({});
    console.log("Existing payments cleared.");

    // Fetch all donations
    const donations = await Donation.find({});
    const donationTitles = donations.map(donation => donation.title);

    for (const payment of paymentData) {
      // Pick a random donation title
      const randomDonationTitle = donationTitles[Math.floor(Math.random() * donationTitles.length)];

      // Add the random donation title to the payment data
      payment.donationTitle = randomDonationTitle;

      // Create the payment
      await Payment.create(payment);
      console.log(`Payment for donation "${payment.donationTitle}" added.`);
    }

    console.log("Payment data seeded successfully!");
  } catch (error) {
    console.error("Error seeding payment data:", error);
  }
}

module.exports = paymentSeeder;
