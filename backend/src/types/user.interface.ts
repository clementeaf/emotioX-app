import { Document } from 'mongoose';

/**
 * IUser interface
 * 
 * This interface represents the structure of a user in the application. It defines the required fields
 * for storing user information, including personal details and authentication-related fields.
 */
export interface IUser {
  name: string;                      // User's first name
  lastname: string;                   // User's last name
  email: string;                      // User's email address
  username: string;                   // User's unique username
  password: string;                   // User's hashed password
  createdAt: Date;                    // The date the user was created
  lastUpdate: Date;                   // The date the user's information was last updated
  lastSession: Date | null;           // The date of the user's last session (or null if none)
  resetPasswordToken: string | null;  // Token for password reset (or null if not set)
  resetPasswordExpires: Date | null;  // Expiry date of the reset password token (or null if not set)
  refreshToken: string | null;        // Token for refreshing access (or null if not set)
  refreshTokenExpires: Date | null;   // Expiry date of the refresh token (or null if not set)
  temporaryPassword: string | null;   // Temporal password for account recovery
  temporaryPasswordExpires: Date | null;  // Expiry date for the temporary password
}

/**
 * IUserDocument interface
 * 
 * This interface extends both IUser and Mongoose's Document interface, adding additional Mongoose-specific
 * functionality for working with user documents in the database. It inherits all user fields and methods, 
 * along with Mongoose's `Document` properties.
 */
export interface IUserDocument extends IUser, Document {
  /**
   * Compares the provided password with the user's hashed password
   * @param password - The plain text password to compare
   * @returns A promise that resolves with `true` if the password matches, or `false` otherwise
   */
  comparePassword(password: string): Promise<boolean>;

  /**
   * Generates a token for password reset
   * @returns A promise that resolves with the generated reset token as a string
   */
  generatePasswordResetToken(): Promise<string>;
}
