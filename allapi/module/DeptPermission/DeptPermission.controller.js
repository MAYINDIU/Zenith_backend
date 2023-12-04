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
    const dept_head_id = req.params.dept_head_id;
    const dept_id = req.params.dept_id;

    DeptPermission.getpermissionList(dept_head_id, dept_id, (err, module_list) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get user data" });
      }
      if (!module_list) {
        return res.status(404).json({ error: "User not found" });
      }

       // Map the dept_head data to the desired format
    const formattedDeptHead = module_list.map((head) => ({
      module_id: head[0],
      module_name: head[1],
      p_read: head[2],
      p_create: head[3],
      p_edit: head[4],
      p_delete: head[5],
      name: head[6],
      dep_name: head[7],
      permitted_by:head[8],
      access_by:head[9],
      
    }));

    res.json({ permission_list: formattedDeptHead });
  });
  




  };


  //permitted desk employee module list personal_id wise
  exports.getdeskmodulelist = (req, res) => {
        const personalId = req.params.id;
      
        // DeptPermission.getdeskpermissionModulelist(personalId, (err, module_list) => {
        //   if (err) {
        //     return res.status(500).json({ error: "Failed to get module data" });
        //   }
      
        //   if (!module_list || module_list.length === 0) {
        //     return res.status(400).json('No Data found');
        //   }
      
        //   // Assuming each inner array represents a module
        //   const formattedModuleList = module_list.map(moduleArray => {
        //     return {
        //       Module_name: moduleArray[0],
        //       Module_id: moduleArray[1],
        //       Previlage_id: moduleArray[2],
        //       Permitted_by: moduleArray[3],
        //     };
        //   });
      
        //   res.json({ module_list: formattedModuleList });
        // });
        DeptPermission.getdeskpermissionModulelist(personalId, (err, module_list) => {
          if (err) {
            return res.status(500).json({ error: "Failed to get user data" });
          }
          if (!module_list) {
            return res.status(404).json({ error: "User not found" });
          }
    
           // Map the dept_head data to the desired format
        const formattedDeptHead = module_list.map((head) => ({
          module_id: head[0],
          module_name: head[1],
          p_read: head[2],
          p_create: head[3],
          p_edit: head[4],
          p_delete: head[5]
        }));
    
        res.json({ module_list: formattedDeptHead });
      });
      
  };

  //privilage list for desk user
  exports.getDeskprivilageList = (req, res) => {
    const module_id = req.params.module_id;
    const dept_id = req.params.dept_id;

    DeptPermission.getDeskuserPrivilageList(module_id, dept_id, (err, module_list) => {
      if (err) {
        return res.status(500).json({ error: "Failed to get user data" });
      }
      if (!module_list) {
        return res.status(404).json({ error: "User not found" });
      }

       // Map the dept_head data to the desired format
    const formattedDeptHead = module_list.map((head) => ({
      personal_id: head[0],
      name: head[1],
      p_read: head[2],
      p_create: head[3],
      p_edit: head[4],
      p_delete: head[5]
    }));

    res.json({ privilage_list: formattedDeptHead });
  });
  




  };


  //getSinglePrivilage by access_by and module id wise
    exports.singlePrevilageDetails = (req, res) => {
      const access_by = req.params.access_by;
      const module_id = req.params.module_id;
  
      DeptPermission.getSinglePrivilage(access_by, module_id, (err, module_list) => {
        if (err) {
          return res.status(500).json({ error: "Failed to get user data" });
        }
        if (!module_list) {
          return res.status(404).json({ error: "User not found" });
        }
  
         // Map the dept_head data to the desired format
      const formattedDeptHead = module_list.map((head) => ({
        module_id: head[0],
        module_name: head[1],
        p_read: head[2],
        p_create: head[3],
        p_edit: head[4],
        p_delete: head[5],
        name: head[6],
        dep_name: head[7],
        permitted_by:head[8],
        access_by:head[9],
        
      }));
  
      res.json({ permission_list: formattedDeptHead });
    });
    
  
  
  
  
    };