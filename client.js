const grpc = require("@grpc/grpc-js");
const attendance = require("./build/gen/attendance_pb");
const service = require("./build/gen/attendance_grpc_pb");
const SERVER_URI = "0.0.0.0:8001";

function main() {
  console.log("Main Invoked!");

  const client = new service.AttendanceClient(
    SERVER_URI,
    grpc.credentials.createInsecure()
  );

  let request = new attendance.LogsRequest();

  request.setEmployeeId(7);

  let call = client.getLogs(request, (error, response) => {
    if (!error) {
      console.log(response);
    } else {
      console.error(error);
    }
  });

  call.on("data", (response) => {
    console.log(response);
  });
}

main();
