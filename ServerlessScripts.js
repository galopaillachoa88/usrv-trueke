// Helpers scripts for serverless.yml
const SSM = require("aws-sdk/clients/ssm");

module.exports.logRetentionInDays = () => {
  return {
    ci: 7,
    qa: 7,
    uat: 7,
    stg: 7,
    po: 7,
    primary: 3653,
  };
};

module.exports.canaryDeploymentType = () => {
  return {
    ci: "AllAtOnce",
    qa: "AllAtOnce",
    uat: "AllAtOnce",
    stg: "AllAtOnce",
    po: "AllAtOnce",
    primary: "AllAtOnce",
  };
};

module.exports.awsAccountId = async () => {
  const account = {};

  accdets = await getGlAccountDetails();
  const accid = await accdets.accountid;
  const accname = await accdets.accountname;

  if (accname == "primary" || accname == "dev") accVar = "";
  else accVar = "-" + accname;
  account[accid] = accVar;

  return account;
};

async function getGlAccountDetails() {
  console.log("inside getGlAccountDetails...");
  const region = process.env.AWS_REGION;
  const ssmClient = new SSM({ region });

  const acctDetails = await ssmClient
      .getParameter({
        Name: `/GL/ACCOUNT_DETAILS`,
        WithDecryption: true,
      })
      .promise();

  const glBuild = JSON.parse(acctDetails.Parameter.Value);

  console.log("acctid..." + glBuild.accountid);
  console.log("acctName..." + glBuild.accountname);

  return {
    accountid: glBuild.accountid,
    accountname: glBuild.accountname,
  };
}

module.exports.awsRegion = () => {
  return {
    ci: process.env.AWS_REGION,
    qa: process.env.AWS_REGION,
    uat: process.env.AWS_REGION,
    stg: process.env.AWS_REGION,
    po: process.env.AWS_REGION,
    primary: process.env.AWS_REGION,
  };
};

