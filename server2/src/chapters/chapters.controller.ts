import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from "@nestjs/common";
import {ChaptersService} from "./chapters.service";

import {UserInfo, Users} from "../auth/decorator";
import {Roles} from "../auth/decorator/roles.decorator";
import {UserType} from "@prisma/client";
import {AuthorizationGuard} from "../auth/guard/authorization.guard";
import {ChapterDTO} from "./dto";


@Controller('courses/:id/chapters')
@UseGuards()
export class ChaptersController {

    constructor(private readonly chaptersService: ChaptersService) {

    }
    @Get(`/`)
    async getChapter(chapterDTO:ChapterDTO){
        return await this.chaptersService.getChapter(chapterDTO)
    }

   

    @Get(`:id`) // register a new user
    async getChapterById(@Param('id')id: string){
        return await this.chaptersService.getChapterById(id)
    }
    

    @Roles(UserType.ADMIN)
    @UseGuards(AuthorizationGuard)
    @Post("/create-chapter")
    createChapter(@Body() chapterDTO:ChapterDTO, @Param('id') courseId: string){

        return this.chaptersService.creatChapter(chapterDTO, courseId)
    }
    //
    //
    @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Put("/:id/update-chapter")
    updateChapter(@Body() chapterDTO:ChapterDTO, @Param('id')id: string){
        // const adminId = this.chaptersService.getAdminByChapterId()
        return this.chaptersService.updateChapter(chapterDTO, id)
    }
    //
    //
    @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Delete("/:id/delete-chapter")
    deleteChapter( @Param('id')id: string){
        return this.chaptersService.deleteChapter( id)
    }





}
//USER
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxNEBnbWFpbC5jb20iLCJpZCI6IjY0ZGE4OTgyZDA5YTE2NGViZjRkYjA2MiIsImlhdCI6MTY5MjA0MzY1MCwiZXhwIjoxNjkyNDAzNjUwfQ.Cg-H5OTteIOGKe9oPOkQEotK1F6BYuiV7ufrJICLgtU

//ADMIN
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMkBnbWFpbC5jb20iLCJpZCI6IjY0ZGE0YTYzODY0MWViZTM5NDlkMTRiYiIsImlhdCI6MTY5MjA0MjQ4OSwiZXhwIjoxNjkyNDAyNDg5fQ.8vPq_vMIdZrPsnwGy9vGat-X8agMe2GuzWpfNLXVJWc