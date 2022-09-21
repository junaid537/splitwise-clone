const router = require("express").Router();
const {createGroup,getAllGroups,getMembersOfAGroup}=require("../controllers/groupController");



router.post("/",createGroup);
router.get("/",getAllGroups);
router.get("/:gid",getMembersOfAGroup)
//get all groups to which user with req.email belongs to (from userToGroups)

module.exports=router;