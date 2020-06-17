import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import { siteUrl, siteTitle, siteLogo, siteTwitter } from '../../data/about'
import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/date'
import styles from './id.module.css'
import Schema from '../../data/schema/article'


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
    updatedData = updatedData.replace(regex10, postData.author);
    updatedData = updatedData.replace(regex11, postData.authorWebsite);
    updatedData = updatedData.replace(regex12, postData.authorImage);

    return(
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
                <meta name="twitter:creator" content={`@${postData.authorTwitter}`} />
                <meta name="twitter:title" content={postData.title}  />
                <meta name="twitter:description" content={postData.description} />
                <meta name="twitter:image" content={postData.image} />
                <script type="application/ld+json">
                    {updatedData}
                </script>
            </Head>
            <article className={styles.container}>
                <h2>{postData.title}</h2>
                <div className={utilStyles.lightText}>
                    <span> <p>{postData.author} &bull;  <Date dateString={postData.publishDate} /></p> </span> 
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} className={styles.mainContent}/>
            </article>
        </Layout>
    )
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