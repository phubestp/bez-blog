"use client"

import { useState, FormEvent } from "react"
import Markdown from 'react-markdown'
import { Tabs } from 'flowbite-react';
import Image from "next/image";
import { useRouter } from 'next/navigation' 

export default function CreatePostPage() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [previewBanner, setPreviewBanner] = useState<any>(null);
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const router = useRouter()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      let formData = new FormData();
      
      const bannerName = new Date().toISOString() + "_" + previewBanner.name
      const public_id = new Date().toISOString() + "_" + previewBanner.name.split(".")[0]
      const image = new File([previewBanner], bannerName)
      formData.append('file', image)
      formData.append("upload_preset", "fiezyi1z");
      formData.append("public_id", public_id);
      formData.append("folder", "bez-blog/images");

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
        method: 'POST',
        body: JSON.stringify({title, description, content, tag,
          preview_image: bannerName
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const uploadImage = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/upload`, {
          method: 'POST',
          body: formData,
      })

      router.push('/');

  }

  return (
    <main className="flex min-h-screen flex-col items-center p-16 transition-colors duration-200 ease-in-out bg-white dark:bg-[#03001C] dark:text-white">
        <h1 className="text-xl text-bold p-6">Create Post</h1>
        <form className="w-1/3" onSubmit={onSubmit} encType="multipart/form-data" method="POST">
          <Tabs aria-label="Tabs with underline" style="underline" className="focus:none">
            <Tabs.Item active title="Detail">
            <div className="my-3">
              <label htmlFor="title" className="block mb-2 text-sm font-medium">Title</label>
              <input type="text" id="first_name" className="w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" placeholder="John" required onChange={(e) => setTitle(e.target.value)}></input>
            </div>
            <div className="my-3">
              <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
              <input type="text" id="description" className="w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" placeholder="John" required onChange={(e) => setDescription(e.target.value)}></input>
            </div>
            <div className="my-3">
              <label htmlFor="banner" className="block mb-2 text-sm font-medium">Preview Image</label>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="banner" name="file" type="file" onChange={(e) => {
                setPreviewBanner(e.target.files[0])
              }}></input>
              <div className="my-3">
                <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tag</label>
                <select id="tag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setTag(e.target.value)}>
                  <option value="none" selected disabled hidden>Select an tag</option>
                  <option value="Programming">Programming</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <p>Preview : </p>
                <div className="h-96 w-full my-5 relative overflow-hidden border rounded-md">
                  {previewBanner && <Image src={URL.createObjectURL(previewBanner)} alt="preview image" fill objectFit="cover" className='absolute' />}
                </div>
              </div>

            </div>
            </Tabs.Item>

            <Tabs.Item title="Content" className="my-3">
              <div>
                <label htmlFor="content" className="block mb-2 text-sm font-medium">Content</label>
                <textarea id="content" rows={5} className="block p-2.5 w-full text-sm w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Write your thoughts here..." onChange={(e) => {
                  setContent(e.target.value)
                }}></textarea>
              </div>
              <div className="">
                  <p className="block mb-2 text-sm font-medium my-3">Preview :</p>
                  <Markdown className="prose p-5 text-[rgb(3,0,28)] dark:text-white dark:prose-headings:text-white dark:prose-strong:text-white">{content}</Markdown>
              </div>
            </Tabs.Item>
          </Tabs>
          <button type="submit" className="p-3 border border-gray-300 rounded-md">Post</button>
        </form>
    </main>
  )
}