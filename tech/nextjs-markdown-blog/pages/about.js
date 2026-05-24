import Layout from "../components/Layout";

const About = ({ title, description, ...props }) => {
  return (
    <Layout title={`${title} - About`}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>This is my About Page!</p>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const siteConfig = await import("../site.config.json");

  return {
    props: {
      title: siteConfig.title,
      description: siteConfig.description,
    },
  };
};

export default About;
