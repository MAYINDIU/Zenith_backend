const connection = require("../../../utils/ConnectOracle");
const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

const AllModule = {
    getAllmodule: (callback) => {
      async function allmodule(){
        let con;
        try{
            con = await oracledb.getConnection({
                user            : "MENU",
                password        : "mayin",
                connectString   : "192.168.3.11/system"
            });
            const data = await con.execute("SELECT * FROM MENU.MODULES");
            callback(null, data.rows);
        }catch(err){
            console.error(err);
        }
    }
    allmodule();
  },

};
  
  module.exports = AllModule;
