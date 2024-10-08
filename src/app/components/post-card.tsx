'use client'
import { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import {IconHeart, IconMessageCircle, IconRepeat} from "@tabler/icons-react";
export default function PostCard(
    {
        userFullName,
        userName,
        avatarUrl,
        content
    }:{
        userFullName: string
        userName: string
        avatarUrl: string
        content: string
    }
) {
  const [isFollowed, setIsFollowed] = useState(false);

  return (
    <Card className="bg-transparent border-transparent shadow-none">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
            <Avatar radius="full" size="md" src={avatarUrl} />
            <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
                <h5 className="text-small tracking-tight text-default-400">@{userName}</h5>
            </div>
        </div>
      </CardHeader>
      <CardBody className="px-4 py-0 text-small text-white">
        <p>{content}</p>
      </CardBody>
      <CardFooter className='gap-5'>
        <button>
            <IconMessageCircle className="w-4 h-4"/>
        </button>
        <button>
            <IconRepeat className="w-4 h-4"/>
        </button>
        <button>
            <IconHeart className="w-4 h-4"/>
        </button>
      </CardFooter>
    </Card>
  );
}
