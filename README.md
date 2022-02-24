### About

A POC of gRPC services

### Requirements

Install [go](https://go.dev/doc/install)

Install [grpcui](https://github.com/fullstorydev/grpcui)

- `go install github.com/fullstorydev/grpcui/cmd/grpcui@latest`

Set Path in ~/.bashrc

- `export PATH="/usr/local/go/bin/:$PATH"`

Install gRPC Tools & Protobuf Compiler

- `sudo apt install protobuf-compiler`
- `npm i -g grpc-tools`

### Run

**Command for statically generated gRPC Code**

protoc --proto_path=protos \
 --js_out=import_style=commonjs,binary:build/gen \
 --grpc_out=build/gen \
 --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
 ./protos/\*.proto

Start gRPC Server

- `npm start`

Start gRPC UI to test services

- `npm run grpcui`
