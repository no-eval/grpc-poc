const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { stringify } = require("google-protobuf");

const PROTO_PATH = "./protos/attendance.proto";
const SERVER_URI = "0.0.0.0:8001";

const packageDef = protoLoader.loadSync(PROTO_PATH, {});
const attendanceProto = grpc.loadPackageDefinition(packageDef);
const attendancePackage = attendanceProto.attendancePackage;

const server = new grpc.Server();

server.addService(attendancePackage.Attendance.service, {
  getLogs: getLogs,
  updateLogs: updateLogs,
});

const logs = {
  attendanceLogs: [
    {
      punch: [
        {
          punchTime: "10:10 AM",
          punchType: "IN",
          workFromType: "OFFICE",
        },
        {
          punchTime: "04:20 PM",
          punchType: "OUT",
          workFromType: "HOME",
        },
      ],
      shiftDate: "2022-01-01",
    },
  ],
};

function getLogs(call, callback) {
  console.log(JSON.stringify(call.request));
  callback(null, logs);
}

function updateLogs(call, callback) {
  console.log(JSON.stringify(call.request));
  callback(null, { okay: true });
}

server.bindAsync(
  SERVER_URI,
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server at port:", port);
    console.log("Server running at http://127.0.0.1:8001");
    server.start();
  }
);
