"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


const formSchema = z.object({
    title: z.string().min(1,
        {
            message: "Title is required",
        }),
})

const CreatePage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: "",
        }
    })

    const {isSubmitting, isValid} = form.formState
    const onSubmit =(values: z.infer<typeof formSchema>)=>{
        console.log(values)
    }

    return(
        <div>
            Create Page
        </div>
    )
}
export default CreatePage;