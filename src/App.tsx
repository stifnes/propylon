import { useState } from "react";
import "./App.css";
import {useData} from "./api/index";
import NestedList from "./components/ChaptersList/ChaptersList";
import ChapterComponent from "./components/ChaptersContent/ChaptersContent";
import { Chapter } from "./shared_types/Chapter.types";
import { useQuery } from 'react-query';

function App() {
  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ["chapters"],
      queryFn: () => useData(),
      initialData: () => {},
      cacheTime: 0,
      onSuccess: (data) => sethighlightedChapter(data.content.document[0])
    }
  );

  const [highlightedChapter, sethighlightedChapter] = useState<Chapter>();
  const [chaptersWithSameLevel, setChaptersWithSameLevel] = useState<Chapter[]>([]);

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data.</div>;
  }

  const handleItemClick = (chapter: Chapter) => {
    sethighlightedChapter(chapter);
    const chapters = data.content.document.filter(
      (item: Chapter) =>
        item.level === chapter.level + 1 && item.parent_id === chapter.id
    );
    setChaptersWithSameLevel(chapters.length > 0 ? chapters : [chapter]);
  };


  return (
    <>
      <h1 className="text-center font-black text-xl my-5">
        Propylon Assessment
      </h1>
      <div className="container flex ml-0 mr-0 ">
        <NestedList
          chapters={data.content.document}
          onItemClick={handleItemClick}
          highlightedChapter={highlightedChapter}
        />
        <div className="content flex-1 ml-5">
          <div className="text-xl font-black">{highlightedChapter?.name}</div>
          {chaptersWithSameLevel.map((chapter) => (
            <ChapterComponent
              key={chapter.name}
              onClick={() => {sethighlightedChapter(chapter), setChaptersWithSameLevel([chapter])}}
              chapter={chapter}
              highlightedChapter={highlightedChapter}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
