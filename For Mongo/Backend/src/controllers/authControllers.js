const User = require("./../schema/userModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const obj = req.body;

    const user = await User.findOne({ name: obj.name });
    if(user){
        const match = await bcrypt.compare(obj.password, user.password);
        if(match){
            res.status(200).send({message: "login is succuss", data: user});
        }else{
            res.status(401).send({message: "Sifre yanlisdir"});
        }
    }else{
        res.status(404).send({message: "user yoxdur"});
    }
  
}

const register = async (req, res) => {
    const obj = req.body;

    obj.id = uuidv4();
    const hashPass = await bcrypt.hash(obj.password, 10)
    console.log(hashPass);
  
    const user = await new User({ 
        id: obj.id,
        name: obj.name,
        password: hashPass,
     });
  
    await user.save();
    // const data = await User.find();
  
    res.status(200).send({ message: "qeydiyyat ugurla bitdi" });
}

module.exports = {login, register}