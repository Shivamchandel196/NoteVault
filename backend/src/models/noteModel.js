import mongoose from 'mongoose';


const noteSchema = new mongoose.Schema({
    title:{
        type:String,
    required:[true,"title is required"],
    trim:true,
    },
    content:{
        type:String,
        required:[true,"content is required"],
        trim:true,
    },
    tags:{
        type:[String],
        default:[],

    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    isPinned: {
      type: Boolean,
      default: false,
    }

},{timestamps:true});


const Note = mongoose.model("Note",noteSchema);

export default Note;