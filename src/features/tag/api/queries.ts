import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions
} from '@tanstack/react-query'
import { tagApi } from '@/shared/api/tags'
import { PostWithRelations, Tag, TagInsert, TagUpdate } from '@/entities'

export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (filters: string) => [...tagKeys.lists(), { filters }] as const,
  details: () => [...tagKeys.all, 'detail'] as const,
  detail: (id: string) => [...tagKeys.details(), id] as const,
  bySlug: (slug: string) => [...tagKeys.details(), { slug }] as const,
  postsWithTag: (tagSlug: string) =>
    [...tagKeys.all, 'posts', tagSlug] as const,
  postsWithTagPaginated: (tagSlug: string, page: number, pageSize: number) =>
    [...tagKeys.all, 'posts', tagSlug, page, pageSize] as const,
  postTags: (postId: string) => [...tagKeys.all, 'post', postId] as const
}

export const useTagsQuery = () => {
  return useQuery<Tag[]>({
    queryKey: tagKeys.lists(),
    queryFn: tagApi.getAll
  })
}

export const useTagQuery = (id: string) => {
  return useQuery<Tag>({
    queryKey: tagKeys.detail(id),
    queryFn: () => tagApi.getById(id),
    enabled: !!id
  })
}

export const useTagBySlugQuery = (slug: string) => {
  return useQuery<Tag>({
    queryKey: tagKeys.bySlug(slug),
    queryFn: () => tagApi.getBySlug(slug),
    enabled: !!slug
  })
}

export const usePostTagsQuery = (postId: string) => {
  return useQuery<Tag[]>({
    queryKey: tagKeys.postTags(postId),
    queryFn: () => tagApi.getPostTags(postId),
    enabled: !!postId
  })
}

export const usePostsByTagQuery = (tagSlug: string) => {
  return useQuery({
    queryKey: tagKeys.postsWithTag(tagSlug),
    queryFn: () => tagApi.getPostsByTag(tagSlug),
    enabled: !!tagSlug
  })
}

export const usePostsByTagPaginatedQuery = (
  tagSlug: string,
  page: number = 1,
  pageSize: number = 4,
  options?: UseQueryOptions<{ data: PostWithRelations[]; total: number }>
) => {
  return useQuery<{ data: PostWithRelations[]; total: number }>({
    queryKey: tagKeys.postsWithTagPaginated(tagSlug, page, pageSize),
    queryFn: () => tagApi.getPostsByTagPaginated(tagSlug, page, pageSize),
    enabled: !!tagSlug,
    ...options
  })
}

export const useCreateTag = () => {
  const queryClient = useQueryClient()

  return useMutation<Tag, Error, TagInsert>({
    mutationFn: tagApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() })
    }
  })
}

export const useUpdateTag = () => {
  const queryClient = useQueryClient()

  return useMutation<Tag, Error, TagUpdate & { id: string }>({
    mutationFn: tagApi.update,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: tagKeys.detail(data.id) })
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() })
    }
  })
}

export const useDeleteTag = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: tagApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() })
    }
  })
}

export const useUpdatePostTags = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { postId: string; tagIds: string[] }>({
    mutationFn: ({ postId, tagIds }) => tagApi.updatePostTags(postId, tagIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: tagKeys.postTags(variables.postId)
      })
      queryClient.invalidateQueries({ queryKey: tagKeys.all })
    }
  })
}
