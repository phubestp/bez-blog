"use client"

import { useState, useEffect, Suspense } from 'react'
import Content from './content.mdx'
import Loading from '../../components/loading';
import Image from "next/image";
import { SourceTextModule } from 'vm';

type Post = {
    _id: string,
    title: string,
    author: string,
    created_at: Date,
    description: string,
    preview_image: string,
    likes: number
}

export default function PostPage({ params }: { params: {id: string}}) {

    const [post, setPost] = useState<any>(null);
    const [preview, setPreview] = useState("");

    const getPost = async (id: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
        return res.json();
    } 

    useEffect(() => {
        const fetchData = async () => {
            const postData = await getPost(params.id)
            setPost(postData);
            setPreview(postData.preview_image)
        }
        fetchData();
    }, [])
    
    return (
        <main className="flex min-h-screen items-center flex-col px-24 py-16 bg-white dark:bg-[#03001C]  transition-colors duration-200 ease-in-out">
            <article className='prose'>
                <div className="h-96 w-full my-5 relative overflow-hidden">
                    <Image src={`${process.env.NEXT_PUBLIC_IMAGE_DISPLAY}/${preview}`} 
                        alt="preview"
                        fill
                        objectFit="cover"
                        className='absolute'
                    />
                </div>
                <Suspense fallback={<Loading />}>
                    {post && 
                        <div className='mt-12'>
                            <Content 
                            title={post.title} 
                            author={post.author}
                            created_at={post.created_at}
                            content={post.content}
                            description={post.description}
                            tag={post.tag}
                            />
                        </div>
                    }
                </Suspense>
            </article>
        </main>
    )
}