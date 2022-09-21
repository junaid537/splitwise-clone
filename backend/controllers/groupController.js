const { PrismaClient } = require("@prisma/client");
const { group,user,userToGroups } = new PrismaClient();

async function createGroup(req,res,next){
    const email=req.email;
    let {name,users}=req.body;

    console.log("email is ",req.email);
    //console.log(users,users);
    const names=users.map((item)=>item.name)
    console.log(names,"names")
    
    const userid= await user.findFirst({
        where:{email},
        select:{id:true},
    })
    //creatorId
    const creatorId=userid.id;

    const groupExists=await group.findFirst({
        where:{name},
    })
    if(groupExists){
        console.log("Group already exist");
        return res.status(400).json({
            msg: "group already exists",
          });
    }
    const newGroup=await group.create({
        data:{
            name,
            creatorId,
        }
    })
    //get groupid
    const grpid=await group.findFirst({
        where:{name},
        select:{id:true},
    })

    //grpid.id
    const addMembersInUser=await user.createMany({
        data:users,
        skipDuplicates:true,
        //users[]
    })
    console.log("addMembersInUser",addMembersInUser);

    
    let getAlluserIds=await user.findMany({
        where:{
            name:{
                in: names,
            },
        },
        select:{id:true}

    })
    console.log("getAlluserIds",getAlluserIds);

    getAlluserIds = getAlluserIds.map(({
        id: userId,
        ...rest
      }) => ({
        userId,
        groupId:grpid.id,
        ...rest
      }));
      console.log("getAlluserIds",getAlluserIds);
    //adding the group creator to userToGroups
    getAlluserIds.push({userId:creatorId,groupId:grpid.id});
    const addMembersInUserToGroups=await userToGroups.createMany({
        data:getAlluserIds,
        skipDuplicates: true,
    })
    console.log("createGroup",createGroup);
    res.status(200).json(addMembersInUserToGroups)
    //Now get all of their ids


}

async function getAllGroups(req,res,next){
    const email=req.email;
    //get uid for req.email
    const uid=await user.findFirst({
        where:{email},
        select:{id:true},
    })
    console.log(uid);
    //get all groups for which this user belongs to
    let getAllGids=await userToGroups.findMany({
        where:{
            userId:uid.id,
        },
        select:{
            groupId:true
        }
    })
    console.log(getAllGids);
    let newgetAllGids=getAllGids.map((item)=>item.groupId)
    console.log(newgetAllGids);
   //get all names of groups in  newgetAllGids
    const grpNames=await group.findMany({
        where:{
            id:{
                in:newgetAllGids
            }
        },
        select:{
            name:true,
            id:true
        }
    })

    res.status(200).json(grpNames);

}

async function getMembersOfAGroup(req,res,next){
const gid=parseInt(req.params.gid);
console.log("gid",gid);
let userid=await userToGroups.findMany({
    where:{
        groupId:gid
    },
    select:{
        userId:true,
    }

})
console.log(userid);
userid=userid.map((item)=>item.userId);
let userNames=await user.findMany({
    where:{
        id:{
            in:userid
        }
    },
    select:{
        id:true,
        name:true,
        email:true,

    }

})
//find out the creator from this array of 'userid'
console.log("gid check",gid)
let creatorid=await group.findFirst({
    where:{
            id:gid
        },
    select:{creatorId:true},
})
console.log(creatorid)
//find name of this creatorid
let creatorName=await user.findFirst({
    where:{
        id:creatorid.creatorId
    },
    select:{
        id:true,
        name:true,
        email:true
    }
})
console.log("creator is",creatorName)
console.log(userNames)

userNames=userNames.map((item)=>{if (item.name===creatorName.name)return {...item,name:"You"} ;return item });
console.log(userNames)
res.status(200).send(userNames);
}


module.exports={createGroup,getAllGroups,getMembersOfAGroup};