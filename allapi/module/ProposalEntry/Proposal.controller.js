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
//Chail list
exports.getchainList = (req, res) => {
  const project_id = req.params.project_id;
  ProposalModule.getchainListbyprojectid(project_id, (err, chain_list) => {
    if (err) {
      return res.status(500).json({ error: "Failed to get module data" });
    }

    if (!chain_list || chain_list.length === 0) {
      return res.status(404).json({ error: "Chain not found" });
    }

    // Assuming each inner array represents a module
    const formattedModuleList = chain_list.map((chainArray) => {
      return {
        desg: chainArray[0],
        name: chainArray[1],
      };
    });

    res.json(formattedModuleList);
  });
};
