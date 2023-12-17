import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {ChapterDTO} from "./dto";
import  Mux from "@mux/mux-node";


// const {Video}= new Mux(
//     process.env.MUX_TOKEN_ID!,
//     process.env.MUX_TOKEN_SECRET!
// )
//


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



    async updateChapter(chapterDTO: ChapterDTO,courseId: string,  chapterId: string ,body: any) {
        try {

            const {isPublished, ...values} = await body; // để kiểm soát có khi chưa đủ dữ liệu mà đã xuất bản(isPublished), việc xuất bản sẽ đc quản lý bởi 1 api riêg biiệt, isPublished tách khỏi value vì điều dó


            const updateCourse = await this.prismaService.chapter.update({
                where: {
                    id: chapterId,
                    courseId: courseId,
                },
                data: {
                    ...values,
                }
            });

            // if (values.videoUrl) {
            //     // nếu có sẵn video nào đó thì code dưới dùng để tìm ra nó và xóa video đó đi
            //     const existingMuxData = await this.prismaService.muxData.findFirst({
            //         where: {
            //             chapterId: chapterId,
            //         }
            //     })
            //
            //     if (existingMuxData) {
            //         await video.Assets.del(existingMuxData.assetId)
            //         await this.prismaService.muxData.delete({
            //             where: {
            //                 id: existingMuxData.id
            //             }
            //         })
            //
            //     }
            // }
            //
            // //tao 1 video mới
            // const asset = await Video.Assets.create({
            //     input: values.videoUrl,
            //     playback_policy: "public",
            //     test: false
            // })
            //
            // await this.prismaService.muxData.create({
            //     data: {
            //         chapterId: chapterId,
            //         assetId: asset.id,
            //         playbackId: asset.playback_ids?.[0]?.id
            //     }
            // })
            //


                return updateCourse;
        } catch (error) {
            throw new Error(`Could not update product: ${error.message}`);
        }
    }


    async deleteChapter(courseId: string, chapterId:string){
        try {


            const chapter = await this.prismaService.chapter.findUnique({
                where: {
                    id: chapterId,
                    courseId: courseId
                }
            });

            if (!chapter) {
                return "Not Found"
            }

            // //xoa di video khi da bam nut xoa
            // if (chapter.videoUrl) {
            //     const existingMuxData = await this.prismaService.muxData.findFirst({
            //         where: {
            //             chapterId: chapterId,
            //         }
            //     });
            //
            //     if (existingMuxData) {
            //         await video.Assets.del(existingMuxData.assetId);
            //         await this.prismaService.muxData.delete({
            //             where: {
            //                 id: existingMuxData.id,
            //             }
            //         });
            //     }
            // }

            const deleteCourse = await this.prismaService.chapter.delete({
                where: {
                    id: chapterId,

                }
            });

            //check xem nếu ko tìm thấy video nào thì sẽ ko cho xuất bản chapter đó nữa
            const publishedChapterInCourse = await this.prismaService.chapter.findMany({
                where: {
                    courseId: courseId,
                    isPublished: true,
                }
            })
            //check xem nếu ko tìm thấy video nào thì sẽ ko cho xuất bản chapter đó nữa

            if(!publishedChapterInCourse.length) {
                await this.prismaService.course.update({
                    where: {
                        id: courseId
                    },
                    data: {
                        isPublished: false
                    }
                })
            }

            if(deleteCourse) {
                return 'Deleted Chapter'
            }
            else {return 'Error Delete Chapter'};
        } catch (error) {
            throw new Error(`Could not delete product: ${error.message}`);
        }
    }

    async publishedChapter(courseId: string, chapterId:string){
        const chapter = await this.prismaService.chapter.findUnique({
            where: {
                id: chapterId,
                courseId: courseId
            }
        });

        if (!chapter) {
            return "Not Found"
        }

        const muxData = await this.prismaService.muxData.findUnique({
            where: {
                chapterId: chapterId,
            }
        })

        // if (!chapter || !muxData || !chapter.videoUrl || !chapter.title || !chapter.description) {
        //     return "Missing required fields"
        // }

        const publishedChapter = await this.prismaService.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId,
            },
            data:{
                isPublished: true,
            }
        })

        return publishedChapter

    }
    async unPublishedChapter(courseId: string, chapterId:string){
        const unpublishedChapter = await this.prismaService.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId,
            },
            data: {
                isPublished: false,
            }
        });

        //nếu unpublish hết chapter thì unpublish course
        const publishedChaptersInCourse = await this.prismaService.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true,
            }
        });

        if (!publishedChaptersInCourse.length) {
            await this.prismaService.course.update({
                where: {
                    id: courseId,
                },
                data: {
                    isPublished: false,
                }
            });
        }

        return unpublishedChapter

    }


  }
