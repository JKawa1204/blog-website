import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./Blogcard"

export const SingleBlog = ({ blog }: {blog: Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12 py-32 px-32 bg-slate-50">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold font-serif py-20">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-4 font-sans">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 pt-20 pl-10 ">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="pr-4 flex flex-col justify-center">
                            <Avatar size="big" name={blog.author.name || "Anonymous"} />
                        </div>
                        <div>
                            <div className="text-xl font-bold ">
                                {blog.author.name || "Anonymous"}
                            </div>
                            <div className="pt-2 text-slate-500">
                                 Spinning Yarns, One Word at a Time.
                            </div>
                        </div>
                    </div>  
                </div>
                
            </div>
        </div>
    </div>
}