import {Chapter} from '../../shared_types/Chapter.types'

export interface ChapterContentProps {
  chapter: Chapter,
  onClick: (chapter: Chapter) => void;
  highlightedChapter?: Chapter;
}