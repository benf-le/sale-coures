import { Module } from '@nestjs/common';
import {PrismaModule} from "../prisma/prisma.module";

import {ChaptersService} from "./chapters.service";
import {ChaptersController} from "./chapters.controller";


@Module({
    imports:[PrismaModule],
    controllers:[ChaptersController],
    providers:[ChaptersService]
})
export class ChaptersModule {}
