const connection = require("../../../utils/ConnectOracle");
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\instantclient_21_3" });

const proposal = {
  //AL BRANCH LIST
  getAllBranch: (callback) => {
    async function allbranch() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT NAME,BRANCH_ID FROM POLICY_MANAGEMENT.BRANCH WHERE OFFICE_STATUS='A' ORDER BY NAME"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allbranch();
  },
  //ALL PROJECT LIST
  getAllproject: (callback) => {
    async function allprojects() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT NAME,CODE FROM POLICY_MANAGEMENT.PD WHERE STAT='A' ORDER BY CODE"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allprojects();
  },

  //CHAIN LIST
  getchainListbyprojectid: async (project_id, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT DSGN,NAME FROM POLICY_MANAGEMENT.TIER_DETAIL_RND  WHERE PROJECT=:project_id AND CHAIN_STATUS='A'  ",
        [project_id]
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
module.exports = proposal;
