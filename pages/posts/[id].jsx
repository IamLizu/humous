import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import { siteUrl, siteTitle, siteLogo, siteTwitter } from '../../data/info'
import Date from '../../components/date'
import styles from './id.module.css'
import Schema from '../../schema/article'
import { useEffect, useState } from 'react'


export default function Post({ postData }) {
    const regex0 = /articleTitle/gi;
    const regex1 = /articleImgURL/gi;
    const regex2 = /articleURL/gi;
    const regex3 = /articleDesc/gi;
    const regex4 = /articleModDate/gi;
    const regex5 = /articlePubDate/gi;
    const regex6 = /articleSecR/gi;
    const regex7 = /publisherName/gi;
    const regex8 = /publisherURL/gi;
    const regex9 = /publihserImgURL/gi;
    const regex10 = /authorName/gi;
    const regex11 = /authorURL/gi;
    const regex12 = /authorImgURL/gi;

    let updatedData = Schema.replace(regex0, postData.title);
    updatedData = updatedData.replace(regex1, postData.image);
    updatedData = updatedData.replace(regex2, `${siteUrl}/posts/${postData.id}`);
    updatedData = updatedData.replace(regex3, postData.description);
    updatedData = updatedData.replace(regex4, postData.modifyDate);
    updatedData = updatedData.replace(regex5, postData.publishDate);
    updatedData = updatedData.replace(regex6, postData.tags);
    updatedData = updatedData.replace(regex7, siteTitle);
    updatedData = updatedData.replace(regex8, siteUrl);
    updatedData = updatedData.replace(regex9, siteLogo);

    const showHashtags = tags => {
        if(tags){
            let articleTags = tags
            let tagArr = articleTags.split(',')
            let hashtags = []
            tagArr.forEach(tag => {
                let hashtag =  tag.trim()
                hashtags.push('#'+ hashtag + ' ')
            });
            return hashtags
        }
    }

    const [user, setUser] = useState({})
    const [schema, setSchema] = useState('')
    const [authorTwitter, setTwitterU] = useState('')

    const getUser = async () => {
        try {
            const rawData = await fetch(`https://api.github.com/users/${postData.author}`)
            const userData = await rawData.json()  
            setUser(userData)
            updatedData = updatedData.replace(regex10, userData.name);
            updatedData = updatedData.replace(regex11, userData.blog);
            updatedData = updatedData.replace(regex12, userData.avatar_url);
            setTwitterU(userData.twitter_username)
            setSchema(updatedData)
        } catch {
            console.log("couldn't fetch userdata")
        }
    }

    useEffect(() => {
        if (!postData.publishDate) {
            window.location="/404"
        }
        getUser()
    }, [])
    
    const post = postData.publishDate? (
        <Layout>
            <Head>
                <title>{postData.title} | {siteTitle}</title>
                <meta property="og:url"                content={`${siteUrl}/posts/${postData.id}`} />
                <meta property="og:type"               content="article" />
                <meta property="og:title"              content={postData.title} />
                <meta property="og:description"        content={postData.description} />
                <meta property="og:image"              content={postData.image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={siteTwitter} />
                <meta name="twitter:creator" content={`@${authorTwitter}`} />
                <meta name="twitter:title" content={postData.title}  />
                <meta name="twitter:description" content={postData.description} />
                <meta name="twitter:image" content={postData.image} />
                <link rel="canonical" href={`${siteUrl}/posts/${postData.id}`} />
                <script type="application/ld+json">
                    {schema}
                </script>
            </Head>
            <article className={styles.container}>
                {postData.image? (
                    <img src={postData.image} alt={postData.title} className={styles.image}/>
                ) : (
                    <></>
                )}
                <h2>{postData.title}</h2>
                <div className={styles.postInfoBar1}>
                    <p>{postData.tags? (
                        <span className={styles.postTags}>{showHashtags(postData.tags)}</span>
                    ) : (
                        <></>
                    )} <span className={styles.postPubDate}>Published on <Date dateString={postData.publishDate} /></span></p>
                    <a className={styles.postAuthor} target="_blank" href={user.blog}><p className={styles.postAuthorBox}><span><img className={styles.authorImage} src={user.avatar_url} alt={postData.author} width="45px"/></span> &nbsp; <b>{user.name}</b></p></a>
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} className={styles.mainContent}/>
            </article>
        </Layout>
    ) : (
    <>
        {/* Not available */}
    </>)

    return(post)
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}