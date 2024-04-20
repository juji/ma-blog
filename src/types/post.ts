// Ghost
type Post = {
  id: string,
  uuid: string,
  title: string,
  slug: string,
  html: string,
  feature_image: string|null,
  featured: boolean,
  excerpt: string,
  published_at: string,
  updated_at: string
}

export default Post