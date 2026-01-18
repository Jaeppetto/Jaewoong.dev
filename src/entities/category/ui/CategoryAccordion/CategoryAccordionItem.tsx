import { usePostsByCategoryQuery } from '@/features/article/api/queries'
import Button from '@/shared/shadcn-ui/ui/button'
import generateSlug from '@/shared/util/generateSlug'

import { useNavigate } from '@tanstack/react-router'
import { Category } from '../../constant'
import { NewArticleBadge } from '@/entities/article'
import dayjs from 'dayjs'
import { cn } from '@/shared/shadcn-ui/util'

interface CategoryAccordionItemProps {
  category: Category
  currentPost: string
  currentCategory: string
}

const CategoryAccordionItem = ({
  category,
  currentPost,
  currentCategory
}: CategoryAccordionItemProps) => {
  const navigate = useNavigate()
  const { data: posts } = usePostsByCategoryQuery(category.id)

  return (
    <ul className="space-y-2">
      {posts?.map(post => (
        <li key={post.id}>
          <Button
            variant="link"
            className="flex w-full items-center justify-start gap-2 bg-transparent px-0 pl-4 !text-body3 font-normal transition-all hover:translate-x-1 hover:font-bold hover:no-underline"
            onClick={() => {
              navigate({
                to: '/article/$category/$postTitle',
                params: {
                  category: category.slug,
                  postTitle: generateSlug(post.title)
                }
              })
            }}>
            <span
              className={cn(
                'truncate',
                currentCategory === category.slug &&
                  currentPost === generateSlug(post.title) &&
                  'font-bold'
              )}>
              {post.title}
            </span>

            {dayjs(post.created_at).isValid() &&
              dayjs(post.created_at).isAfter(dayjs().subtract(2, 'week')) && (
                <NewArticleBadge />
              )}
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default CategoryAccordionItem
