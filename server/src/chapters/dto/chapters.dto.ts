// Define a "type" of "authentication request"
import {IsBoolean,  IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'


export class ChapterDTO {


    @IsString()
    @IsNotEmpty()
    title       :string //@db.Text

    @IsString()
    @IsOptional()
    description? :string

    @IsString()
    @IsOptional()
    videoUrl?    :string

    @IsString()
    @IsOptional()
    position?    :string


    @IsBoolean()
    isPublished : boolean = false

    @IsBoolean()
    isFree : boolean = false

    @IsString()
    @IsOptional()
    courseId?: string;


}

