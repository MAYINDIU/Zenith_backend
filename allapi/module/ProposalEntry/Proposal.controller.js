const ProposalModule = require("./Proposal.model");

//all branch list
exports.getAllbranch = (req, res) => {
  ProposalModule.getAllBranch((err, branch) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get branch list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = branch.map((head) => ({
      branch_name: head[0],
      branch_id: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

//all project list
exports.getAllprojectt = (req, res) => {
  ProposalModule.getAllproject((err, branch) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get project list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = branch.map((head) => ({
      project_name: head[0],
      project_code: head[1],
    }));

    res.json(formattedDeptHead);
  });
};
//Chain list
exports.getchainList = (req, res) => {
  const base_project = req.params.base_project;
  const base_code = req.params.base_code;

  ProposalModule.getchainListbyprojectid(
    base_project,
    base_code,
    (err, chain_list) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get module data" });
      }

      if (!chain_list || chain_list.length === 0) {
        return res.status(404).json({ error: "Chain not found" });
      }

      // Assuming each inner array represents a module
      const formattedModuleList = chain_list.map((chainArray) => {
        return {
          chain_name: chainArray[0],
          chain_code: chainArray[1],
          chain_designation: chainArray[2],
        };
      });

      res.json(formattedModuleList);
    }
  );
};

//Proposal infrontation
exports.getProposalInformation = (req, res) => {
  const { proposal_no } = req.query;

  ProposalModule.getProposalInfo(proposal_no, (err, proposal_info) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Failed to get proposal Info data" });
    }

    if (!proposal_info || proposal_info.length === 0) {
      return res.status(404).json({ error: "Proposal Data  not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = proposal_info.map((proposal) => {
      return {
        proposal_no: proposal[0],
        proposal_date: proposal[1],
        risk_date: proposal[2],
        table_id: proposal[3],
        term: proposal[4],
        sum_insure: proposal[5],
        sumatrisk: proposal[6],
        proposer: proposal[7],
        salute: proposal[8],
        address1: proposal[9],
        address2: proposal[10],
        city: proposal[11],
        zip: proposal[12],
        mobile: proposal[13],
        dob: proposal[14],
        age: proposal[15],
        age_p_code: proposal[16],
        fatherhusb: proposal[17],
        sex: proposal[18],
        occupation: proposal[19],
        instmode: proposal[20],
        totalinst: proposal[21],
        instno: proposal[22],
        agent_id: proposal[23],
        pd_code: proposal[24],
        mothers_name: proposal[25],
        fathers_name: proposal[26],
        marital_status: proposal[27],
        nid_number: proposal[28],
      };
    });

    res.json(formattedModuleList);
  });
};

//AGENT LIST
exports.getAgentList = (req, res) => {
  const base_project = req.params.base_project;

  ProposalModule.getAgentList(base_project, (err, agent_list) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get agent list data" });
    }

    if (!agent_list || agent_list.length === 0) {
      return res.status(404).json({ error: "Agent not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = agent_list.map((agentArray) => {
      return {
        agent_name: agentArray[0],
        agent_code: agentArray[1],
      };
    });

    res.json(formattedModuleList);
  });
};

//DIVISION LIST
exports.getAllDivision = (req, res) => {
  ProposalModule.getDivisionList((err, division) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get division list" });
    }

    // Map the dept_head data to the desired format
    const formattedDeptHead = division.map((head) => ({
      division_name: head[0],
      div_code: head[1],
    }));

    res.json(formattedDeptHead);
  });
};

exports.getAgentList = (req, res) => {
  const div_code = req.params.div_code;

  ProposalModule.getThanaList(div_code, (err, thana_list) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get thana list data" });
    }

    if (!thana_list || thana_list.length === 0) {
      return res.status(404).json({ error: "Thana not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = thana_list.map((thanaArray) => {
      return {
        thana_name: thanaArray[0],
        thana_code: thanaArray[1],
      };
    });

    res.json(formattedModuleList);
  });
};

exports.getPostofficeListt = (req, res) => {
  const thana_code = req.params.thana_code;
  console.log(thana_code);

  ProposalModule.getPostOfficeList(thana_code, (err, office_list) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get thana list data" });
    }

    if (!office_list || office_list.length === 0) {
      return res.status(404).json({ error: "Thana not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = office_list.map((thanaArray) => {
      return {
        thana_name: thanaArray[0],
        thana_code: thanaArray[1],
      };
    });

    res.json(formattedModuleList);
  });
};
