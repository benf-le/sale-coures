import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";

export async function PATCH(
    req: Request,
    {params}:{params: {courseId: string; chapterId: string}},
){
    try{
        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId,
            }
        });

        if (!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }


        const chapter = await db.chapter.findUnique({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            }
        })


        const unPublishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data:{
                isPublished: false,
            }
        })

        //nếu unpublish hết chapter thì unpublish course

        const unPublishedInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true,
            }
        })
        if(!unPublishedInCourse.length) {

            await db.course.update({
                where: {
                    id: params.courseId,
                },
                data:{
                    isPublished: false,
                }
            })
        }

        return NextResponse.json(unPublishedChapter)
    }catch (error){
        console.log("CHAPTER_UNPUBLISHED", error)
        return new NextResponse("Internal error", {status: 500})
    }
}