import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi, PostInsert } from '@/shared/api/posts'
import { useNavigate } from '@tanstack/react-router'

export const postKeys = {
  all: ['posts'] as const,
  lists: () => [...postKeys.all, 'list'] as const,
  list: (filters: string) => [...postKeys.lists(), { filters }] as const,
  details: () => [...postKeys.all, 'detail'] as const,
  detail: (id: string) => [...postKeys.details(), id] as const,
  byCategory: (categoryId: string) =>
    [...postKeys.lists(), { categoryId }] as const
}

export const usePostsQuery = () => {
  return useQuery({
    queryKey: postKeys.lists(),
    queryFn: postApi.getAll
  })
}

export const usePostQuery = (id: string) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => postApi.getById(id),
    enabled: !!id
  })
}

export const usePostsByCategoryQuery = (categoryId: string) => {
  return useQuery({
    queryKey: postKeys.byCategory(categoryId),
    queryFn: () => postApi.getByCategoryId(categoryId),
    enabled: !!categoryId
  })
}

export const useCreatePost = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (post: PostInsert) => postApi.create(post),
    onSuccess: data => {
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

  return useMutation({
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

  return useMutation({
    mutationFn: postApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() })
    }
  })
}
