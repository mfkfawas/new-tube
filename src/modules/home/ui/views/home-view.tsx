import { CategoriesSection } from "../sections/categories-section"

interface HomeViewProps {
  categoryId?: string
}
// NOTE: In this pattern:
// View: It will be purely decorational, all its going to do is to split the screen into sections.
// And then section will be finally a client component which is going to leverage the prefetching form respective server component.
// The reason because of splitting to sections bcz each of the section will have their own suspense and err-boundary, so if any section crashes the entire View will not crash.
export const HomeView = ({ categoryId }: HomeViewProps) => {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <CategoriesSection categoryId={categoryId} />
    </div>
  )
}
