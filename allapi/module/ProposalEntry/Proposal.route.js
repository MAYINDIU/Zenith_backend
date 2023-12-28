const express = require("express");
const router = express.Router();
const ProposalController = require("./Proposal.controller");

router

  .get("/occupation", ProposalController.getOccupationList)
  .get("/educationList", ProposalController.educationList)
  .get("/all-branch", ProposalController.getAllbranch)
  .get("/country", ProposalController.getCountryList)
  .get("/all-gender", ProposalController.getAllgenderList)
  .get("/all-locallity", ProposalController.getLocallity)
  .get("/all-project", ProposalController.getAllprojectt)
  .get("/chain-list/:base_project/:base_code", ProposalController.getchainList)
  .get("/proposal-info", ProposalController.getProposalInformation)
  .get("/agent-list/:base_project", ProposalController.getAgentList)
  .get("/all-district", ProposalController.getAllDivision)
  .get("/thana-list/:div_code", ProposalController.getThanaList)
  .get("/post-office/:code", ProposalController.getPostofficeList)
  .post("/proposal-entry", ProposalController.InsertProposalDataController);

module.exports = router;
