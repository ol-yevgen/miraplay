import { Schema, model, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: true, },
    lastName: { type: String, required: true, },
    nickName: { type: String, unique: true, },
    email: { type: String, required: true, unique: true, }, // select: false - to not receive
    password: { type: String, required: true },
})

type User = InferSchemaType<typeof userSchema>;

export default model<User>('User', userSchema)