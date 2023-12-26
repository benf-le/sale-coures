import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";

import {UserInfo, Users} from "../auth/decorator";
import {Roles} from "../auth/decorator/roles.decorator";
import {UserType} from "@prisma/client";
import {AuthorizationGuard} from "../auth/guard/authorization.guard";

import {AttachmentsService} from "./attachments.service";
import {AttachmentDTO} from "./dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {storageConfig} from "../../helper/config";


@Controller(`courses/:courseId/attachments`)
@UseGuards()
export class AttachmentsController {

    constructor(private readonly attachmentsService: AttachmentsService) {

    }


    @Delete("/:attachmentId/delete-attachment")
    deleteAttachment(@Param('courseId') courseId: string, @Param('attachmentId') attachmentId: string) {
        return this.attachmentsService.deleteAttachment(courseId, attachmentId)
    }


    @Post("uploadfile")
    @UseInterceptors(FilesInterceptor('url', 1))
    uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
        console.log('up file')
        console.log(file)

    }
}
