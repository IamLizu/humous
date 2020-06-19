const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const pagesDirectory = path.join(process.cwd(), '../data/pages');
const fileNames =  fs.readdirSync(pagesDirectory);

const allPagesData = fileNames.map(fileName => {

    const page = fileName.replace(/\.md$/, '')

    const fullPath = path.join(pagesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      page,
      ...matterResult.data
    }
  })

const jsonIn = JSON.stringify(allPagesData);
fs.writeFileSync('../data/pages/allPages.json', jsonIn)