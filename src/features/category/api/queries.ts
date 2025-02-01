import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { categoryApi } from '@/shared/api/categories'
import { Category, CategoryInsert, CategoryUpdate } from '@/entities'

export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (filters: string) => [...categoryKeys.lists(), { filters }] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const
}

export const useCategoriesQuery = () => {
  return useQuery<Category[]>({
    queryKey: categoryKeys.lists(),
    queryFn: categoryApi.getAll
  })
}

export const useCategoryQuery = (id: string) => {
  return useQuery<Category>({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryApi.getById(id),
    enabled: !!id
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<Category, Error, CategoryInsert>({
    mutationFn: categoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    }
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<Category, Error, CategoryUpdate & { id: string }>({
    mutationFn: categoryApi.update,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.detail(data.id) })
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    }
  })
}

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: categoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() })
    }
  })
}
