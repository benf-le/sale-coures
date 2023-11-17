
import { DataTable } from "./_components/data-table";
import {columns} from "@/app/(dashboard)/(routes)/teacher/courses/_components/columns";
import { auth } from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {db} from "@/lib/db";



const CoursesPage = async () => {
    const {userId} = auth()
    if(!userId) return redirect('/')

    const course = await db.course.findMany({
        where: {
            userId
        },
        orderBy:{
            createdAt: 'desc'
        }
    })


    return (
        <div className="p-6">
            {/*<Link href="/teacher/create">*/}
            {/*    <Button>*/}
            {/*        New Course*/}
            {/*    </Button>*/}
            {/*</Link>*/}



            <DataTable columns={columns} data={course} />
        </div>
    )
}
export default CoursesPage