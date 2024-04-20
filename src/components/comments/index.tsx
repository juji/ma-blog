import Giscus from '@giscus/react';

export default function MyApp() {
  return (
    <Giscus
      repo={process.env.GITHUB_REPO as `${string}/${string}`}
      repoId={process.env.GITHUB_REPO_ID as string}
      category={process.env.GITHUB_CATEGORY}
      categoryId={process.env.GITHUB_CATEGORY_ID}
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  );
}