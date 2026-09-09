import mongoose, { Schema, Document } from "mongoose";

export interface ISite extends Document {
  userid:string;
  name: string;
  url: string;
}

const siteSchema = new Schema<ISite>(
  {
    userid:{
        type:String,
        required: true,
        trim:true
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