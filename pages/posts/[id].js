import Layout from '../../componetns/layout'
import { getAllPostsIds, getPostData } from '../../lib/posts'


export default functon Post({ postData }) {
    return (
        <Layout>
        {postData.titile}
        <br />
        {postData.id}
        <br />
        {postData.date}
    )   </Layout>
}

export async function getStaticPaths() {
    const paths = getAllPostsIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
