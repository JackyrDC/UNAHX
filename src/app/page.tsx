import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers"
import { AuthButtonServer } from "./components/auth-button-server";
import {redirect} from "next/navigation"
import { PostList } from "./components/post-list";
import { type Database } from "./types/database";
import { ComposePost } from "./components/compose-post";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({cookies})
  const {data:{session}} = await supabase.auth.getSession()
  
  if (session === null) {
    redirect('/login')
}

  const {
    data: posts
  }=  await supabase.from('Post').select('*,users(name, avatar_url,user_name)')
  const formattedPosts = posts?.map(post => ({
    ...post,
    user: {
      avatar_url: post.users?.avatar_url ?? null,
      id: post.user_id,
      name: post.users?.name ?? null,
      user_name: post.users?.user_name ?? null,
    }
  })) ?? [];

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-4'>
      <section className="max-w-[600px] mx-auto border-l border-r border-white/80 min-h-screen">
        <ComposePost 
          userAvatarUrl={session?.user?.user_metadata?.avatar_url} 
          userName={session?.user?.user_metadata?.user_name} 
        />
        <PostList post={formattedPosts}/>

      </section>
      <AuthButtonServer/>
    </main>
  )  ;
}
