import fs from 'fs';
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function removeImage(pathImage) {
    const fullPathImage = path.join(__dirname, '../../', pathImage)
    console.log(fullPathImage)
    fs.unlink(fullPathImage, (err) => {
        if (err) console.log(err)
    })
}

export default removeImage

