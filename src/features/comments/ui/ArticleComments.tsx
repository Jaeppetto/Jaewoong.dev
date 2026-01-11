import Giscus from '@giscus/react'

type ArticleCommentsProps = {
  pathname: string
}

const ArticleComments = ({ pathname }: ArticleCommentsProps) => {
  return (
    <Giscus
      repo="Jaeppetto/Jaewoong.dev"
      repoId="R_kgDOM_-7rQ"
      category="Comments"
      categoryId="DIC_kwDOM_-7rc4C00wo"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="1"
      inputPosition="bottom"
      theme="light"
      lang="ko"
      loading="lazy"
      term={pathname}
    />
  )
}

export default ArticleComments
