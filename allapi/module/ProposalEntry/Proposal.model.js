const connection = require("../../../utils/ConnectOracle");
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\instantclient_21_3" });

const proposal = {
  //PROPOSAL
  InsertProposalData: async (proposals) => {
    let con;

    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const results = [];

      for (const proposal of proposals) {
        const {
          PROPOSAL_N,
          PROPOSAL_D,
          RISKDATE,
          PROPOSER,
          FATHERS_NAME,
          FATHERHUSB,
          MOTHERS_NAME,
          ADDRESS1,
          POST_CODE_CUR,
          POST_CODE_PER,
          CITY,
          MOBILE,
          LOCALITY,
          N_ID_NUMBER,
          DOB,
          AGE,
          SEX,
          OCCUPATION,
          AGENT_ID,
          BRANCH_ID,
          USERID,
          LAST_EDUCATION,
          RELIGION,
          MARITAL_STATUS,
          LOCALITY_COUNTRY,
          SPOUSE,
          PD_CODE,
        } = proposal;

        const result = await con.execute(
          `INSERT INTO POLICY_MANAGEMENT.PROPOSAL_DUMMY(PROPOSAL_N, PROPOSAL_D, RISKDATE, PROPOSER, FATHERS_NAME, FATHERHUSB, MOTHERS_NAME,ADDRESS1,POST_CODE_CUR, POST_CODE_PER, CITY, MOBILE, LOCALITY,  N_ID_NUMBER,DOB, AGE, SEX, OCCUPATION, AGENT_ID, BRANCH_ID, USERID,LAST_EDUCATION, RELIGION, MARITAL_STATUS, LOCALITY_COUNTRY, SPOUSE, PD_CODE)
            
            VALUES(:PROPOSAL_N, TO_DATE(:PROPOSAL_D,'YYYYMMDD'), TO_DATE(:RISKDATE,'YYYYMMDD'), :PROPOSER,:FATHERS_NAME,:FATHERHUSB,:MOTHERS_NAME,:ADDRESS1,:POST_CODE_CUR,:POST_CODE_PER,:CITY,
            :MOBILE,:LOCALITY,:N_ID_NUMBER,TO_DATE(:DOB,'YYYYMMDD'),:AGE,:SEX,:OCCUPATION,:AGENT_ID,:BRANCH_ID,:USERID,:LAST_EDUCATION,:RELIGION,:MARITAL_STATUS,
            :LOCALITY_COUNTRY,:SPOUSE,:PD_CODE)`,
          {
            PROPOSAL_N,
            PROPOSAL_D,
            RISKDATE,
            PROPOSER,
            FATHERS_NAME,
            FATHERHUSB,
            MOTHERS_NAME,
            ADDRESS1,
            POST_CODE_CUR,
            POST_CODE_PER,
            CITY,
            MOBILE,
            LOCALITY,
            N_ID_NUMBER,
            DOB,
            AGE,
            SEX,
            OCCUPATION,
            AGENT_ID,
            BRANCH_ID,
            USERID,
            LAST_EDUCATION,
            RELIGION,
            MARITAL_STATUS,
            LOCALITY_COUNTRY,
            SPOUSE,
            PD_CODE,
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

  //AL COUNTRY LIST
  getEducation: (callback) => {
    async function education() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT EDNAME,EDCODE FROM POLICY_MANAGEMENT.ONLINE_EDUCATION"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    education();
  },

  //AL COUNTRY LIST
  getOccupname: (callback) => {
    async function occupation() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT OCCUPNAME FROM POLICY_MANAGEMENT.ONLINE_OCCUPATION"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    occupation();
  },
  //AL COUNTRY LIST
  getAllCountry: (callback) => {
    async function COUNTRY() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT DISTINCT  C_NAME,C_CODE FROM POLICY_MANAGEMENT.COUNTRY"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    COUNTRY();
  },
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

  //GENDER LIST
  getAllGender: (callback) => {
    async function allgender() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT GENDER_NAME,GENDER_ID FROM POLICY_MANAGEMENT.ONLINE_GENDER"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allgender();
  },

  //LOCALITY LIST
  getAlllocallity: (callback) => {
    async function allLocallity() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT LOCALITY_TYPE,LOCALITY_ID FROM POLICY_MANAGEMENT.ONLINE_LOCALITY"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allLocallity();
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
          "SELECT 'PROJECT-'||CODE NAME, CODE FROM POLICY_MANAGEMENT.PD WHERE STAT='A' ORDER BY CODE"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allprojects();
  },

  //DIVISION LIST
  getDivisionList: (callback) => {
    async function allDivision() {
      let con;
      try {
        con = await oracledb.getConnection({
          user: "MENU",
          password: "mayin",
          connectString: "192.168.3.11/system",
        });
        const data = await con.execute(
          "SELECT DIVNAME,DCODE FROM POLICY_MANAGEMENT.DISTRICT ORDER BY DIVNAME"
        );
        callback(null, data.rows);
      } catch (err) {
        console.error(err);
      }
    }
    allDivision();
  },

  //CHAIN LIST
  getchainListbyprojectid: async (base_project, base_code, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT CHAIN_NAME,CHAIN_CODE,CHAIN_DESIGNATION,CHAIN_POSITION FROM (SELECT DISTINCT BASE_NAME CHAIN_NAME,BASE_CODE CHAIN_CODE,'FA' CHAIN_DESIGNATION,1 CHAIN_POSITION FROM POLICY_MANAGEMENT.ALL_SENIOR_INFO_DETAILS  WHERE BASE_PROJECT=:base_project AND  BASE_CODE=:base_code AND BASE_DSGN='01' UNION ALL SELECT CHAIN_NAME,CHAIN_CODE,CHAIN_DESIGNATION,CHAIN_POSITION FROM POLICY_MANAGEMENT.ALL_SENIOR_INFO_DETAILS WHERE BASE_PROJECT=:base_project AND  BASE_CODE=:base_code AND BASE_DSGN='01') ORDER BY CHAIN_POSITION",
        [base_project, base_code]
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

  //PROPOSAL INFORMATION
  getProposalInfo: async (proposal_no, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT PROPOSAL_N,PROPOSAL_D,RISKDATE,TABLE_ID,TERM,SUM_INSURE,SUMATRISK,PROPOSER,SALUTE,ADDRESS1,ADDRESS2,CITY,ZIP,MOBILE,DOB,AGE,AGE_P_CODE,FATHERHUSB,SEX,OCCUPATION,INSTMODE,TOTALINST,INSTNO,AGENT_ID,PD_CODE,MOTHERS_NAME,FATHERS_NAME,MARITAL_STATUS,N_ID_NUMBER FROM POLICY_MANAGEMENT.PROPOSAL_DUMMY WHERE PROPOSAL_N=:proposal_no",
        { proposal_no: proposal_no }
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

  //AGENT LIST
  getAgentList: async (base_project, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT DISTINCT BASE_NAME,BASE_CODE FROM POLICY_MANAGEMENT.ALL_SENIOR_INFO_DETAILS WHERE BASE_PROJECT=:base_project AND BASE_DSGN='01'",
        { base_project: base_project }
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

  //THANA LIST
  getThanaList: async (div_code, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT THANA,TCODE FROM POLICY_MANAGEMENT.THANA WHERE DCODE=:div_code",
        { div_code: div_code }
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

  //POST OFFICE LIST
  getPostList: async (code, callback) => {
    let con;
    try {
      con = await oracledb.getConnection({
        user: "MENU",
        password: "mayin",
        connectString: "192.168.3.11/system",
      });

      const result = await con.execute(
        "SELECT POST_OFFICE_NM,POST_CODE FROM POLICY_MANAGEMENT.POST_OFFICE WHERE THANA_CODE=:code",
        { code: code }
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
