import { useState } from "react";
import "./App.css";
import useData from "./api/index";
import NestedList from "./components/ChaptersList/ChaptersList";
import ChapterComponent from "./components/ChaptersContent/ChaptersContent";
import { Chapter } from "./shared_types/Chapter.types";

function App() {
  const { data, isLoading, isError } = useData();
  const [highlightedChapter, sethighlightedChapter] = useState<Chapter>();
  const [elementsWithSameLevel, setElementsWithSameLevel] = useState<Chapter[]>([]);

  const handleItemClick = (chapter: Chapter) => {
    sethighlightedChapter(chapter);
    const chapters = data.content.document.filter(
      (item: Chapter) =>
        item.level === chapter.level + 1 && item.parent_id === chapter.id
    );
    setElementsWithSameLevel(chapters.length > 0 ? chapters : [chapter]);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
      <h1 className="text-center font-black text-xl my-5">
        Propylon Assessment
      </h1>
      <div className="container">
        <NestedList
          chapters={data.content.document}
          onItemClick={handleItemClick}
          highlightedChapter={highlightedChapter}
        />
        <div className="content p-4 border ml-3">
          <div className="text-xl font-black">{highlightedChapter?.name}</div>
          {elementsWithSameLevel.map((element) => (
            <ChapterComponent
              key={element.name}
              onClick={() => sethighlightedChapter(element)}
              chapter={element}
              highlightedChapter={highlightedChapter}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
