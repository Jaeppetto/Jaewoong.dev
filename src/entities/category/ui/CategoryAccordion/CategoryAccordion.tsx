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
          className="border-slate-200">
          <AccordionTrigger className="bg-transparent py-[1.6rem] text-[1.4rem] font-normal leading-[2rem] text-slate-900 hover:bg-slate-50 hover:no-underline">
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
