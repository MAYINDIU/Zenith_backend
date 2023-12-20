const express = require("express");
const router = express.Router();
const ProposalController = require("./Proposal.controller");

router

  .get("/all-branch", ProposalController.getAllbranch)
  .get("/all-project", ProposalController.getAllprojectt)
  .get("/chain-list/:project_id", ProposalController.getchainList);

module.exports = router;
