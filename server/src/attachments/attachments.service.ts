import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {AttachmentDTO} from "./dto";





@Injectable({})
export class AttachmentsService {
    constructor(private readonly prismaService: PrismaService) { //constructor: khởi tạo PrismaService khi một đối tượng của lớp được tạo.

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
