import mongoose, { Schema, Model, Document, Types } from 'mongoose';
import { IUser } from '../types/user.interface';

/**
 * IUserDocument interface
 * 
 * This interface extends both the `IUser` interface and Mongoose's `Document`. 
 * It includes custom methods for password comparison and generating a password reset token.
 */
export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId; // Explicitly specify that _id is of type ObjectId
  comparePassword(password: string): Promise<boolean>;
  generatePasswordResetToken(): Promise<string>;
}

/**
 * User schema definition
 */
const UserSchema: Schema<IUserDocument> = new Schema<IUserDocument>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
    match: [/.+\@.+\..+/, 'Invalid email format'],
  },
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
  lastUpdate: { type: Date, default: Date.now },
  lastSession: { type: Date, default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },
  refreshToken: { type: String, default: null },
  refreshTokenExpires: { type: Date, default: null },
  // Nuevo campo para la contraseña temporal y su expiración
  temporaryPassword: { type: String, default: null },
  temporaryPasswordExpires: { type: Date, default: null },
});

/**
 * User model
 */
const User: Model<IUserDocument> = mongoose.model<IUserDocument>('User', UserSchema);
export default User;
