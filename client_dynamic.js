const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const {struct} = require('pb-util');

const PROTO_PATH = "./protos/attendance.proto";
const SERVER_URI = "0.0.0.0:8001";

const packageDef = protoLoader.loadSync(PROTO_PATH);
const attendanceProto = grpc.loadPackageDefinition(packageDef);
const attendancePackage = attendanceProto.attendancePackage;

function main() {
  const client = new attendancePackage.Attendance(
    SERVER_URI,
    grpc.credentials.createInsecure()
  );

  let request = {
    employeeId: 9,
  };
  request.data = struct.encode({ username: "no-eval" });
  console.log(JSON.stringify(request));

  let call = client.getLogs(request, (error, response) => {
    if (!error) {
      console.log(JSON.stringify(response));
    } else {
      console.error(error);
    }
  });

  call.on("data", (response) => {
    console.log(response);
  });
}

main();
