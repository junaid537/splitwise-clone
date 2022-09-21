const router = require("express").Router();
const { getOwesByGid } = require("../controllers/oweController");

//const {}

router.get("/:gid",getOwesByGid);

module.exports=router;