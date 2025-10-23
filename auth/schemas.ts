import mongoose from "mongoose";

const UserAuthSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true},
    userName: {type: String, required: true, unique: true},
    roles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Role'}], 
    
}, {timestamps: true})

const RefreshTokenSchema = new mongoose.Schema({
    tokenHash: {type: String, required: true}, 
    expired: {type: Date, required: true}
})

const RoleSchema = new mongoose.Schema({
    role: {type: String, required: true, unique: true}
})



export const RoleModel = mongoose.model('Role', RoleSchema)

export const UserModel = mongoose.model('UserAuth', UserAuthSchema )