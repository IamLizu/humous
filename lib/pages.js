import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const pagesDirectory = path.join(process.cwd(), 'data/pages')

export function getAllPageIds() {
  const fileNames = fs.readdirSync(pagesDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        page: fileName.replace(/\.md$/,'')
      }
    }
  })
}

export async function getPageData(page) {
    const fullPath = path.join(pagesDirectory, `${page}.md`)

    const fileContents = fs.readFileSync(fullPath, 'utf-8')
  
    const matterResult = matter(fileContents)
  
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    
    const contentHtml = processedContent.toString()
  
    return {
      page,
      contentHtml,
      ...matterResult.data
    }
  }