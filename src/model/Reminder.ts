import mongoose, { Document, Schema } from 'mongoose';
import { Contest, ContestSchema } from './Contest';

export interface Reminder extends Document {
    userId: mongoose.Types.ObjectId;
    contest: Contest;
}

const ReminderSchema: Schema<Reminder> = new Schema({

    contest: { type: ContestSchema, required: true },
    userId: { type: Schema.Types.ObjectId, required: true }
});

const ReminderModel = (mongoose.models.Reminder as mongoose.Model<Reminder>) || mongoose.model<Reminder>('Reminder', ReminderSchema);
export default ReminderModel;




