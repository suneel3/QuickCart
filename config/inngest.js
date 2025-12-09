import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// 1️⃣ Create User
export const syncUserCreation = inngest.createFunction(
  {
    name: "sync.user.creation",         // ✅ REQUIRED
  },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,   // ✅ FIXED
      imageUrl: image_url,
    };

    await dbConnect();
    await User.create(userData);
  }
);

// 2️⃣ Update User
export const syncUserUpdation = inngest.createFunction(
  {
    name: "sync.user.update",          // ✅ REQUIRED
  },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,   // ✅ FIXED
      imageUrl: image_url,
    };

    await dbConnect();
    await User.findByIdAndUpdate(id, userData);
  }
);

// 3️⃣ Delete User
export const syncUserDeletion = inngest.createFunction(
  {
    name: "sync.user.deletion",        // ✅ REQUIRED
  },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;

    await dbConnect();
    await User.findByIdAndDelete(id);
  }
);
