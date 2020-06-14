import Head from 'next/head'
import { siteTitle, siteTagLine } from '../data/about'
import Layout from '../components/layout'

export default function Home() {
    return(
        <Layout home>
            <Head>
                <title>{siteTitle} | {siteTagLine}</title>
            </Head>
        </Layout>
    )
}