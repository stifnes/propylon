import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { Chapter } from "../../shared_types/Chapter.types";
import { NestedChapterProps } from "./ChaptersList.types";

const NestedList: React.FC<NestedChapterProps> = ({
  chapters,
  onItemClick,
  highlightedChapter,
}) => {
  const buildNestedHierarchy = (
    chapters: Chapter[],
    parent_id: string | null,
    level: number
  ) => {
    return chapters
      .filter(
        (chapter) => chapter.parent_id === parent_id && chapter.level === level
      )
      .map((chapter) => (
        <Accordion type="single" collapsible key={chapter.name}>
          <AccordionItem value={chapter.id}>
            <AccordionTrigger
              onClick={() => onItemClick(chapter)}
              className={cn(
                chapter.level === 3 ? "pl-10" : "pl-6",
                highlightedChapter?.id === chapter.id
                  ? "bg-purple-200"
                  : "bg-white"
              )}
            >
              {chapter.name}
            </AccordionTrigger>
            <AccordionContent>
              {buildNestedHierarchy(chapters, chapter.id, chapter.level + 1)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ));
  };

  const rootElements = chapters.filter((chapter) => chapter.level === 1);

  return (
    <div>
      {rootElements.map((chapter) => (
        <Accordion
          type="single"
          className="border-t"
          collapsible
          key={chapter.name}
        >
          <AccordionItem value={chapter.id}>
            <AccordionTrigger
              className={
                highlightedChapter?.id === chapter.id
                  ? "bg-purple-200"
                  : "bg-white"
              }
              onClick={() => onItemClick(chapter)}
            >
              {chapter.name}
            </AccordionTrigger>
            <AccordionContent>
              {buildNestedHierarchy(chapters, chapter.id, chapter.level + 1)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default NestedList;
