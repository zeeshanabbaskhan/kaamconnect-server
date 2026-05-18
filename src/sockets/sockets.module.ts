import { Module } from "@nestjs/common";
import { KaamConnectGateway } from "./kaamconnect.gateway";

@Module({
  providers: [KaamConnectGateway],
  exports: [KaamConnectGateway],
})
export class SocketsModule {}
