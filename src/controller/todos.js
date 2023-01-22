import Todo from "../model/todos.js"
import removeImage from "../libs/images.js"
import mongoose from "mongoose"

const ObjectId = mongoose.Types.ObjectId

const createTodo = async (req, res, next) => {
    const {
        todo,
        status,
        description,
    } = req.body

    const user_id = req.token.id

    let pathImage = ''

    try {
        if (!todo || !status || !description) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'please fill all the required field'
            });
        }

        //when user send the image
        if (req.file) {
            pathImage = req.file.path
        }

        const newTodo = await Todo.create({
            todo,
            status,
            description,
            user_id,
            image: pathImage
        });

        res.status(201).json({
            status: 200,
            message: 'success',
            data: newTodo
        })
    } catch (err) {
        next(err)
    }
}

const getTodo = async (req, res, next) => {
    try {
        const user_id = req.token.id
        let todo = await Todo.aggregate([
            {
                $match: {
                    user_id: mongoose.Types.ObjectId(user_id)
                }
            }
        ])

        res.status(200).json({
            status: 200,
            message: 'success',
            data: todo
        })

    } catch (err) {
        next(err)
    }
}

const getTodoById = async (req, res, next) => {
    const { id } = req.params
    try {
        //check ObjectId is valid
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'todo not found'
            });
        }
        const todo = await Todo.findOne({ _id: id })
        //when id todo is not found
        if (!todo) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'todo not found'
            });
        }
        res.status(200).json({
            status: 200,
            message: 'success',
            data: todo
        })
    } catch (err) {
        next(err)
    }
}

const editTodo = async (req, res, next) => {
    const { id } = req.params
    const {
        todo,
        status,
        description,
    } = req.body
    const user_id = req.token.id

    let pathImage = ''

    try {
        //check ObjectId is valid
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'todo not found'
            });
        }
        //check required field
        if (!todo || !status || !description) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'please fill all the required field'
            });
        }

        const existingTodo = await Todo.findOne({ _id: id })
        //when id todo is not found
        if (!existingTodo) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'todo not found'
            });
        }

        //when image todo is not updated
        if (!req.file) {
            pathImage = existingTodo.image
        }
        //when image todo is updated
        if (req.file) {
            //delete old images
            removeImage(existingTodo.image)
            pathImage = req.file.path
        }

        await Todo.updateOne({ _id: id }, {
            $set: {
                todo,
                status,
                description,
                user_id,
                image: pathImage
            }
        })
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: 'successfully edited todo'
        })
    } catch (err) {
        next(err)
    }
}

const deleteTodo = async (req, res, next) => {
    const { id } = req.params
    try {
        //check ObjectId is valid
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'todo not found'
            });
        }
        const todo = await Todo.findOne({ _id: id })
        //when id todo is not found
        if (!todo) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'todo not found'
            });
        }

        //delete image
        removeImage(todo.image)

        const deletedTodo = await Todo.deleteOne({ _id: id })
        //when no one todo is deleted
        if (deletedTodo.deletedCount === 0) {
            return res.status(400).json({
                status: 400,
                message: 'failed',
                info: 'todo not found'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'success',
            data: 'successfully deleted todo'
        })

    } catch (error) {
        next(err)
    }
}

const todoController = {
    createTodo,
    getTodo,
    getTodoById,
    editTodo,
    deleteTodo,
}

export default todoController