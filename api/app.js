const express = require('express')
const { sequelize, User} = require('./models')

const app = express()
const multer = require("multer");
app.use(express.json())
const db = require("./models");
console.log(db)
const fs = require("fs");
const csv = require("fast-csv");
const upload = multer({ dest:"./public"});


app.post('/users', async (req, res) => {
  const { firstname, lastname,email} = req.body

  try {
    const user = await User.create({ firstname,lastname, email})

    return res.json(user)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})



  
app.post("/upload", upload.single("file"), async (req, res) => {
  try {    
    if (req.file && req.file.mimetype.includes("csv")) {
      const user = [];

        fs.createReadStream(req.file.filename)
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error);
                throw error.message;
            })
            .on('data', row => {
                user.push(row);
                console.log(row);
            })
            .on('end', () => {
               
                User.bulkCreate(user).then(() => {
                    const result = {
                        status: "ok",
                        filename: req.file.originalname,
                        message: "Upload Successfully!",
                    }
    
                    res.json(result);
                });    
      });
      res.send({
        status: true,
        message: "File Uploaded!",
      });
    }
    else {
      res.status(400).send({
        status: false,
        data: "File Not Found :(",
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});





app.listen({port : 5000}, async() =>{
  await sequelize.sync()
  console.log("Server is running");
})
