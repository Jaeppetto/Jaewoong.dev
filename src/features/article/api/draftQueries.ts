import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { draftsApi, type DraftInsert } from '@/shared/api/drafts';

export const useSaveDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (draft: DraftInsert) => draftsApi.save(draft),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drafts'] });
    },
  });
};

export const useGetDraft = (authorId: string, draftType: 'auto' | 'manual') => {
  return useQuery({
    queryKey: ['drafts', authorId, draftType],
    queryFn: () => draftsApi.get(authorId, draftType),
    enabled: !!authorId,
  });
};

export const useGetAllDrafts = (authorId: string) => {
  return useQuery({
    queryKey: ['drafts', authorId],
    queryFn: () => draftsApi.getAll(authorId),
    enabled: !!authorId,
  });
};

export const useDeleteDraft = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => draftsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drafts'] });
    },
  });
};

export const useDeleteDraftByType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ authorId, draftType }: { authorId: string; draftType: 'auto' | 'manual' }) =>
      draftsApi.deleteByAuthorAndType(authorId, draftType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drafts'] });
    },
  });
};