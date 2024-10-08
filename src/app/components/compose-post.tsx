import { cookies } from "next/headers"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import Image from 'next/image' // Importa el componente Image

export function ComposePost(
    {
        userAvatarUrl
    }: {
        userAvatarUrl: string
    }
) {
    const addPost = async (formData: FormData) => {
        'use server'

        const content = formData.get('post')
        console.log(content)

        if (content === null) return

        const supabase = createServerActionClient({ cookies })
        const { data: { user } } = await supabase.auth.getUser()
        if (user === null) return
        await supabase.from('Post').insert({ content, user_id: user.id })
        revalidatePath('/')
    }

    return (
<<<<<<< HEAD
        <form className="flex flex-row space-x-4" action={addPost}>
            <Image className="rounded-full w-12 h-6 object-contain" src={userAvatarUrl} alt="User Avatar" /> {/* Usa Image y agrega alt */}
=======
        <form className="flex flex-row space-x-4 bg-black" action={addPost}>
            <img className="rounded-full w-12 h-6 object-contain" src={userAvatarUrl}></img>
>>>>>>> a8f35f3f7f231a57dd2207b4c356b681e31c9000
            <div className="flex flex-1 flex-col gap-y-4">
                <textarea className="w-full text-xl bg-black placeholder-gray-500" placeholder="¿Qué está pasando?" name="post" cols={30} rows={4}></textarea>
                <button className="bg-sky-500 text-sm font-bold rounded-full px-5 py-2 self-end" type="submit">
                    Publicar
                </button>
            </div>
        </form>
    )
}