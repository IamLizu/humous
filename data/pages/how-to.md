---
title: 'How To'
order: '1'
---
### How to use [`humous`](https://humous.iamlizu.com/)
Hello there! You have been floating around and wondering how this works, well, follow along!

##### First Things First
Before getting into anything, let's change what needs to be changed first. Go to `data` and open `info.js` and edit the variable values. For example,

```
export const siteTitle = "My Awesome Blog"
export const siteUrl = "https://myawesome.blog"
export const siteLogo = "https://myawesome.blog/icon.png"
export const siteTagLine = "My Awesome Blog is best!"
export const siteTwitter = "@myawesomeblog"
```

Please not that, these information are very crucial for your site and SEO. Down the road, you will see some other information like these (in [yaml](https://yaml.org/)), please make sure to set them properly, per page or post, as needed.

##### Pages
To add a page to your blog, please create a [Markdown](https://en.wikipedia.org/wiki/Markdown) file and add it to the `data/pages` directory. You may design your page however you see fit using markdown, but make sure to include these yaml data: `title` and `order`. Also <u>name your file as you want the page slug to be</u>. For example, if you are adding a _Contact_ page and you want it to load like `yoursite.com/contact` then save your file as `contact.md`. And add the `title` and `order` on top of the file like this,  
```
---
title: 'Contact'
order: '4'
---
```
Here, as the name suggest, `title` will be used as the title of your page. And `order` defines where in the main menu this page appears. For example, if you add a page with _order 0_, and another with _order 1_ then the one with smaller value will get a high priority. To demonstrate more, let's say your _About_ page has `order` 0, and _Contact_ page has `order` 1, then the _About_ will come before _Contact_ in the menu.  

* Leave the order empty to exclude the page from main menu, for example,
```
---
title: 'Contact'
order: 
---
```

* Please <u>do not set same `order` for multiple pages</u>. And set the `order` value with quotation (`''`).  
* After you add a page, make sure to build your application again. Or if you are working in development server, re-run the server.  

##### Posts
Just like the pages, you will write your post in markdown, and save your post as you want its slug to be. Make sure to save your posts in `data/posts` and include these yaml data (`title`, `author`, `description`, `image`, `publishDate`, `modifyDate`, `tags`) in all the posts. These yaml data will help improving the visibility of your article to the search engines. Let's look at an example,

```
---
title: 'Hello World!'
author: 'iamlizu'
description: 'Just checking our new application'
image: 'https://static.iamlizu.com/img/038/hello-world.png'
publishDate: '2020-06-10'
modifyDate: '2020-06-10'
tags: 'Testing, Meta'
---
```

* To unpublish any post, remove the `publishDate` field or its value. This will make the post disappear from the post stream. And will cause 404 if tried to access the post manually. For example,
```
---
title: 'Hello World!'
author: 'iamlizu'
description: 'Just checking our new application'
image: 'https://static.iamlizu.com/img/038/hello-world.png'
publishDate: 
modifyDate: '2020-06-10'
tags: 'Testing, Meta'
---
```
Here, you understand `title` is your post title. But `author` here is NOT your name. It is your [GitHub](https://github.com) username, you will get to know why github, in a bit. `description` is the short description of your article, between 50-160 characters. `image` is the featured image of the article, the one which will appear on top of the article and will be used for [SEO](https://en.wikipedia.org/wiki/Search_engine_optimization) also. `publishDate` is when you publish your article, and `modifyDate` is when you last modified your article. If you are first time publishing your article then keep both the date same. The `tags` specifies the categories / section your article is about.  

In `humous`, we are using your GitHub username as author, because it makes things very simple. Let me explain, for SEO purpose, we need a lot of information about author to generate [structured data](https://developers.google.com/search/docs/guides/intro-structured-data) for the article. For example, author name, image, website. And we also need your [Twitter](https://twitter.com) username to generate [Twitter card](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/abouts-cards) for the article. Now that's a lot of information, right? Yeah, luckily, you can set all of these information in your GitHub account and thanks to [GitHub API](https://developer.github.com/v3/), we can get them from GitHub. I hope you realize how much time it can save for you or your authors when they are publishing any post. We just saved them typing irritating yaml data over and over LOL.