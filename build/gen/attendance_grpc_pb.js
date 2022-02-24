// GENERATED CODE -- DO NOT EDIT!

"use strict";
var grpc = require("@grpc/grpc-js");
var attendance_pb = require("./attendance_pb.js");

function serialize_attendancePackage_AttendanceLogs(arg) {
  if (!(arg instanceof attendance_pb.AttendanceLogs)) {
    throw new Error(
      "Expected argument of type attendancePackage.AttendanceLogs"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_attendancePackage_AttendanceLogs(buffer_arg) {
  return attendance_pb.AttendanceLogs.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_attendancePackage_LogsRequest(arg) {
  if (!(arg instanceof attendance_pb.LogsRequest)) {
    throw new Error("Expected argument of type attendancePackage.LogsRequest");
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_attendancePackage_LogsRequest(buffer_arg) {
  return attendance_pb.LogsRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_attendancePackage_UpdateLogsRequest(arg) {
  if (!(arg instanceof attendance_pb.UpdateLogsRequest)) {
    throw new Error(
      "Expected argument of type attendancePackage.UpdateLogsRequest"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_attendancePackage_UpdateLogsRequest(buffer_arg) {
  return attendance_pb.UpdateLogsRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

function serialize_attendancePackage_UpdateLogsStatus(arg) {
  if (!(arg instanceof attendance_pb.UpdateLogsStatus)) {
    throw new Error(
      "Expected argument of type attendancePackage.UpdateLogsStatus"
    );
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_attendancePackage_UpdateLogsStatus(buffer_arg) {
  return attendance_pb.UpdateLogsStatus.deserializeBinary(
    new Uint8Array(buffer_arg)
  );
}

var AttendanceService = (exports.AttendanceService = {
  getLogs: {
    path: "/attendancePackage.Attendance/getLogs",
    requestStream: false,
    responseStream: false,
    requestType: attendance_pb.LogsRequest,
    responseType: attendance_pb.AttendanceLogs,
    requestSerialize: serialize_attendancePackage_LogsRequest,
    requestDeserialize: deserialize_attendancePackage_LogsRequest,
    responseSerialize: serialize_attendancePackage_AttendanceLogs,
    responseDeserialize: deserialize_attendancePackage_AttendanceLogs,
  },
  updateLogs: {
    path: "/attendancePackage.Attendance/updateLogs",
    requestStream: false,
    responseStream: false,
    requestType: attendance_pb.UpdateLogsRequest,
    responseType: attendance_pb.UpdateLogsStatus,
    requestSerialize: serialize_attendancePackage_UpdateLogsRequest,
    requestDeserialize: deserialize_attendancePackage_UpdateLogsRequest,
    responseSerialize: serialize_attendancePackage_UpdateLogsStatus,
    responseDeserialize: deserialize_attendancePackage_UpdateLogsStatus,
  },
});

exports.AttendanceClient = grpc.makeGenericClientConstructor(AttendanceService);
