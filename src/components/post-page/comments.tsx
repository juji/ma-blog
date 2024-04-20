'use client'

import Giscus from '@giscus/react';

export default function Comments() {
  return (<div style={{paddingTop: '3rem'}}>
    <Giscus
      repo={process.env.NEXT_PUBLIC_GITHUB_REPO as `${string}/${string}`}
      repoId={process.env.NEXT_PUBLIC_GITHUB_REPO_ID as string}
      category={process.env.NEXT_PUBLIC_GITHUB_CATEGORY}
      categoryId={process.env.NEXT_PUBLIC_GITHUB_CATEGORY_ID}
      mapping="pathname"
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
      loading="lazy"
    />
  </div>);
}