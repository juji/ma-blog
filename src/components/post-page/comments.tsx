'use client'

import Giscus from '@giscus/react';
import { 
  NEXT_PUBLIC_GITHUB_REPO,
  NEXT_PUBLIC_GITHUB_REPO_ID,
  NEXT_PUBLIC_GITHUB_CATEGORY,
  NEXT_PUBLIC_GITHUB_CATEGORY_ID,
} from '@/lib/constants'

export default function Comments() {
  return (<div style={{paddingTop: '3rem'}}>
    <Giscus
      repo={NEXT_PUBLIC_GITHUB_REPO as `${string}/${string}`}
      repoId={NEXT_PUBLIC_GITHUB_REPO_ID as string}
      category={NEXT_PUBLIC_GITHUB_CATEGORY}
      categoryId={NEXT_PUBLIC_GITHUB_CATEGORY_ID}
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