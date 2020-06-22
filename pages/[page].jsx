import Head from 'next/head'
import { siteTitle, siteTagLine, siteUrl, siteLogo, siteTwitter } from '../data/info'
import Layout from '../components/layout'
import { getAllPageIds, getPageData } from '../lib/pages'
import LayoutStyle from '../components/layout.module.css'

export default function Page({ pageData }) {
    return(
        <Layout>
            <Head>
                <title>{pageData.title} | {siteTitle}</title>
                <meta property="og:url"                content={`${siteUrl}/${pageData.page}`} />
                <meta property="og:type"               content="website" />
                <meta property="og:title"              content={`${pageData.title} | ${siteTitle}`} />
                <meta property="og:description"        content={siteTagLine} />
                <meta property="og:image"              content={siteLogo} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={siteTwitter} />
                <meta name="twitter:creator" content={siteTwitter} />
                <meta name="twitter:title" content={`${pageData.title} | ${siteTitle}`}  />
                <meta name="twitter:description" content={siteTagLine} />
                <meta name="twitter:image" content={siteLogo} />
                <link rel="canonical" href={`${siteUrl}/${pageData.page}`} />
            </Head>
            <div dangerouslySetInnerHTML={{__html: pageData.contentHtml}} className={LayoutStyle.container} />
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPageIds()

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const pageData = await getPageData(params.page)
    return {
        props: {
            pageData
        }
    }
}