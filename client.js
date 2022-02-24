const grpc = require("@grpc/grpc-js");
const attendance = require("./build/gen/attendance_pb");
const service = require("./build/gen/attendance_grpc_pb");

function main() {
  console.log("Main Invoked!");

  const client = new service.AttendanceClient(
    "localhost:8001",
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
