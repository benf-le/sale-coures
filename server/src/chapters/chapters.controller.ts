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
    

    @Post(`/create-chapter`)
    createChapter(@Body() chapterDTO:ChapterDTO, @Param('courseId') courseId: string){

        return this.chaptersService.createChapter(chapterDTO, courseId)
    }


    @Patch("/:chapterId/update-chapter")
    updateChapter(@Body() chapterDTO:ChapterDTO,  @Param('courseId')courseId: string, @Param('chapterId')chapterId: string, @Body() body: any){
        console.log('Body data:', body);
        return this.chaptersService.updateChapter(chapterDTO, courseId,chapterId, body)
    }


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
