import Link from "next/link";
import {FaGithub, FaLinkedin, FaRegNewspaper} from "react-icons/fa6"

export default function Navbar() {
  return (
    <nav className="bg-slate-600 p-4 sticky top-0 drop-shadow-xl z-10">
      <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row">
        <h1 className="text-3xl font-bold text-white grid place-content-center mb-2 md:mb-0">
          <Link
            href="/"
            className="text-white/90 no-underline hover:text-white"
          >
            Rishabh Singh Blogs
          </Link>
        </h1>
        <div className="flex flex-row justify-center sm:justify-evenly align-middle gap-4 text-white text-4xl">
            <Link className="text-white/90 hover:text-white" href="https://github.com/Rishabh-Singh-Codes">
                <FaGithub />
            </Link>
            <Link className="text-white/90 hover:text-white" href="https://www.linkedin.com/in/rishabh8singh/">
                <FaLinkedin />
            </Link>
            <Link className="text-white/90 hover:text-white" href="https://rishabhsinghcodes.hashnode.dev/">
                <FaRegNewspaper />
            </Link>
        </div>
      </div>
    </nav>
  );
}
