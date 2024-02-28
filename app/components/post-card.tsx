import Link from "next/link"
import Image from "next/image";
import Tag from "./tag";
import { Modal } from 'flowbite-react';
import { useState } from "react"
import { useRouter } from 'next/navigation';

interface Props {
    _id: string;
    title: string;
    author: string;
    created_at: Date;
    description: string;
    preview_image: string;
    tag: string,
};

export default function Home({ _id, title, author, created_at, description, preview_image, tag }: Props) {

   const deletePost = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${_id}`, {
        method: 'DELETE',
    })
    const destroy = await fetch(`${process.env.NEXT_PUBLIC_IMAGE_API_URL}/destroy`, {
        method: 'POST',
        body: JSON.stringify({
            "public_id": `bez-blog/images/${preview_image.substring(0, preview_image.lastIndexOf("."))}`
        })
    })
    setDel(true)
    setOpenModal(false)
  }

const [openModal, setOpenModal] = useState<boolean>(false);
const [del, setDel] = useState<boolean>(false);

  return (
    <div className={`flex mx-4 md:mx-auto my-3 w-96 max-w-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md shadow-[#03001C] ${del && 'hidden'}`}>
       <div className="flex items-start">
          <div className="">
            <div className="h-56 w-full my-5 relative overflow-hidden">
                    <Image src={`${process.env.NEXT_PUBLIC_IMAGE_DISPLAY}/${preview_image}`} 
                        alt="preview"
                        fill
                        objectFit="cover"
                        className='absolute hover:scale-105 transition-all'
                    />
                </div>
             <div className="px-6 pt-2 pb-6">
               <div className="mb-3">
                  <Tag tag={tag} />
               </div>
               <div>
                  <Link href={`/posts/${_id}`}><h2 className="text-xl font-bold dark:text-white mt-1">{title}</h2></Link>
               </div>
               <h2 className="mt-3 dark:text-white text-xs font-semibold">
                  {author} | {new Date(created_at.toString()).toLocaleDateString('th-TH')}
               </h2>
               <p className="mt-3 dark:text-white text-sm">
                  {description}
               </p>
               <div className="mt-4 flex items-center gap-x-3">
                  <button className="text-red-500 border border-red-500 rounded-md px-3 py-1 hover:bg-red-500 hover:text-white transition-all duration-100" onClick={() => setOpenModal(true)}>Delete</button>
                  <button className="text-gray-900 dark:text-white px-3 py-1 border border-gray-900 dark:border-white rounded-md hover:bg-gray-900 hover:text-white transition-all duration-100">Edit</button>
               </div>
            </div>
          </div>
       </div>
       <Modal show={openModal} onClose={() => setOpenModal(false)}>
         <Modal.Header className="border-none">Do you want to delete this ?</Modal.Header>
         <Modal.Footer className="flex justify-end border-none"> 
            <button className="text-red-500 border border-red-500 rounded-md px-3 py-1 hover:bg-red-500 hover:text-white transition-all duration-100" onClick={() => deletePost()}>Delete</button>
         </Modal.Footer>
       </Modal>
    </div>
  )
}