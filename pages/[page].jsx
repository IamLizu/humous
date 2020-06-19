import Head from 'next/head'
import { siteTitle } from '../data/info'
import Layout from '../components/layout'
import { getAllPageIds, getPageData } from '../lib/pages'
import LayoutStyle from '../components/layout.module.css'

export default function Page({ pageData }) {
    return(
        <Layout>
            <Head>
                <title>{pageData.title} | {siteTitle}</title>
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