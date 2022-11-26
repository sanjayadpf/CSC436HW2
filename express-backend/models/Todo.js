import { formatDate } from "./Format.js";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
{
    title: {type: String, required: true},
    description: {type: String, required: true,},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    dateCreated: {type: String, required: true, default:formatDate(new Date(Date.now()))}, 
    checked: {type: Boolean, required: true},
    completed: {type: String, required: true}, 
    username: {type: String, required: true}
}
);

//Export model
module.exports = mongoose.model('Todo', TodoSchema);
