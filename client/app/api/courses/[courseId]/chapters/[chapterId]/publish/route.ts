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

        const muxData = await db.muxData.findUnique({
            where: {
                chapterId: params.chapterId,
            }
        })

        //neu thieu cai gi thi khong cho xuat ban
        if (!chapter || !muxData || !chapter.videoUrl || !chapter.title || !chapter.description) {
            new NextResponse("Missing required fields", { status: 400 });
        }

        const publishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId,
            },
            data:{
                isPublished: true,
            }
        })

        return NextResponse.json(publishedChapter)
    }catch (error){
        console.log("CHAPTER_PUBLISHED", error)
        return new NextResponse("Internal error", {status: 500})
    }
}