import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {AttachmentDTO} from "./dto";


// const {Video}= new Mux(
//     process.env.MUX_TOKEN_ID!,
//     process.env.MUX_TOKEN_SECRET!
// )
//


@Injectable({})
export class AttachmentsService {
    constructor(private readonly prismaService: PrismaService) { //constructor: khởi tạo PrismaService khi một đối tượng của lớp được tạo.

    }


    async getAttachment(attachmentDTO: AttachmentDTO) {
        try {
            return await this.prismaService.attachment.findMany({})
        } catch (error) {

            return error
        }
    }

    async getAttachmentById(id: string) {
        try {
            return await this.prismaService.attachment.findUnique({
                where: {
                    id
                }
            })
        } catch (error) {

            return error
        }
    }

    async createAttachment(courseId: string, url: string) {
        try {
            console.log('url', url);
            return await this.prismaService.attachment.create({
                data: {
                    url,
                    name: url.split('/').pop(),
                    courseId: courseId
                }
            })
        } catch (error) {

            return error
        }
    }


    async deleteAttachment(courseId: string, attachmentId: string) {
        try {
            return await this.prismaService.attachment.delete({
                where: {
                    courseId: courseId,
                    id: attachmentId
                }
            })
        } catch (error) {

            return error
        }
    }


}
