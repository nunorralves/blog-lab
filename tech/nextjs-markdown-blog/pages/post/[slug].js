import Link from "next/link";
import Layout from "../../components/Layout";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

const Post = ({ title, frontmatter, markdownContent }) => {
  if (!frontmatter) {
    return <></>;
  }

  return (
    <Layout title={`${title} - ${frontmatter.title}`}>
      <Link href='/' passHref>
        <a>Back</a>
      </Link>
      <article>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.author}</p>
        <p>
          <ReactMarkdown source={markdownContent} />
        </p>
      </article>
    </Layout>
  );
};

export const getStaticProps = async ({ ...ctx }) => {
  const { slug } = ctx.params;

  const siteConfig = await import("../../site.config.json");
  const content = await import(`../../posts/${slug}.md`);
  const data = matter(content.default);

  return {
    props: {
      title: siteConfig.title,
      frontmatter: data.data,
      markdownContent: data.content,
    },
  };
};

export const getStaticPaths = async () => {
  const slugs = ((ctx) => {
    const keys = ctx.keys();
    const data = keys.map((key, index) => {
      return key.replace(/^.*[\\\/]/, "").slice(0, -3);
    });
    return data;
  })(require.context("../../posts", true, /\.md$/));

  const paths = slugs.map((slug) => `/post/${slug}`);

  return {
    paths,
    fallback: false,
  };
};

export default Post;
