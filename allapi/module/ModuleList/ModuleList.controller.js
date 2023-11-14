const AllModule = require("./ModuleList.model");

//all modules list
exports.getAllmodules = (req, res) => {
    AllModule.getAllmodule((err, module) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get module list" });
      }
  
      // Map the dept_head data to the desired format
      const formattedDeptHead = module.map((head) => ({
        module_id: head[0],
        module_name: head[1],
        route: head[2],
        created_date: head[3],
        created_by: head[4],
      }));
  
      res.json({ module_list: formattedDeptHead });
    });
  };
  
