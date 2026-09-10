import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  userid: mongoose.Types.ObjectId;
  title: string;
  text: string;
}

const noteSchema = new Schema<INote>(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "SiteSavedUser",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model<INote>("Note", noteSchema);

export default Note;