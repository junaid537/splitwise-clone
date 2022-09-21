const { PrismaClient } = require("@prisma/client");
const { group,user,userToGroups,owe } = new PrismaClient();

async function getOwesByGid(req,res,next){
    const gid=parseInt(req.params.gid);
    console.log(gid);
    //const getAllOwes=await;
    let getAllMembersOfgid=await userToGroups.findMany({
        where:{
            groupId:gid
        },
        select:{
            userId:true
        }

    })
    getAllMembersOfgid=getAllMembersOfgid.map((item)=>item.userId)

    console.log("getAllMembersOfgid",getAllMembersOfgid);
    let allOwes=await owe.findMany({
        where :{
            AND:[
                {
                userId1:{
                    in:getAllMembersOfgid,
                }
                },
                {
                    status:{equals:true}        //if status false delete record
                },
                {
                    userId2:{
                        in:getAllMembersOfgid,
                    }
                },
            ]            
        },
        select:{
            userId1:true,
            userId2:true,
            amount:true,
            createdAt:true,
        }

    })

     
    console.log("allOwes",allOwes);
    

    let findNames=await user.findMany({
        where:{
            id:{
                in:getAllMembersOfgid
            }
        },
        select:{
            id:true,
            name:true,
        }
    })
    console.log("findNames",findNames);

    let newAllOwes=allOwes.map((item)=>{
        for(let i=0;i<findNames.length;i++){
            if(findNames[i].id===item.userId1){
                item.userId1=findNames[i].name;
            }
            if(findNames[i].id===item.userId2){
                item.userId2=findNames[i].name;
            }
        }
        return item;
    })
    console.log("newAllOwes",newAllOwes)
    res.status(200).send(newAllOwes);

}
module.exports={getOwesByGid}