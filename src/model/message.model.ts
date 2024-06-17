import mongoose, {Types, PopulatedDoc, Document, Model } from 'mongoose'
import { userDocument } from './user.model';

export interface messageInterface {
  senderId: Types.ObjectId | PopulatedDoc<userDocument>
  receiverId: Types.ObjectId | PopulatedDoc<userDocument>
  content: string
  messageType: 'text' | 'image'
  isSeen: boolean
}
export interface messageDocument extends messageInterface, Document{
  createdAt: Date,
  updatedAt: Date
}

const messageModel = new mongoose.Schema<messageDocument>({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiverId:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content:{
      type: String,
      required: true
    },
    messageType:{
      type: String,
      required: true,
      enum:['text', 'image']
    },
    isSeen:{
      type: Boolean,
      default: false
    }
    
}, {timestamps: true});

export const Message : Model<messageDocument> = mongoose?.models?.Message || mongoose.model('Message', messageModel);