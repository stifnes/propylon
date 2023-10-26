import { useState } from 'react';
import './App.css';
import useData from './api/index';
import NestedList from './components/ChaptersList/ChaptersList'
import { Chapter } from './shared_types/Chapter.types';

function App() {
  const { data, isLoading, isError } = useData();
  const [highlightedChapter, sethighlightedChapter] = useState<Chapter>();
  const [elementsWithSameLevel, setElementsWithSameLevel] = useState<Chapter[]>([]);

  const handleItemClick = (chapter: Chapter) => {
    sethighlightedChapter(chapter);
    const chapters = data.content.document.filter((item: Chapter) => item.level === chapter.level + 1 && item.parent_id === chapter.id)
    if(chapters.length > 0) {
      setElementsWithSameLevel(chapters)
    } else {
      setElementsWithSameLevel([chapter])
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <>
        Propylon Assessment
        <div className='container'>
          <NestedList chapters={data.content.document} onItemClick={handleItemClick} highlightedChapter={highlightedChapter}/>
          <div className='content p-4 border m-3'>
          <div className='text-xl font-black'>{highlightedChapter?.name}</div>
            {elementsWithSameLevel.map((element) => (
              <div key={element.id} onClick={() => sethighlightedChapter(element)}>
                <h2 className='text-lg font-bold mt-3'> {element.name}</h2>
                <p className={highlightedChapter?.id === element.id ? 'bg-slate-400' : 'bg-white'}>{element.content}</p>
              </div>
            ))}
          </div>
        </div>
    </>
  )

}

export default App
