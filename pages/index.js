import React from "react";
import { Heading, Flex, Stack, SimpleGrid, Box } from "@chakra-ui/react";

import Layout from "components/Layout";
import BlogPostPreview from "components/BlogPostPreview";
import ProjectCard from "components/ProjectCard";
import useColors from "hooks/useColors";
import { getAllFilesFrontMatter } from "utils/mdx";

const Index = ({ posts }) => {
  const { secondaryTextColor } = useColors();

  return (
    <Layout>
      <Stack
        as="main"
        spacing={8}
        justifyContent="center"
        alignItems="flex-start"
        m="0 auto 4rem auto"
        maxWidth="800px"
      >
        <Flex flexDirection="column" mb={8} justifyContent="flex-start" alignItems="flex-start" maxWidth="700px">
          <Heading letterSpacing="tight" mb={4} as="h1" size="2xl">
            Hi, I’m Noah{" "}
            <span role="img" aria-label="Waving hand">
              👋
            </span>
          </Heading>
          <Heading color={secondaryTextColor} as="h2" size="sm">
            I'm a full-stack web developer and maker based in Switzerland{" "}
            <span role="img" aria-label="Swiss flag">
              🇨🇭
            </span>
          </Heading>
        </Flex>
        <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-start" maxWidth="700px" width="100%">
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Recent Posts
          </Heading>
          {!posts.length && "No posts found."}
          {posts.map((frontMatter) => {
            return <BlogPostPreview key={frontMatter.title} {...frontMatter} />;
          })}
        </Flex>
        <Box width="100%">
          <Heading letterSpacing="tight" mb={4} size="xl" fontWeight={700}>
            Projects
          </Heading>
          <SimpleGrid minChildWidth="250px" spacing="30px" alignContent="center">
            <ProjectCard
              title="Audiocasts"
              description="🎧 Platform to host RSS podcast feeds for your audiobooks"
              link="https://github.com/noahflk/audiocasts"
              background="linear-gradient(108deg, #4158D0 0%, #C850C0 65%)"
            />
            <ProjectCard
              title="React Relaxed"
              description="🐢 React Hooks for debouncing and throttling inputs"
              link="https://github.com/noahflk/react-relaxed"
              background="linear-gradient(200deg, #fdcc10 0%, #ed17ad 100%)"
            />
          </SimpleGrid>
        </Box>
      </Stack>
    </Layout>
  );
};

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter();

  return {
    props: { posts: posts.slice(0, 3) },
  };
}

export default Index;
