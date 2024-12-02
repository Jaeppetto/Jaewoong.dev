import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/ui/accordion'
import { useCategoriesQuery } from '../api/queries'

export const CategoryAccordion = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useCategoriesQuery()

  if (categoriesLoading) return <div>Loading categories...</div>

  return (
    <Accordion type="multiple">
      {categories?.map(category => (
        <AccordionItem value={category.id}>
          <AccordionTrigger>{category.name}</AccordionTrigger>
          <AccordionContent>
            <div>Posts..</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
