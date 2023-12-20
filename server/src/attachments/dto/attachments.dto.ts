// Define a "type" of "authentication request"
import {IsBoolean,  IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'
import {AttachmentsModule} from "../chapters.module";


export class AttachmentDTO {


    @IsString()
    name :string

    @IsString()
    url :string


    @IsString()
    @IsOptional()
    courseId?: string;


}

