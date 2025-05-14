"use client";

import { http } from "@/shared/services/mainAxios";
import { NewsItem, NewsParams, PaginatedResponse } from "@/types/News/NewsItem";
import { useQuery } from "@tanstack/react-query";

export function useNews(params: NewsParams = {}) {
  const queryKey = ["news", params];

  const query = useQuery<PaginatedResponse<NewsItem>>({
    queryKey,
    queryFn: () =>
      http
        .get<PaginatedResponse<NewsItem>>("/news/", {
          params: {
            page: params.page,
            page_size: params.page_size,
          },
        })
        .then((res) => res.data),
    keepPreviousData: true,
  });

  return query;
}
