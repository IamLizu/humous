import Head from 'next/head'
import { siteTitle, siteTagLine } from '../data/info'
import Layout from '../components/layout'
import { useEffect } from 'react'
import { annotate } from 'rough-notation';
import { getSortedPostData } from '../lib/posts'
import utilStyle from '../styles/utils.module.css'
import { Media } from 'reactstrap'
import Link from 'next/link'
import Date from '../components/date'

export async function getStaticProps() {
    const allPostsData = getSortedPostData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Home({ allPostsData }) {
    useEffect(() => {
        const e = document.getElementById('blogHeader');
        const annotation = annotate(e, { type: 'underline', color: '#8484D5' });
        annotation.show();
    })

    return(
        <Layout home>
            <Head>
                <title>{siteTitle} | {siteTagLine}</title>
            </Head>
            <section className={utilStyle.blogContainer}>
                <h5 id="blogHeader" className={utilStyle.blogHeader}>Latest Posts</h5>

                <div className={utilStyle.blogStream}>
                    {allPostsData.map(({ id, publishDate, title, author }) => {
                        if (publishDate) {
                            return(
                                <Link href="/posts/[id]" as={`/posts/${id}`} key={id}>
                                    <a className={utilStyle.noundURI}>
                                        <Media className={utilStyle.blogItem}>
                                            <Media body>
                                                <Media heading>
                                                    {title}
                                                </Media>
                                                    <small className={utilStyle.lightText}>
                                                        <span> <p>{author} &bull;  <Date dateString={publishDate} /></p> </span> 
                                                    </small>
                                            </Media>
                                        </Media>
                                    </a>
                                </Link>
                            )
                        }
                    })}
                </div>
            </section>
        </Layout>
    )
}