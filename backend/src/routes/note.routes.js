import express, { Router } from 'express';
import {createNote,getAllNotes,getNote,updateNote,deleteNote,pinNote} from '../Controllers/Note.controller.js'
import { isAuthenticated } from '../middleware/auth.middlware.js';
import Note from '../models/noteModel.js';
const Noterouter = express.Router();





// /api/notes///////  create note
Noterouter.post('/',isAuthenticated,createNote)

//////api/notes/getall  // yeh api getallUser aur search aur pagination ka kaam kar rahi hai

Noterouter.get('/getall',isAuthenticated,getAllNotes)


////api/notes/get/:id
Noterouter.get('/get/:id',isAuthenticated,getNote)

////////api/notes/update/:id
Noterouter.put('/update/:id',isAuthenticated,updateNote)


////////////api/notes/delete/:id

Noterouter.delete('/delete/:id',isAuthenticated,deleteNote)


///////api/notes/pin/:id
Noterouter.patch('/pin/:id',isAuthenticated,pinNote)
export default Noterouter;