import Layout from '../../components/layout'
import { getAllPostIds, getPostData, postData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import styled from 'styled-components';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import Highlight from 'react-highlight';
import ReactMarkdown from 'react-markdown';


interface CodeBlockProps {
  value: any;
}

const Blockquote = styled.blockquote.attrs({
  className: "my-8 py-4 px-4 bg-white border-l-2 border-primary-700 text-primary-900 shadow rounded-lg"
})``;

const OrderedList = styled.ol.attrs({
  className: "list-disc bg-white text-primary-900 my-6 py-4 pl-12 pr-6 rounded-lg shadow"
})``;

const Code = styled.code`
  font-size: 90%;
  line-height: 1.2em;
  font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
  display: inline;
  color: #555555;
  padding: 1em 1em;
  background: #f4f4f4;
`;

const inlineCode = styled.code.attrs({
  className: "bg-gray-300 text-primary-900 text-base my-0 py-0 pl-2 pr-2 rounded-lg shadow-xs"
})``;

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
