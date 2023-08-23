/* eslint-disable no-useless-escape */
import multer from 'multer'
import crypto from 'crypto'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const ext_patt = /\.([0-9a-z]+)(?:[\?#]|$)/i
    const ext_exec = file.originalname.match(ext_patt)
    let ext = ''
    if (ext_exec && ext_exec.length > 1) {
      ext = ext_exec[1]
    }

    cb(null, `${crypto.randomUUID()}${ext ? '.' + ext : ''}`)
  }
})

export const upload = multer({ storage: storage })
