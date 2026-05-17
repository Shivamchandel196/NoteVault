import Note from "../models/noteModel.js";





export const createNote = async(req,res)=>{



    try{

        const { title,content,tags} = req.body;
        const note = await Note.create({
            title,content,tags,user:req.user.id,
        })
        
        return res.status(201).json({
            message:"Note created successfully",
            note,
        })
    }catch(err){
        
        return res.status(500).json({
            message:"Internal server error",
            success:false,
        })
    }

};



export const getAllNotes = async(req,res)=>{
    try{
        const search = req.query.search || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page-1)*limit;

        const notes = await Note.find({
            user:req.user.id,
            $or:[
                {title:{$regex:search,$options:"i"}},
                {content:{$regex:search,$options:"i"}},
                {tags:{$regex:search,$options:"i"}},
            ]
        })
         .sort({ isPinned: -1, createdAt: -1 })
         .skip(skip)
         .limit(limit);

        return res.status(200).json({
            success:true,
            count:notes.length,
            currentPage:page,
            totalPerPage:limit,
            notes
        })

    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
        })
    }
}



export const  getNote = async(req,res)=>{
    try{
        const note = await Note.findOne({
            _id:req.params.id,
            user:req.user.id,
        })

        if(!note){
            return res.status(404).json({
                message:"Note not found",

            })
        }

        return res.status(200).json({
            message:"Note fetched successfully",
            note
            
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}






export const updateNote  =  async(req,res)=>{
    try{
        const {title,content,tags} = req.body;
        const note = await Note.findOneAndUpdate({
            _id:req.params.id,
            user:req.user.id,
        },{
            title,content,tags
        },{new:true})
        if(!note){
            return res.status(404).json({
                message:"Note not found"
            })

        }
        return res.status(200).json({
            message:"note updated successfully",
            note,
        })
    }catch(err){
        return res.status(500).json({
            message:'Internal server error'
        })
    }
}  




export const deleteNote = async(req,res)=>{
    try{
        const note = await Note.findOneAndDelete({
            _id:req.params.id,
            user:req.user.id,
        })
        if(!note){
            return res.status(404).json({
                message:"Note not found"
            })

        }
        return res.status(200).json({
            message:"Note deleted successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
        })
    }
}








export const  pinNote = async(req,res) =>{
    try{

        const note = await Note.findOne({
            _id:req.params.id,
            user:req.user.id,
        })
            if(!note){
                return res.status(404).json({
                    message:"Note Not found"
                })
            }
            note.isPinned = !note.isPinned;
            await note.save();
            return res.status(200).json({
                message:note.isPinned ?"Note Pinned":"Note Unpinned",
                note
            })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}