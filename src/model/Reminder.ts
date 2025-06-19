import mongoose, { Document, Schema } from 'mongoose';
import { Contest, ContestSchema } from './Contest';

export interface Reminder extends Document {
    emails: string[];
    contest: Contest;
}

const ReminderSchema: Schema<Reminder> = new Schema({

    contest: { type: ContestSchema, required: true },
    emails: { type: [String], required: true },
});

const ReminderModel = (mongoose.models.Reminder as mongoose.Model<Reminder>) || mongoose.model<Reminder>('Reminder', ReminderSchema);
export default ReminderModel;




