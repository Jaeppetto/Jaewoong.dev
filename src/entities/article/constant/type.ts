import { Category } from '@/entities/category'
import { Tag } from '@/entities/tag'

export interface Post {
  author_id: string | null
  category_id: string | null
  content: string
  created_at: string | null
  description: string | null
  id: string
  published: boolean | null
  slug: string
  title: string
  updated_at: string | null
  thumbnail: string | null
}

export interface PostInsert {
  author_id?: string | null
  category_id?: string | null
  content: string
  created_at?: string | null
  description?: string | null
  id?: string
  published?: boolean | null
  slug: string
  title: string
  updated_at?: string | null
  thumbnail?: string | null
}

export interface PostUpdate {
  author_id?: string | null
  category_id?: string | null
  content?: string
  created_at?: string | null
  description?: string | null
  id?: string
  published?: boolean | null
  slug?: string
  title?: string
  updated_at?: string | null
  thumbnail?: string | null
}

export interface PostWithRelations extends Post {
  categories?: Pick<Category, 'id' | 'name' | 'slug'> | null
  tags?: Pick<Tag, 'id' | 'name' | 'slug'>[]
}
