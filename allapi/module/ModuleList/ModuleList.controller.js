const AllModule = require("./ModuleList.model");


exports.createDATA = (req, res) => {
  const body = req.body;
  console.log(body);

  const insertData = {
    ...body,
  };

  AllModule.create(insertData, (err, INSERTId) => {
    if (err) {
      console.error('Error creating data:', err);
      return res.status(500).json({ error: 'Failed to create data' });
    }

    console.log('Data created successfully with ID:', INSERTId);
    res.status(201).json("Permission Successfully");
  });
};



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

  //id wise sub module list
  exports.getModuleById = (req, res) => {
    const catId = req.params.id;
  
    AllModule.getmoduleListId(catId, (err, module_list) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get module data" });
      }
  
      if (!module_list || module_list.length === 0) {
        return res.status(404).json({ error: "Module not found" });
      }
  
      // Assuming each inner array represents a module
      const formattedModuleList = module_list.map(moduleArray => {
        return {
          Module_id: moduleArray[0],
          Module_name: moduleArray[1],
          Module_view_name: moduleArray[2],
          Created_date: moduleArray[3],
          Created_by: moduleArray[4],
        };
      });
  
      res.json({ sub_module_list: formattedModuleList });
    });
  };
  
  
