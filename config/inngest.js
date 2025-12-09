import { Inngest } from "inngest";
import dbConnect from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "quickcart-next" });

// Create User
export const syncUserCreation = inngest.createFunction(
  { name: "sync.user.creation" },
  { triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await dbConnect();
    await User.create(userData);
  }
);

// Update User
export const syncUserUpdation = inngest.createFunction(
  { name: "sync.user.update" },
  { triggers: [{ event: "clerk/user.updated" }] },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: `${first_name} ${last_name}`,
      imageUrl: image_url,
    };

    await dbConnect();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Delete User
export const syncUserDeletion = inngest.createFunction(
  { name: "sync.user.deletion" },
  { triggers: [{ event: "clerk/user.deleted" }] },
  async ({ event }) => {
    const { id } = event.data;

    await dbConnect();
    await User.findByIdAndDelete(id);
  }
);
