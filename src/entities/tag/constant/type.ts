export interface Tag {
  created_at: string | null
  id: string
  name: string
  slug: string
}

export interface TagInsert {
  created_at?: string | null
  id?: string
  name: string
  slug: string
}

export interface TagUpdate {
  created_at?: string | null
  id?: string
  name?: string
  slug?: string
}

export interface PostTag {
  post_id: string
  tag_id: string
}

export interface PostTagInsert {
  post_id: string
  tag_id: string
}

export interface PostTagUpdate {
  post_id?: string
  tag_id?: string
}
