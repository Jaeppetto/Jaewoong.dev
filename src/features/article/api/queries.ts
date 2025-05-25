import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi } from '@/shared/api/posts'
import { useNavigate } from '@tanstack/react-router'
import { Post, PostInsert, PostUpdate, PostWithRelations } from '@/entities'

export const postKeys = {
  all: ['posts'] as const,
  paginatedAll: (page: number, pageSize: number) =>
    ['posts', 'paginated', page, pageSize] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  byCategory: (categoryId: string) =>
    [...postKeys.lists(), { categoryId }] as const,
  byCategorySlug: (categorySlug: string, page: number, pageSize: number) =>
    [...postKeys.lists(), { categorySlug, page, pageSize }] as const
}

export const usePostBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: postKeys.detail(slug),
    queryFn: () => postApi.getBySlug(slug),
    enabled: !!slug
  })
}

export const usePostsQuery = () => {
  return useQuery<PostWithRelations[]>({
    queryKey: postKeys.lists(),
    queryFn: postApi.getAll
  })
}

export const usePostQueryById = (id: string) => {
  return useQuery<PostWithRelations>({
    queryKey: postKeys.detail(id),
    queryFn: () => postApi.getById(id),
    enabled: !!id
  })
}

export const usePostsByCategoryQuery = (categoryId: string) => {
  return useQuery<PostWithRelations[]>({
    queryKey: postKeys.byCategory(categoryId),
    queryFn: () => postApi.getByCategoryId(categoryId),
    enabled: !!categoryId
  })
}

export const usePostsByCategorySlugQuery = (
  categorySlug: string | undefined,
  page: number = 1,
  pageSize: number = 4
) => {
  return useQuery<{ data: PostWithRelations[]; total: number }>({
    queryKey: categorySlug
      ? postKeys.byCategorySlug(categorySlug, page, pageSize)
      : postKeys.paginatedAll(page, pageSize),
    queryFn: async () => {
      const data = await (categorySlug
        ? postApi.getByCategorySlug(categorySlug, page, pageSize)
        : postApi.getPaginatedAll(page, pageSize))
      return {
        data: data.data,
        total: data.total
      }
    }
  })
}

export const useCreatePost = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation<PostWithRelations, Error, PostInsert>({
    mutationFn: (post: PostInsert) => postApi.create(post),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      navigate({
        to: '/article/$category/$postTitle',
        params: {
          category: data.categories?.slug ?? '',
          postTitle: data.slug
        }
      })
    }
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation<Post, Error, PostUpdate & { id: string }>({
    mutationFn: postApi.update,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(data.id) })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      if (data.category_id) {
        queryClient.invalidateQueries({
          queryKey: postKeys.byCategory(data.category_id)
        })
      }
    }
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: postApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    }
  })
}

export const useTogglePostPublished = () => {
  const queryClient = useQueryClient()

  return useMutation<Post, Error, { id: string; currentState: boolean }>({
    mutationFn: ({ id, currentState }) =>
      postApi.togglePublished(id, currentState),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(data.id) })
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
      if (data.category_id) {
        queryClient.invalidateQueries({
          queryKey: postKeys.byCategory(data.category_id)
        })
      }
    }
  })
}
