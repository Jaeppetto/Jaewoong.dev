import { usePostsByCategoryQuery } from '@/features/article/api/queries'
import { Category } from '@/shared/api/categories'
import Button from '@/shared/shadcn-ui/ui/button'

import { useNavigate } from '@tanstack/react-router'

interface CategoryAccordionItemProps {
  category: Category
}

const CategoryAccordionItem = ({ category }: CategoryAccordionItemProps) => {
  const navigate = useNavigate()
  const { data: posts } = usePostsByCategoryQuery(category.id)

  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id}>
          <Button
            variant="link"
            onClick={() => {
              navigate({
                to: '/article/$category/$postTitle',
                params: {
                  category: category.slug,
                  postTitle: post.title
                }
              })
            }}>
            {post.title}
          </Button>
        </li>
      ))}
    </ul>
  )
}

export default CategoryAccordionItem
