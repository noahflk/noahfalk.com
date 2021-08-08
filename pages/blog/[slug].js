import { useRouter } from "next/router";
import { getFileBySlug, getFiles } from "utils/mdx";
import { MDXLayoutRenderer } from "components/MDXComponents";

const DEFAULT_LAYOUT = "PostLayout";

export default function Blog({ post }) {
  console.log("----------");
  console.log(post.frontMatter);
  const { isFallback } = useRouter();
  const { mdxSource, frontMatter } = post;

  if (isFallback || !post) {
    return <div>Loading...</div>;
  }

  return (
    <MDXLayoutRenderer layout={frontMatter.layout || DEFAULT_LAYOUT} mdxSource={mdxSource} frontMatter={frontMatter} />
  );
}

export const getStaticPaths = async () => {
  const posts = await getFiles();

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ""),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const post = await getFileBySlug(params.slug);

    if (post.frontMatter.draft) {
      throw Error("Rendering of draft not allowed");
    }

    return { props: { post, slug: params.slug } };
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
    return { notFound: true };
  }
};
