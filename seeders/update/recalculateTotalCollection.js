const mongoose = require("mongoose");
const Donation = require("../../models/donation");
const Payment = require("../../models/payment"); // Adjust the path as necessary

async function recalculateDonorAmountsAndTotalCollection(connection) {
  try {
    await connection; // Ensure the connection is established

    // Fetch all donations
    const donations = await Donation.find().populate("donors.user");

    for (const donation of donations) {
      // Initialize a map to hold donor amounts
      const donorAmounts = {};
      console.log("donation: ", donation);

      // Fetch payments for this donation using the payment IDs in the donation document
      const payments = await Payment.find({ _id: { $in: donation.payments } });
      console.log("before payment: ", payments);
      
      // Calculate amounts for each payment and assign to respective donors
      payments.forEach(payment => {
        console.log("payment: ", payment);

        const donorId = payment.donor; // The donor field from the payment
        const amount = payment.amount; // The amount from the payment

        if (donorAmounts[donorId]) {
          donorAmounts[donorId] += amount; // Increment existing donor amount
        } else {
          donorAmounts[donorId] = amount; // Initialize new donor amount
        }
      });

      // Update the donors array and totalCollection
      donation.donors = []; // Clear existing donors to update with new amounts
      let total = 0;

      for (const [userId, amount] of Object.entries(donorAmounts)) {
        donation.donors.push({ user: userId, amount });
        total += amount; // Calculate the new total collection
      }

      donation.totalCollection = total; // Update totalCollection

      // Save updated donation
      await donation.save();
      console.log(`Updated totalCollection for donation "${donation.title}": ${total}`);
    }

    console.log("Recalculation of donor amounts and total collection completed successfully.");
  } catch (error) {
    console.error("Error recalculating donor amounts and total collections:", error);
  }
}

// Export the function
module.exports.recalculateDonorAmountsAndTotalCollection = recalculateDonorAmountsAndTotalCollection;
