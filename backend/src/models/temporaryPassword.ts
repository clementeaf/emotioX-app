import mongoose, { Document, Schema } from 'mongoose';

interface TemporaryPassword extends Document {
    email: string;
    temporaryPassword: string;
    createdAt: Date;
}

const TemporaryPasswordSchema = new Schema<TemporaryPassword>({
    email: { type: String, required: true, unique: true },
    temporaryPassword: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '15m' }, // Expira en 15 minutos
});

const TemporaryPasswordModel = mongoose.model<TemporaryPassword>('TemporaryPassword', TemporaryPasswordSchema);

export default TemporaryPasswordModel;
