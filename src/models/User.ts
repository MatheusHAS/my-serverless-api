import { Document, Schema, Model, model } from 'mongoose'
import { genSaltSync, hashSync } from 'bcrypt'
import { IUser } from '@/interfaces'
import { IValidatorSchema } from '@/interfaces'

export interface IUserModel extends IUser, Document {}

export interface UserDocument extends IUserModel {}

export interface UserModel extends Model<UserDocument> {}

export const UserValidatorSchema: IValidatorSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', minLength: 6, maxLength: 64 },
        password: { type: 'string', minLength: 4, maxLength: 64 },
      },
      required: ['email', 'password'],
    },
  },
}

export const UserSchema: Schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
})

UserSchema.pre<IUserModel>('save', function (next) {
  if (this.isModified('password')) {
    const salt = genSaltSync(10)
    const hash = hashSync(this.password, salt)
    this.password = hash
  }
  return next()
})

export default model<UserDocument, UserModel>('User', UserSchema)
