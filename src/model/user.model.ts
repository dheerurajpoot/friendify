import mongoose, { Document, Model } from 'mongoose'

export interface userInterface{
  name: string,
  username: string,
  email: string,
  profilepic: string,
  password: string
}
export interface userDocument extends userInterface, Document{
  createdAt: Date,
  updatedAt: Date
}

const userModel = new mongoose.Schema<userDocument>({
    name:{
        type:String,
    },
    username:{
        type:String,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profilepic:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
}, {timestamps:true});

export const User : Model<userDocument> = mongoose?.models?.User || mongoose.model('User', userModel);