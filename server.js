const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { stringify } = require("google-protobuf");
const { Struct } = require("google-protobuf/google/protobuf/struct_pb");
const { struct } = require("pb-util");
const create = require("grpc-create-metadata");

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
  call.request.data ? console.log(struct.decode(call.request.data)) : null;
  console.log(call.request.employeeId);
  /*
  // callback to get a response 
  callback(null, logs);
  */

  /* 
  // manually adding invidual key, values into metadata
  const meta = new grpc.Metadata();
  // metadata only accepts string & buffer, thus passing string instead of array below
  meta.add("errorIn", "shiftDate, dateOfBirth"); 
  meta.add("message", "Shift date must be after Date of Joining");
  */
 
 // creating a metadata object directly from a json
 const meta = create({
   httpStatusCode: 422,
   message: "Shift date must be after Date of Joining",
   // below array will get converted into string!
   errorIn: ["shiftDate", "dateOfJoining"],
  });
  
  // callback to get an error with metadata
  callback({
    code: 401,
    message: "Request is missing required authentication credential. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.",
    status: grpc.status.UNAUTHENTICATED
  }, null, meta)
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
