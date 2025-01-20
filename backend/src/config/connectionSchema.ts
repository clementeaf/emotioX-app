import mongoose, { Schema, Document } from "mongoose";

export interface IConnection extends Document {
  connectionId: string;
  connectedAt: Date;
}

const ConnectionSchema: Schema<IConnection> = new mongoose.Schema<IConnection>({
  connectionId: { type: String, required: true, unique: true },
  connectedAt: { type: Date, default: Date.now },
});

const Connection =
  mongoose.models.Connection || mongoose.model<IConnection>("Connection", ConnectionSchema);

export default Connection;