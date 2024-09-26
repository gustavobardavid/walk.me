import multer from 'multer';
import path from 'path'



export const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve('src/uploads'))
    },
    filename: (req, file, callback) => {
        const id = req.params.id
        callback(null, `${id}_pet_img.jpeg`)
    }
})