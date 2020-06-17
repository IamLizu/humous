import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import { siteTitle } from '../../data/about'
import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/date'
import styles from './id.module.css'

export default function Post({ postData }) {
    return(
        <Layout>
            <Head>
                <title>{postData.title} | {siteTitle}</title>
            </Head>
            <article className={styles.container}>
                <h2>{postData.title}</h2>
                <div className={utilStyles.lightText}>
                    <span> <p>{postData.author} &bull;  <Date dateString={postData.date} /></p> </span> 
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