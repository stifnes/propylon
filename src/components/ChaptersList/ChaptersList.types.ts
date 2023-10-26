import {Chapter} from '../../shared_types/Chapter.types'

export interface NestedChapterProps {
  chapters: Chapter[],
  onItemClick: (chapter: Chapter) => void;
  highlightedChapter?: Chapter;
}