import matter from "gray-matter";
import Layout from "../components/Layout";
import PostList from "../components/PostList";

const Index = ({ title, description, posts, ...props }) => {
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <p>{description}</p>
      <main>
        <PostList posts={posts} />
      </main>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const siteConfig = await import("../site.config.json");

  const posts = ((context) => {
    const keys = context.keys();
    const values = keys.map(context);

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, "").slice(0, -3);
      const value = values[index];
      const document = matter(value.default);
      return {
        slug,
        frontmatter: document.data,
        markdownContent: document.content,
      };
    });
    return data;
  })(require.context("../posts", true, /\.md$/));

  return {
    props: {
      title: siteConfig.title,
      description: siteConfig.description,
      posts,
    },
  };
};

export default Index;
