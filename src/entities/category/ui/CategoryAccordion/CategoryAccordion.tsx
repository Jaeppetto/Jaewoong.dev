import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/shared/shadcn-ui/ui/accordion'

import CategoryAccordionItem from './CategoryAccordionItem'
import { useCategoriesQuery } from '@/features'

interface CategoryAccordionProps {
  currentCategory: string
  currentPost: string
}

export const CategoryAccordion = ({
  currentCategory,
  currentPost
}: CategoryAccordionProps) => {
  const { data: categories } = useCategoriesQuery()

  return (
    <Accordion
      type="multiple"
      className="w-[16.5rem]"
      defaultValue={currentCategory ? [currentCategory] : []}>
      {categories?.map(category => (
        <AccordionItem
          value={category.slug}
          key={category.id}
          className="pb-4">
          <AccordionTrigger className="group/category-accordion-trigger bg-transparent py-0 pb-1 text-[1.6rem] font-normal leading-[2rem] text-slate-900 hover:no-underline">
            {category.name}
          </AccordionTrigger>
          <AccordionContent className="w-full bg-transparent">
            <CategoryAccordionItem
              category={category}
              currentPost={currentPost}
              currentCategory={currentCategory}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
