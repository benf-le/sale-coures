import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CourseDTO} from "./dto";


@Injectable({})
export class CoursesService {
    constructor(private readonly prismaService: PrismaService) { //constructor: khởi tạo PrismaService khi một đối tượng của lớp được tạo.

    }

    async getCourses(coursesDTO: CourseDTO) {
        try {
            return await this.prismaService.course.findMany({})
        } catch (error) {

            return error
        }
    }

    async getCoursesById(id: string) {
        try {
            return await this.prismaService.course.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {

            return error
        }
    }

    async creatCourses(coursesDTO: CourseDTO, userId: string) {
        try {

            const createCourse = await this.prismaService.course.create({
                data: {
                    userId,
                    title: coursesDTO.title,
                    description: coursesDTO.description,
                    imageUrl: coursesDTO.imageUrl,
                    price: coursesDTO.price,
                    isPublished: coursesDTO.isPublished,
                }
            });

            return createCourse;
        } catch (error) {
            throw new Error(`Could not create product: ${error.message}`);
        }
    }



    async updateCourses(coursesDTO: CourseDTO, id: string){
        try {
            const updateCourse = await this.prismaService.course.update({
                data: {
                    title: coursesDTO.title,
                    description: coursesDTO.description,
                    imageUrl: coursesDTO.imageUrl,
                    price: coursesDTO.price,
                    isPublished: coursesDTO.isPublished,


                },
                where: {id}
            });

            return updateCourse;
        } catch (error) {
            throw new Error(`Could not update product: ${error.message}`);
        }
    }


    async deleteCourses(id: string){
        try {
            const deleteCourse = await this.prismaService.course.delete({
                where: {id}
            });

            if(deleteCourse) {
                return 'Deleted Courses'
            }
            else {return 'Error Delete Courses'};
        } catch (error) {
            throw new Error(`Could not create product: ${error.message}`);
        }
    }
}