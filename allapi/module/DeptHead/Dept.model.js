const connection = require("../../../utils/ConnectOracle");
const oracledb = require('oracledb');
oracledb.initOracleClient({libDir: 'C:\\instantclient_21_3'});

const Alldepthead = {
    getAll: (callback) => {
      async function dept_head(){
        let con;
        try{
            con = await oracledb.getConnection({
                user            : "MENU",
                password        : "mayin",
                connectString   : "192.168.3.11/system"
            });
            const data = await con.execute("SELECT DISTINCT PERSONALID, USERNAME, EMP_CODE,NAME,DEP_NAME FROM HRD.DEPARMENT_ACCESS WHERE DEPART_HEAD='Y' AND EMP_CODE NOT IN('00000031','00000174')");
            callback(null, data.rows);
        }catch(err){
            console.error(err);
        }
    }
    dept_head();
  },
  getById: async (catId, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system"
      });
  
      const result = await con.execute(
        "SELECT DISTINCT PERSONALID, USERNAME, EMP_CODE,NAME,DEP_NAME FROM HRD.DEPARMENT_ACCESS WHERE DEPART_HEAD='Y' AND PERSONALID = :catId",
        [catId]
      );
  
      // Assuming you want to return the first row
      const data = result.rows[0];
      callback(null, data);
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
  }
  ,


};
  
  module.exports = Alldepthead;
