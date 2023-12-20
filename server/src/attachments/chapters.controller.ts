import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards} from "@nestjs/common";

import {UserInfo, Users} from "../auth/decorator";
import {Roles} from "../auth/decorator/roles.decorator";
import {UserType} from "@prisma/client";
import {AuthorizationGuard} from "../auth/guard/authorization.guard";

import {AttachmentsService} from "./chapters.service";
import {AttachmentDTO} from "./dto";


@Controller(`courses/:courseId/attachments`)
@UseGuards()
export class AttachmentsController {

    constructor(private readonly attachmentsService: AttachmentsService) {

    }
    @Get(`/`)
    async getAttachment(attachmentDTO:AttachmentDTO){
        return await this.attachmentsService.getAttachment(attachmentDTO)
    }

   

    @Get(`:courseId`) // register a new user
    async getAttachmentById(@Param('courseId')id: string){
        return await this.attachmentsService.getAttachmentById(id)
    }
    

    // @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Post(`/create-attachment`)
    createAttachment(@Param('courseId') courseId: string , @Body() url: string ){

        return this.attachmentsService.createAttachment(courseId, url)
    }

    //
    // @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Delete("/:attachmentId/delete-attachment")
    deleteAttachment( @Param('courseId')courseId: string, @Param('attachmentId')attachmentId: string){
        return this.attachmentsService.deleteAttachment( courseId,attachmentId)
    }

    // @Patch(`/:attachmentId/publish`)
    // publishedAttachment(@Param('courseId')courseId: string, @Param('attachmentId')attachmentId: string){
    //     return this.attachmentsService.publishedAttachment( courseId,attachmentId)
    // }
    //
    //
    // @Patch(`/:attachmentId/unpublish`)
    // unPublishedAttachment(@Param('courseId')courseId: string, @Param('attachmentId')attachmentId: string){
    //     return this.attachmentsService.unPublishedAttachment( courseId,attachmentId)
    // }








}
//USER
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxNEBnbWFpbC5jb20iLCJpZCI6IjY0ZGE4OTgyZDA5YTE2NGViZjRkYjA2MiIsImlhdCI6MTY5MjA0MzY1MCwiZXhwIjoxNjkyNDAzNjUwfQ.Cg-H5OTteIOGKe9oPOkQEotK1F6BYuiV7ufrJICLgtU

//ADMIN
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMkBnbWFpbC5jb20iLCJpZCI6IjY0ZGE0YTYzODY0MWViZTM5NDlkMTRiYiIsImlhdCI6MTY5MjA0MjQ4OSwiZXhwIjoxNjkyNDAyNDg5fQ.8vPq_vMIdZrPsnwGy9vGat-X8agMe2GuzWpfNLXVJWc