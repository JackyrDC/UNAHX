import { type Post } from "../types/post"
import PostCard from "./post-card"

export function PostList({post}:{post:Post[]}){

return(
    <>
    {
        post?.map(
          post => {
            const{
              id,
              user,
              content
            }= post
            const {
              user_name: userName,
              name: userFullName,
              avatar_url:avatarUrl
            } = user
            return <PostCard 
              key={id}
              userName={userName ?? ''}
              userFullName={userFullName ?? ''}
              avatarUrl={avatarUrl ?? ''}
              content={content}
            /> 
          }
        )
      }
      </>
      )
}