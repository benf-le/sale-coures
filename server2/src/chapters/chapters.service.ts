import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {ChapterDTO} from "./dto";


@Injectable({})
export class ChaptersService {
    constructor(private readonly prismaService: PrismaService) { //constructor: khởi tạo PrismaService khi một đối tượng của lớp được tạo.

    }



    async getChapter(coursesDTO: ChapterDTO) {
        try {
            return await this.prismaService.chapter.findMany({})
        } catch (error) {

            return error
        }
    }

    async getChapterById(id: string) {
        try {
            return await this.prismaService.chapter.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {

            return error
        }
    }

    async creatChapter(chapterDTO: ChapterDTO, courseId: string) {
        try {

            const lastChapter = await this.prismaService.chapter.findFirst({
                where:{
                    courseId: courseId
                },
                orderBy:{
                    position:"desc"
                }
            })

            const newPosition = lastChapter ? lastChapter.position +1: 1;



            const createCourse = await this.prismaService.chapter.create({
                data: {
                    title: chapterDTO.title,
                    position: newPosition,
                    courseId: courseId,
                }
            });

            return createCourse;
        } catch (error) {
            throw new Error(`Could not create product: ${error.message}`);
        }
    }



    async updateChapter(chapterDTO: ChapterDTO, id: string){
        try {
            const updateCourse = await this.prismaService.chapter.update({
                data: {
                    title: chapterDTO.title,
                    description: chapterDTO.description,

                    isPublished: chapterDTO.isPublished,


                },
                where: {id}
            });

            return updateCourse;
        } catch (error) {
            throw new Error(`Could not update product: ${error.message}`);
        }
    }


    async deleteChapter(id: string){
        try {
            const deleteCourse = await this.prismaService.chapter.delete({
                where: {id}
            });

            if(deleteCourse) {
                return 'Deleted Chapter'
            }
            else {return 'Error Delete Chapter'};
        } catch (error) {
            throw new Error(`Could not create product: ${error.message}`);
        }
    }
}