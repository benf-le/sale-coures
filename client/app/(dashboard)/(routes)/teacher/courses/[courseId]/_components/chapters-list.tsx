"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateData: { id: string; position: number }[]) => void;
    onEdit: (id: string) => void;
};

export const ChaptersList = ({
     items,
     onReorder,
     onEdit}: ChaptersListProps) =>{

    const [isMounted, setIsMounted]= useState(false);
    const [chapters, setChapters] = useState(items);

    useEffect(() => {
        setIsMounted(true)
    },[]);

    useEffect(() => {
        setChapters(items)
    }, [items]);

    if(!isMounted){
        return null
    }

    return(
        <DragDropContext onDragEnd={()=>{}}>
            <Droppable droppableId="chapters">
                {(provided) => (
                     <div>

                     </div>
                )}

            </Droppable>

        </DragDropContext>
    )

}