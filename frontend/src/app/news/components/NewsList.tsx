"use client";

import { NewsItem } from "@/types/News/NewsItem";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import NewsItemCard from "./NewsItemCard";

interface NewsListProps {
  items: NewsItem[];
}

export default function NewsList({ items }: NewsListProps) {
  return (
    <List disablePadding>
      <Typography variant="h5" gutterBottom align="center">
        BBC News
      </Typography>
      {items.map((item, idx) => (
        <NewsItemCard
          key={item.guid}
          item={item}
          isLast={idx === items.length - 1}
        />
      ))}
    </List>
  );
}
