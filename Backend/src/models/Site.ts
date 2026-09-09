import mongoose, { Schema, Document } from "mongoose";

export interface ISite extends Document {
  userid: mongoose.Types.ObjectId;
  name: string;
  url: string;
}

const siteSchema = new Schema<ISite>(
  {
    userid: {
      type: Schema.Types.ObjectId,
      ref: "SiteSavedUser",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Site = mongoose.model<ISite>("Site", siteSchema);

export default Site;