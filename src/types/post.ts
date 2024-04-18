type Post = {
  id: string,
  uuid: string,
  title: string,
  slug: string,
  html: string,
  feature_image: string|null,
  featured: boolean,
  excerpt: string
}

export default Post