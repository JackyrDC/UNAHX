import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"

export function ComposePost(
    {
        userAvatarUrl
    }:{
        userName:string,
        userAvatarUrl:string
    }
){
    const addPost = async (formData: FormData) => {
        'use server'

        const content = formData.get('post')
        console.log(content)

        if (content === null) return

        const supabase = createServerActionClient({ cookies })
        const { data: { user } } = await supabase.auth.getUser()
        if (user === null) return
        const { error } = await supabase.from('Post').insert({ content, user_id: user.id })
        if (error) {
            console.error('Error inserting post:', error)
        }
        revalidatePath('/')
    }

    return (
        <form className="flex flex-row space-x-4 bg-black" action={addPost}>
            <img className="rounded-full w-12 h-6 object-contain" src={userAvatarUrl}></img>
            <div className="flex flex-1 flex-col gap-y-4">
                <textarea className="w-full text-xl bg-black placeholder-gray-500" placeholder="¿Qué está pasando?" name="post" cols={30} rows={4}></textarea>
                <button className="bg-sky-500 text-sm font-bold rounded-full px-5 py-2 self-end" type="submit">
                    Publicar
                </button>
            </div>
        </form>
    )
}