import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChapterContentProps } from "./ChaptersContent.types";

const Component: React.FC<ChapterContentProps> = ({
  chapter,
  onClick,
  highlightedChapter,
}) => {
  return (
    <Card
      onClick={() => onClick(chapter)}
      className={
        highlightedChapter?.id === chapter.id
          ? "bg-purple-950 text-white my-5"
          : "bg-white my-5"
    }
    >
      <CardHeader>
        <CardTitle>{chapter.name}</CardTitle>
        <CardDescription>{chapter.content}</CardDescription>
      </CardHeader>
    </Card>
  );
};
export default Component;
