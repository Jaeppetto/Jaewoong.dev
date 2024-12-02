import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/ui/accordion'
import { useCategoriesQuery } from '../api/queries'
import { usePostsByCategoryQuery } from '@/features/article/api/queries'

export const CategoryAccordion = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery()

  if (categoriesLoading) return <div>Loading categories...</div>

  return (
    <Accordion type="multiple">
      {categories?.map(category => (
        <AccordionItem
          value={category.id}
          key={category.id}>
          <AccordionTrigger>{category.name}</AccordionTrigger>
          <AccordionContent>
            <CategoryPosts categoryId={category.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const CategoryPosts = ({ categoryId }: { categoryId: string }) => {
  const { data: posts, isLoading: postsLoading } =
    usePostsByCategoryQuery(categoryId)

  if (postsLoading) return <div>Loading posts...</div>

  return <ul>{posts?.map(post => <li key={post.id}>{post.title}</li>)}</ul>
}
