
import { Link } from "react-router-dom"

interface Blogcardprops{
    authorname: string,
    title: string,
    content: string,
    publishedDate: string,
    id:number
}

export const Blogcard = ({  authorname, title,  content, publishedDate , id} : Blogcardprops) => {
    return <Link to={`/blogs/${id}`}>
    <div className="border-b border-slate-200 pb-4 pt-8 pl-8 pr-8 cursor-pointer">
        
        <div className="flex p-4">
            <div className=" flex justify-center flex-col">
                    < Avatar name={authorname} />
            </div>
            <div className="font-light pl-2 text-weight-100 text-slate-700 font-serif"> {authorname} </div>
            <div className="flex justify-center flex-col pl-2">
            <Circle />
            </div>
            <div className="font-extralight pl-2 text-slate-500 font-serif"> {publishedDate} </div>
        </div>        
        <div className="font-serif font-bold text-2xl py-2 pl-5">
            {title}
        </div>
        <div className="font-serif text-lg pl-5 text-gray-500">
            {content.slice(0,100) + "..."}
        </div>
        <div className=" py-2 pl-5 text-slate-400 font-light text-medium">
            {`${Math.ceil(content.length / 1000)} minute(s) read`}
        </div>
        
    </div>
    </Link>
}

export function Avatar ( {name , size = "small"} : {name : string ,size? : "small" | "big"}) {
    return <>
        <div className={` relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-300 ${size==="small" ? "h-6 w-6" : "h-10 w-10"}`}>
        <span className={` text-gray-400 dark:text-gray-700 ${size==="small" ? "text-xs" : "text-medium"}`}>{name[0]}</span>
        </div>
    </>
}

export function Circle(){
    return <div className="rounded-full h-1 w-1 bg-gray-300">

    </div>
    
}