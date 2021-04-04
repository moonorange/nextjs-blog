import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown';


interface CodeBlockProps {
  value: any;
}

interface postData {
  content: string;
  title: string;
  date: string;
}

const CodeBlock: NextPage<CodeBlockProps> = ({ value }) => {
  return (
    <div>
      <Highlight>
        {value}
      </Highlight>
      <br />
    </div>
  )
}

export default function Post(postData : postData)
{
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div>
          <ReactMarkdown
            source={postData.content}
            renderers={{
              code: CodeBlock
            }}
          />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const result = await getPostData(params.id as string)
  return {
    props: {
      content: result.content,
      title: result.data.title,
      date: result.data.date,
    }
  }
}
