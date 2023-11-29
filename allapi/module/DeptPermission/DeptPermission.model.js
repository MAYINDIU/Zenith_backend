const connection = require("../../../utils/ConnectOracle");
const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

const DeptPermission = {
 //PERMISSION FROM DEPT-HEAD TO DESK
 create: async (permissions) => {
  let con;

  try {
    con = await oracledb.getConnection({
      user: "MENU",
      password: "mayin",
      connectString: "192.168.3.11/system"
    });

    const results = [];

    for (const permission of permissions) {
      const { MODULE_ID, ACCESS_BY, PRIVILAGE_ID, PERMITTED_BY } = permission;

      const result = await con.execute(
        `INSERT INTO MODULE_PRIVILAGE (MODULE_ID, ACCESS_BY, PRIVILAGE_ID, PERMITTED_BY)
        VALUES (:MODULE_ID, :ACCESS_BY, :PRIVILAGE_ID, :PERMITTED_BY)`,
        {
          MODULE_ID,
          ACCESS_BY,
          PRIVILAGE_ID,
          PERMITTED_BY,
        },
        { autoCommit: true }
      );

      results.push(result.outBinds);
    }

    return results;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    if (con) {
      try {
        await con.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
},
  

   //PERMISSION LIST BY DEPARTMENT_HEAD
   getpermissionList: async (dept_head_id,dept_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system"
      });
  
      const result = await con.execute(
        "SELECT MODULE_ID,MODULE_NAME,P_READ,P_CREATE,P_EDIT,P_DELETE,NAME,DEP_NAME,PERMITTED_BY FROM MODULE_DETAILS WHERE PERMITTED_BY=:dept_head_id AND DEPARTMENT=:dept_id",
        {
          dept_head_id: dept_head_id,
          dept_id: dept_id
        }
      );
  
      // Assuming you want to return the first row
      const data = result;
      callback(null, data.rows);
    } catch (err) {
      console.error(err);
      callback(err, null);
    } finally {
      if (con) {
        try {
          await con.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  },

    //PRIVILAGE LIST BY DESK USER_ID
     getDeskuserPrivilageList: async (module_id,access_by, callback) => {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system"
        });
    
        const result = await con.execute(
          "SELECT P_READ,P_CREATE,P_EDIT,P_DELETE FROM MODULE_DETAILS  WHERE  MODULE_ID=:module_id AND ACCESS_BY=:access_by",
          {
            module_id: module_id,
            access_by: access_by
          }
        );
    
        // Assuming you want to return the first row
        const data = result;
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
        callback(err, null);
      } finally {
        if (con) {
          try {
            await con.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
    },

    //DESK EMPLOYEE MODULE LIST PERMISSION WISE
    getdeskpermissionModulelist: async (personalId, callback) => {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system"
        });
    
        const result = await con.execute(
          // "SELECT M.MODULE_NAME, M.MODULE_ID,MA.PRIVILAGE_ID,MA.PERMITTED_BY FROM MENU.MODULE_PRIVILAGE MA JOIN MENU.MODULES M ON MA.module_id = M.module_id WHERE MA.ACCESS_BY =:personalId",
         "SELECT MODULE_ID,MODULE_NAME,P_READ,P_CREATE,P_EDIT,P_DELETE FROM MODULE_DETAILS WHERE ACCESS_BY =:personalId",
          [personalId]
        );
    
        // Assuming you want to return the first row
        const data = result;
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
        callback(err, null);
      } finally {
        if (con) {
          try {
            await con.close();
          } catch (err) {
            console.error(err);
          }
        }
      }
    },


};
  
module.exports = DeptPermission;
