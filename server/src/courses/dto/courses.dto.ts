// Define a "type" of "authentication request"
import {IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator'


export class CourseDTO {


    // @IsString()
    // @IsNotEmpty()
    title       :string //@db.Text

    @IsString()
    @IsOptional()
    description? :string

    @IsString()
    @IsOptional()
    imageUrl?    :string

    @IsNumber()
    @IsOptional()
    price? :number

    @IsBoolean()
    isPublished : boolean = false

    @IsString()
    @IsOptional()
    categoryId?: string;


}

