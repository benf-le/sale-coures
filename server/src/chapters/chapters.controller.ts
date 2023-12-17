import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards} from "@nestjs/common";
import {ChaptersService} from "./chapters.service";

import {UserInfo, Users} from "../auth/decorator";
import {Roles} from "../auth/decorator/roles.decorator";
import {UserType} from "@prisma/client";
import {AuthorizationGuard} from "../auth/guard/authorization.guard";
import {ChapterDTO} from "./dto";


@Controller(`courses/:courseId/chapters`)
@UseGuards()
export class ChaptersController {

    constructor(private readonly chaptersService: ChaptersService) {

    }
    @Get(`/`)
    async getChapter(chapterDTO:ChapterDTO){
        return await this.chaptersService.getChapter(chapterDTO)
    }

   

    @Get(`:courseId`) // register a new user
    async getChapterById(@Param('courseId')id: string){
        return await this.chaptersService.getChapterById(id)
    }
    

    // @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Post(`/create-chapter`)
    createChapter(@Body() chapterDTO:ChapterDTO, @Param('courseId') courseId: string){

        return this.chaptersService.creatChapter(chapterDTO, courseId)
    }
    //
    //
    // @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Put("/:chapterId/update-chapter")
    updateChapter(@Body() chapterDTO:ChapterDTO,  @Param('courseId')courseId: string, @Param('chapterId')chapterId: string, @Body() body: any){
        console.log('Body data:', body);
        return this.chaptersService.updateChapter(chapterDTO, courseId,chapterId, body)
    }
    //
    //
    // @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Delete("/:chapterId/delete-chapter")
    deleteChapter( @Param('courseId')courseId: string, @Param('chapterId')chapterId: string){
        return this.chaptersService.deleteChapter( courseId,chapterId)
    }

    @Patch(`/:chapterId/publish`)
    publishedChapter(@Param('courseId')courseId: string, @Param('chapterId')chapterId: string){
        return this.chaptersService.publishedChapter( courseId,chapterId)
    }


    @Patch(`/:chapterId/unpublish`)
    unPublishedChapter(@Param('courseId')courseId: string, @Param('chapterId')chapterId: string){
        return this.chaptersService.unPublishedChapter( courseId,chapterId)
    }








}
//USER
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxNEBnbWFpbC5jb20iLCJpZCI6IjY0ZGE4OTgyZDA5YTE2NGViZjRkYjA2MiIsImlhdCI6MTY5MjA0MzY1MCwiZXhwIjoxNjkyNDAzNjUwfQ.Cg-H5OTteIOGKe9oPOkQEotK1F6BYuiV7ufrJICLgtU

//ADMIN
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMkBnbWFpbC5jb20iLCJpZCI6IjY0ZGE0YTYzODY0MWViZTM5NDlkMTRiYiIsImlhdCI6MTY5MjA0MjQ4OSwiZXhwIjoxNjkyNDAyNDg5fQ.8vPq_vMIdZrPsnwGy9vGat-X8agMe2GuzWpfNLXVJWc