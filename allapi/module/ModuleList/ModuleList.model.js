const connection = require("../../../utils/ConnectOracle");

const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

const dbConfig = {
  user            : "MENU",
  password        : "mayin",
  connectString   : "192.168.3.11/system"
};

//MAIN MODULE LIST
const AllModule = {
  create: async (insertData, callback) => {
    let con;
    
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system"
      });
      
      const { MODULE_ID, ACCESS_USER,PERMITTED_BY } = insertData;
  
      const result = await con.execute(
        "INSERT INTO MENU.MODULE_ACCESS (MODULE_ID, ACCESS_USER,PERMITTED_BY) VALUES (:MODULE_ID, :ACCESS_USER,:PERMITTED_BY)",
        {
          MODULE_ID: MODULE_ID,
          ACCESS_USER: ACCESS_USER,
          PERMITTED_BY:PERMITTED_BY
        },
        { autoCommit: true }
      );
  
      callback(null, result.outBinds);
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


    getAllmodule: (callback) => {
      async function allmodule(){
        let con;
        try{
            con = await oracledb.getConnection({
                user            : "MENU",
                password        : "mayin",
                connectString   : "192.168.3.11/system"
            });
            const data = await con.execute("SELECT * FROM MENU.MODULE_GROUP");
            callback(null, data.rows);
        }catch(err){
            console.error(err);
        }
    }
    allmodule();
  },

  //SUB MODULE LIST
  getmoduleListId: async (catId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system"
      });
  
      const result = await con.execute(
        "SELECT * FROM MENU.MODULES WHERE GROUP_ID=:catId",
        [catId]
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

  //department list show by moduleid
  getdeptListByModuleId: async (moduleId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system"
      });
  
      const result = await con.execute(
        "SELECT ACCESS_USER FROM MENU.MODULE_ACCESS WHERE MODULE_ID=:moduleId",
        [moduleId]
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

  //department permission list
  getdeptParmissionlist: (callback) => {
    async function allpermission(){
      let con;
      try{
          con = await oracledb.getConnection({
              user            : "MENU",
              password        : "mayin",
              connectString   : "192.168.3.11/system"
          });
          const data = await con.execute("SELECT * FROM MENU.MODULE_ACCESS");
          callback(null, data.rows);
      }catch(err){
          console.error(err);
      }
  }
  allpermission();
},

  //total user list
  getTotaluserlist: (callback) => {
    async function total_user(){
      let con;
      try{
          con = await oracledb.getConnection({
              user            : "MENU",
              password        : "mayin",
              connectString   : "192.168.3.11/system"
          });
          const data = await con.execute("SELECT COUNT(*) AS TOTAL_USER FROM MENU.MODULE_ACCESS  WHERE ACCESS_STAT='Y'");
          callback(null, data.rows);
      }catch(err){
          console.error(err);
      }
  }
  total_user();
}




};
  
  module.exports = AllModule;
