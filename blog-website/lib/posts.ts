import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "blogposts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResults = matter(fileContents);

    const blogPost: BlogPost = {
      id,
      title: matterResults.data.title,
      datePublished: matterResults.data.datePublished,
    };

    return blogPost;
  });

  return allPostsData.sort((a, b) => (
    new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime()
  ));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResults = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResults.content);

  const contentHtml = processedContent.toString();

  const blogPostWithHTML: BlogPost & { contentHtml: string } = {
    id,
    title: matterResults.data.title,
    datePublished: matterResults.data.datePublished,
    contentHtml,
  };

  return blogPostWithHTML;
}
