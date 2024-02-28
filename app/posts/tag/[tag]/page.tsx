"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
import PostCard from '../../../components/post-card'
import { Suspense } from "react";
import { Spinner } from 'flowbite-react';

type Post = {
    _id: string,
    title: string,
    author: string,
    created_at: Date,
    description: string,
    preview_image: string,
    tag: string
};

const allPosts = async (tag: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/tag/${tag}`);
    return res.json();
} 

function Loading() {
    return <Spinner aria-label="Default status example" />;
}

export default function Home({ params }: { params: {tag: string}}) {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setPosts(await allPosts(params.tag));
    }
    fetchData();
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
  }, [])
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white dark:bg-[#03001C] transition-colors duration-200 ease-in-out">
          <h1 className='text-2xl my-6 font-semibold text-[#03001C] dark:text-white'>{params.tag}</h1>
          <div className='grid grid-cols-3 gap-x-3'>
                {posts.map((post: Post) => <PostCard key={post._id} {...post} />)}
          </div>
    </main>
  )
}
