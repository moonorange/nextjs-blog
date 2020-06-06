import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hi, My name is Keigo Kida. I was born and raised in Osaka, Japan. I currently live in Tokyo and work as a software engineer in a start-up.</p>
        <p>
          <a href="https://github.com/moonorange" target="_blank">Github</a>
          <tr></tr>
          <a href="https://www.linkedin.com/in/keigo-k-70557314b/" target="_blank">Linkedin</a>
        </p>
      </section>
    </Layout>
  )
}
