const connection = require("../../../utils/ConnectOracle");

const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

//MAIN MODULE LIST
const AllModule = {
  create: (orders_two, callback) => {
    connection.query(
      "INSERT INTO MENU.MODULE_ACCESS SET ?",
      orders_two,
      (err, result) => {
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, result.insertId);
      }
    );
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

};
  
  module.exports = AllModule;
