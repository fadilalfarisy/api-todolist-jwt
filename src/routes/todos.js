import express from "express"
import multer from "multer"
import todoController from '../controller/todos.js'
import auth from "../middleware/authorization.js"

//config images storage
const storage = multer.diskStorage({
    //path images storage
    destination: (req, file, cb) => {
        cb(null, './public/images')
    },
    //named the image file
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

//allow image with format jpeg, jpg, or png only
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage, fileFilter })

const todo = express.Router()

todo.get('/todo/', auth, todoController.getTodo)
todo.get('/todo/:id', auth, todoController.getTodoById)
todo.post('/todo', auth, upload.single('image_todo'), todoController.createTodo)
todo.put('/todo/:id', auth, upload.single('image_todo'), todoController.editTodo)
todo.delete('/todo/:id', auth, todoController.deleteTodo)

export default todo