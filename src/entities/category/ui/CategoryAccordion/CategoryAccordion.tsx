import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/shadcn-ui/ui/accordion'

import CategoryAccordionItem from './CategoryAccordionItem'
import { useCategoriesQuery } from '@/features'

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
            <CategoryAccordionItem category={category} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
