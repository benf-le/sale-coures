import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards} from "@nestjs/common";
import {CoursesService} from "./courses.service";
import {CourseDTO} from "./dto";
import {UserInfo, Users} from "../auth/decorator";
import {Roles} from "../auth/decorator/roles.decorator";
import {UserType} from "@prisma/client";
import {AuthorizationGuard} from "../auth/guard/authorization.guard";


@Controller('courses')
@UseGuards()
export class CoursesController{

    constructor(private readonly coursesService: CoursesService) {

    }
    @Get(`/`)
    async getCourses(coursesDTO:CourseDTO){
        return await this.coursesService.getCourses(coursesDTO)
    }

   

    @Get(`:id`) // register a new user
    async getCoursesById(@Param('id')id: string){
        return await this.coursesService.getCoursesById(id)
    }
    


    @Post("/create-course")
    createCourse(@Body() courseDTO: CourseDTO, @Body() user: any) {
        const userId = user.userId;

        console.log(userId);
        return this.coursesService.createCourses(courseDTO, userId);
    }



    @Patch("/update-course/:id")
    updateCourse(@Body() courseDTO:CourseDTO, @Param('id')id: string){
        // const adminId = this.coursesService.getAdminByCourseId()
        return this.coursesService.updateCourses(courseDTO, id)
    }



    @Delete("/delete-course/:id")
    deleteCourse( @Param('id')id: string){
        return this.coursesService.deleteCourses( id)
    }


    @Patch(`/:courseId/publish`)
    publishedChapter(@Param('courseId')courseId: string){

        return this.coursesService.publishedCourse( courseId)
    }


    @Patch(`/:courseId/unpublish`)
    unPublishedChapter(@Param('courseId')courseId: string){

        return this.coursesService.unPublishedCourse( courseId)
    }




}
