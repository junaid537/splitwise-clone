const { PrismaClient } = require("@prisma/client");
const { user } = new PrismaClient();

async function createUser(req,res,next){
const email=req.email;
const name=req.name;

const userExists=await user.findUnique({
    where:{
        email
    }
})

if(userExists){
    return res.status(400).json({
        msg: "user already exists",
      });
}

const newUser = await user.create({
    data: {
        name,
        email,
    }
  });
  res.status(200).json(newUser);

}
module.exports={createUser};