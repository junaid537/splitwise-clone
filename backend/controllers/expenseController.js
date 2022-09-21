
const { PrismaClient } = require("@prisma/client");

//const { objectEnumValues } = require("@prisma/client/runtime");
const { group,user,userToGroups,expense,owe } = new PrismaClient();
async function createExpense(req,res,next){                          /////////////

    let {name,amount,people,Payer,distribution,eachPersonOwes,image}=req.body;
    amount=parseInt(amount)
    const gid=parseInt(req.params.gid);
    console.log("payer is",Payer,"eachPersonOwes",eachPersonOwes)
    //Find payer  Userid
    const getPayerId=Payer.id;
    //Create expense row
     //creating  row in expense table
    const expense1=await expense.create({
        data:{
            description:name,
            splitCategory:distribution,
            total_amt:amount,
            userId:getPayerId,
            groupId:gid,
            status:true,

        }
    })

    let owerIdAndAmount=[]
    for(prop in eachPersonOwes){
        if(eachPersonOwes[prop]===0 || parseInt(prop)===Payer.id){
            delete eachPersonOwes[prop];
        }
        else{
            owerIdAndAmount=[...owerIdAndAmount,{"id":parseInt(prop),"amount":eachPersonOwes[prop]}]

        }
    }
    getAllUserIds=Object.keys(eachPersonOwes);
    getAllUserIds=getAllUserIds.map((item)=>parseInt(item))
    console.log("getAllUserIds",getAllUserIds);
  
    console.log("owerIdAndAmount",owerIdAndAmount);
    //console.log("people",people);
    //find contributors id , using people (contributors is diff, bcas a person can contribute 0)
    

    //people=people.map((item)=>item.id)
    

    //get all owers belonging to gid
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

    //get all old owes of ppl participating in this expense
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
        }

    })
    console.log(" allOwes ",allOwes)

    //After getting all owes , now new expense owes are distributed among participants

 console.log("Payer.id",Payer.id);
owerIdAndAmount.forEach((item)=>{
    let flag=0;
    for(let i=0;i<allOwes.length;i++){
        if(item.id===allOwes[i].userId1 && allOwes[i].userId2===Payer.id)  ////Add new expense owes to existing owes
       {
        allOwes[i].amount+=item.amount;
        flag=1;
        break; 
       }
         
    }
    if(flag===0){
        allOwes=[...allOwes,{"userId1":item.id,"userId2":Payer.id,"amount":item.amount}]
    }

})


console.log("new allOwes",allOwes);



//LOGIC TO SIMPLIFY DEBTS
    
    //const persons=3;

    let ans=[]
    const getMin=(arr)=>{
        const min = Math.min(...arr);
        const index = arr.indexOf(min);
        return index;
    }
    const getMax=(arr)=>{
        const max = Math.max(...arr);
        const index = arr.indexOf(max);
        return index;
    }
    const minCashFlowRec=(amount)=>
    {
        const mxCredit = getMax(amount);
        const mxDebit = getMin(amount);
    
        if (amount[mxCredit] == 0 && amount[mxDebit] == 0)
            return;
    
        const min= -amount[mxDebit]< amount[mxCredit] ?-amount[mxDebit]:amount[mxCredit]
        amount[mxCredit] -= min;
        amount[mxDebit] += min;
        console.log("ANSWER : person",mxDebit, "pays",min,"$","to",mxCredit);
        ans.push([mxDebit,mxCredit,min])
        minCashFlowRec(amount);
    }

    const minCashFlow=(graph,N)=>
    {
    let amount = new Array(N).fill(0);

        for (let p=0; p<N; p++)
        for (let i=0; i<N; i++)
            amount[p] += (graph[i][p] -  graph[p][i]);
    
        console.log("amount",amount)
        minCashFlowRec(amount);
    }

    let involvedPeople=[];

    allOwes.forEach((item)=>{
        involvedPeople.push(item.userId1);
        involvedPeople.push(item.userId2);
    })
    involvedPeople = [...new Set(involvedPeople)];


    let graph1=[]
    let subarr=[]
    for(let i=0;i<involvedPeople.length;i++){
        subarr = new Array(involvedPeople.length).fill(0);
        console.log("subarr",subarr)
        graph1.push(subarr)
    }
    console.log("old graph1",graph1)


    let p=[]
    let q=[]
    allOwes.forEach((item)=>{
        q.push([item.userId1,item.userId2,item.amount])
        p.push(item.userId1);
        p.push(item.userId2);
    })
    p = [...new Set(p)];

    console.log("p ",p)//map userids to index of graph
    console.log("old q",q);

    for(i=0;i<q.length;i++){
        q[i][0]=p.indexOf(q[i][0]);
        q[i][1]=p.indexOf(q[i][1]);
        graph1[q[i][0]][q[i][1]]=q[i][2];
    }
    //console.log("reference",reference)
    console.log("new q",q);
    console.log("new graph1",graph1)

    //filling into graph
    let N =graph1.length;
    minCashFlow(graph1,N);

    //    ans.push([mxDebit,min,mxCredit])
    console.log("old anser",ans)

    let newAns=[];
    newAns=ans.map((item)=>{
        item[0]=p[item[0]];
        item[1]=p[item[1]];
        //Line 174,175 says "he"  pa ""
        return item;
    })
    console.log("new anser",newAns)

    //get the expense id of this expense

    const expenseId= await expense.findFirst({
        where:{
                description:name,
                splitCategory:distribution,
                total_amt:amount,
                userId:getPayerId,
                groupId:gid

        },
        select: {id:true},
    })

    //delete the old owes
    let deleteOldOwes=await owe.deleteMany({
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
    })
    //insert the new simplified owes
    let finalOwes=[]
    for(let j=0;j<newAns.length;j++){
        finalOwes=[...finalOwes,{"userId1":newAns[j][0],"userId2":newAns[j][1],"amount": newAns[j][2],status:true}]
    }
    console.log("newAns",finalOwes);

    const  createNewOwes= await owe.createMany({
            data:finalOwes,
    })

        
        res.send("hello")
        //res.status(200).send(getPayerId)
    }

module.exports={createExpense}

//COMMENTS
//----------------------------------------------------------------------------------------------
