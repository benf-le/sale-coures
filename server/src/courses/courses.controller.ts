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
    

    // @Post("/create-course")
    // async creatCourses(coursesDTO:CourseDTO){
    //     return this.coursesService.creatCourses(coursesDTO)
    // }
    // @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Post("/create-course")
    createCourse(@Body() courseDTO: CourseDTO, @Body() user: any) {
        const userId = user.userId;

        console.log(userId);
        return this.coursesService.createCourses(courseDTO, userId);
    }
    // //
    // //
    // @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Patch("/update-course/:id")
    updateCourse(@Body() courseDTO:CourseDTO, @Param('id')id: string){
        // const adminId = this.coursesService.getAdminByCourseId()
        return this.coursesService.updateCourses(courseDTO, id)
    }
    //
    //
    // @Roles(UserType.ADMIN)
    // @UseGuards(AuthorizationGuard)
    @Delete("/delete-course/:id")
    deleteCourse( @Param('id')id: string){
        return this.coursesService.deleteCourses( id)
    }

    // @Roles(UserType.ADMIN)
    @Patch(`/:courseId/publish`)
    publishedChapter(@Param('courseId')courseId: string){

        return this.coursesService.publishedCourse( courseId)
    }


    // @Roles(UserType.ADMIN)
        @Patch(`/:courseId/unpublish`)
    unPublishedChapter(@Param('courseId')courseId: string){

        return this.coursesService.unPublishedCourse( courseId)
    }




}
//USER
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxNEBnbWFpbC5jb20iLCJpZCI6IjY0ZGE4OTgyZDA5YTE2NGViZjRkYjA2MiIsImlhdCI6MTY5MjA0MzY1MCwiZXhwIjoxNjkyNDAzNjUwfQ.Cg-H5OTteIOGKe9oPOkQEotK1F6BYuiV7ufrJICLgtU

//ADMIN
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMkBnbWFpbC5jb20iLCJpZCI6IjY0ZGE0YTYzODY0MWViZTM5NDlkMTRiYiIsImlhdCI6MTY5MjA0MjQ4OSwiZXhwIjoxNjkyNDAyNDg5fQ.8vPq_vMIdZrPsnwGy9vGat-X8agMe2GuzWpfNLXVJWc