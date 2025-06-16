import mongoose, { Document, Schema } from 'mongoose';


export interface Contest extends Document {
    code: string;
    platform: string;
    name: string;
    startTime: Date;
    endTime: Date;
    duration: number;
    url: string;
}

const ContestSchema: Schema<Contest> = new Schema({
    code: { type: String, required: true },
    platform: { type: String, required: true },
    name: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    duration: { type: Number, required: true },
    url: { type: String, required: true },

});

const ContestModel = (mongoose.models.Contest as mongoose.Model<Contest>) || mongoose.model<Contest>('Contest', ContestSchema);
export default ContestModel;

