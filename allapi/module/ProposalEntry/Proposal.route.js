const express = require("express");
const router = express.Router();
const ProposalController = require("./Proposal.controller");

router

  .get("/all-branch", ProposalController.getAllbranch)
  .get("/all-project", ProposalController.getAllprojectt)
  .get("/chain-list/:base_project/:base_code", ProposalController.getchainList)
  .get("/proposal-info", ProposalController.getProposalInformation);

module.exports = router;
