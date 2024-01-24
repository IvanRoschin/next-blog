import { Schema, model, models } from "mongoose";

const MessagesSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  name: {
    type: String,
    required: [true, "Name is required!"],
    match: [
      /^[a-zA-Zа-яА-ЯіІїЇґҐ]+(?: [a-zA-Zа-яА-ЯіІїЇґҐ]+)*$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  text: {
    type: String,
    required: [true, "Message is required!"],
  },
  phone: {
    type: Number,
  },
});

const Messages = models.Messages || model("Messages", MessagesSchema);

export default Messages;
