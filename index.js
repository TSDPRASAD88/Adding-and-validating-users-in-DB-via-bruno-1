const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
const User = require('./schema.js');
const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcrypt');

const app = express();
const port = 3010;
app.use(express.json());

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
})


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Connected to MongoDB")
}).catch((err)=>{
  console.log(err)
});


app.post('/register', async(req, res)=>{
  const {username, mail, password} = req.body;

  if(!username || !mail || !password){
    return res.status(400).send({message:"Please provide all the details"});
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({username, mail, password:hashedPassword});
    await user.save();
    return res.status(201).send({message:"User registered successfully", user}); 
    
  } catch (error) {
    return res.status(500).send({message:"Internal server error"});
    
  }

})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});