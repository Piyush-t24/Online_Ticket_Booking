const slotting = require("../services/slotting");
const cron = require("node-cron");
const venueModel = require("../db/models/venueModel");

const autoGenerateSlots = async () => {
  try {
    console.log("Generating slots...");
    const maxCapacity = 200;
    const elasticCapacity = 50;
    const dateTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });

    // Convert the string back to a Date object
    const istDate = new Date(dateTime);

    // Format to YYYY-MM-DD
    const date = istDate.toISOString().split("T")[0];
    const museums = await venueModel.find({}, "_id workingHours");

    for (const museum of museums) {
      const { opening, closing } = museum.workingHours;
      const openTime = opening.hour;
      const closeTime = closing.hour >= 12 ? closing.hour : closing.hour + 12;

      const slotDuration = museum.slotDuration || 120; // Default to 60 minutes

      var startTime = openTime;
      var endTime = openTime + slotDuration / 60;

      while (endTime <= closeTime) {
        const slots = {
          startTime: { hour: startTime, minute: 0 },
          endTime: { hour: endTime, minute: 0 },
        };
        const slot = {
          venueId: museum._id,
          date,
          slots,
          maxCapacity,
          elasticCapacity,
        };
        await slotting.createSlot(slot);
        startTime = endTime;
        endTime = startTime + slotDuration / 60;
      }
    }

    console.log("Slots generated successfully");
    return true;
  } catch (error) {
    console.error("Error generating slots:", error);
    return 0;
  }
};

cron.schedule(
  "10 0 * * *", // Cron expression for midnight
  async () => {
    console.log("Running autoGenerateSlots task at midnight (IST)...");
    try {
      if (process.env.NODE_ENV === "production") {
        await autoGenerateSlots();
        console.log("Slots generated successfully");
      } else {
        console.log("Slots not generated in development mode");
      }
    } catch (error) {
      console.error("Error generating slots:", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Set timezone to IST
  }
);
