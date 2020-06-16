import Head from 'next/head'
import { siteTitle, siteTagLine } from '../data/about'
import Layout from '../components/layout'
import { useEffect } from 'react'
import { annotate } from 'rough-notation';
import { getSortedPostData } from '../lib/posts'
import utilStyle from '../styles/utils.module.css'
import { Media } from 'reactstrap'

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
        const annotation = annotate(e, { type: 'box', color: '#8484D5' });
        annotation.show();
    })

    return(
        <Layout home>
            <Head>
                <title>{siteTitle} | {siteTagLine}</title>
            </Head>
            <section className={utilStyle.blogContainer}>
                <h5 id="blogHeader">Latest Posts</h5>

                <div className={utilStyle.blogStream}>
                    {allPostsData.map(({ id, date, title, author }) => (
                        <Media key={id} className={utilStyle.blogItem}>
                            <Media body>
                                <Media heading>
                                    {title}
                                </Media>
                                {author} &bull; {date} 
                            </Media>
                        </Media>
                    ))}
                </div>
            </section>
        </Layout>
    )
}