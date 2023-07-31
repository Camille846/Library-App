import multer from 'fastify-multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp')
  },
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.')[1]
    cb(null, file.fieldname + '-' + Date.now() + `.${extension}`)
  },
})

export const upload = multer({ storage: storage })
