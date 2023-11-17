// dùng để lấy ra data của quá trình học sau khi mua 1 video
import {db} from "@/lib/db";

export const getProgress = async (
    userId: string,
    courseId: string,
): Promise<number> => {
    try {
        //lay ra chapter da public
        const publishedChapter = await db.chapter.findMany({
            where: {
                courseId: courseId,
                isPublished: true
            },
            select: {
                id: true
            }
        })
//tao ra mang cua nhung id da public
        const publishedChapterIds = publishedChapter.map((chapter) => chapter.id);

        const validCompletedChapter = await db.userProgress.findMany({
            where: {
                userId: userId,
                chapterId: {
                    in: publishedChapterIds
                },
                isCompleted: true
            }
        })

        const progressPercentage = (validCompletedChapter.length / publishedChapterIds.length) * 100;

        return progressPercentage;

    } catch (error) {
        console.log("[GET_PROGRESS]", error);
        return 0;
    }
}