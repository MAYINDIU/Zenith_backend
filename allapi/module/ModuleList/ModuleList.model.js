const connection = require("../../../utils/ConnectOracle");

const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

const dbConfig = {
  user            : "MENU",
  password        : "mayin",
  connectString   : "192.168.3.11/system"
};


const AllModule = {
 //PERMISSION FROM SUPER-ADMIN TO DEPT-HEAD
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

    //user list show by dept head
    getuserlistBydeptheadId: async (moduleId, callback) => {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system"
        });
    
        const result = await con.execute(
          "SELECT * FROM USER_ROLE_DEPT WHERE DEPARTMENT=:moduleId AND ROLE_ID=1",
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


  //department permission list from suoer-admin
  getdeptParmissionlist: (callback) => {
    async function allpermission(){
      let con;
      try{
          con = await oracledb.getConnection({
              user            : "MENU",
              password        : "mayin",
              connectString   : "192.168.3.11/system"
          });
          const data = await con.execute("SELECT * FROM MENU.MODULE_ACCESS ORDER BY INDATE DESC");
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
},

  //count total module list
  getTotalModule: (callback) => {
    async function total_module(){
      let con;
      try{
          con = await oracledb.getConnection({
              user            : "MENU",
              password        : "mayin",
              connectString   : "192.168.3.11/system"
          });
          const data = await con.execute("SELECT COUNT(*) FROM MENU.MODULE_GROUP");
          callback(null, data.rows);
      }catch(err){
          console.error(err);
      }
  }
  total_module();
},


  //DEPT HEAD MODULE LIST FETCH PERSONAL_ID WISE
  getdeptHeadModulelist: async (personalId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system"
      });
  
      const result = await con.execute(
        "SELECT M.MODULE_NAME, M.MODULE_ID FROM MENU.MODULE_ACCESS MA JOIN MENU.MODULES M ON MA.module_id = M.module_id WHERE MA.ACCESS_USER =:personalId",
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

  //previlige list list
  getprevilagelist: (callback) => {
    async function allprevilage(){
      let con;
      try{
          con = await oracledb.getConnection({
              user            : "MENU",
              password        : "mayin",
              connectString   : "192.168.3.11/system"
          });
          const data = await con.execute("SELECT * FROM MENU.PRIVILAGE_LIST");
          callback(null, data.rows);
      }catch(err){
          console.error(err);
      }
  }
  allprevilage();
},


};
  
  module.exports = AllModule;
