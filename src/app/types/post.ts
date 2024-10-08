import type { Database } from "./database";

type PostType = Database['public']['Tables']['Post']['Row']
type UserType = Database['public']['Views']['users']['Row']

export type Post  = PostType & {
    user: UserType
}