const DeptPermission = require("./DeptPermission.model");


exports.createDATA = async (req, res) => {
  const permissions = req.body;

  try {
    const results = await DeptPermission.create(permissions);
    res.status(201).json("Permission Successfully");
  } catch (error) {
    console.error('Error creating permissions:', error);
    res.status(500).json("Already Permitted");
  }

  // DeptPermission.create((err, permissions) => {
  //   if (err) {
  //     console.error('Error creating data:', err);
  //     return res.status(500).json('Already Permitted');
  //   }

  //   console.log('Data created successfully with ID');
  //   res.status(201).json("Permission Successfully");
  // });

};

  //dept_head_id wise list
  exports.getallpermissionList = (req, res) => {
    const dept_head_id = req.params.id;
  
    DeptPermission.getpermissionList(dept_head_id, (err, module_list) => {
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
          Access_by: moduleArray[1],
          Previlage_id: moduleArray[2],
          Permitted_by: moduleArray[3],
          Created_date: moduleArray[4],
        };
      });
  
      res.json({ permission_list: formattedModuleList });
    });
  };


      //permitted desk employee module list personal_id wise
      exports.getdeskmodulelist = (req, res) => {
        const personalId = req.params.id;
      
        DeptPermission.getdeskpermissionModulelist(personalId, (err, module_list) => {
          if (err) {
            return res.status(500).json({ error: "Failed to get module data" });
          }
      
          if (!module_list || module_list.length === 0) {
            return res.status(400).json('No Data found');
          }
      
          // Assuming each inner array represents a module
          const formattedModuleList = module_list.map(moduleArray => {
            return {
              Module_name: moduleArray[0],
              Module_id: moduleArray[1],
              Previlage_id: moduleArray[2],
              Permitted_by: moduleArray[3],
            };
          });
      
          res.json({ module_list: formattedModuleList });
        });
      };