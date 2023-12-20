import { Module } from '@nestjs/common';
import {PrismaModule} from "../prisma/prisma.module";



@Module({
    imports:[PrismaModule],
    controllers:[AttachmentsModule],
    providers:[AttachmentsModule],
})
export class AttachmentsModule {}
