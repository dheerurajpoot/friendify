import mongoose, { Model, Types } from 'mongoose';
import { Document } from 'mongoose';

export interface chatInterface{
  chatUsers: Types.ObjectId[]
  message: Types.ObjectId[]
}
export interface chatDocument extends chatInterface, Document{
  createdAt: Date,
  updatedAt: Date
}

const chatModel = new mongoose.Schema<chatDocument>({
    chatUsers:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
    ],
    message: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
      }
    ]
}, {timestamps: true});

export const Chat : Model<chatDocument> = mongoose?.models?.Chat || mongoose.model('Chat', chatModel);