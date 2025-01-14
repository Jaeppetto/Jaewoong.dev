export interface Category {
  created_at: string | null
  id: string
  name: string
  slug: string
}

export interface CategoryInsert {
  created_at?: string | null
  id?: string
  name: string
  slug: string
}

export interface CategoryUpdate {
  created_at?: string | null
  id?: string
  name?: string
  slug?: string
}
