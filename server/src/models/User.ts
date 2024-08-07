import mongoose from "mongoose"

interface IUserSchema {
    username: string
    email: string
    password: string
    picture: string
    savedCodes: Array<mongoose.Types.ObjectId>
}

const UserSchema = new mongoose.Schema<IUserSchema>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            trim: true,
        },
        picture: {
            type: String,
            default: "https://www.shareicon.net/data/128x128/2016/01/24/708382_people_512x512.png"
        },
        savedCodes: [{
            type: mongoose.Schema.Types.ObjectId
        }]
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
