import { http } from "@/shared/services/mainAxios";
import { Image, Paginated } from "@/types/Files/useFiles";
import type { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export function useImages(category?: string) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, any> = { page };
      if (category) params.category = category;
      const res: AxiosResponse<Paginated<Image>> = await http.get("/files/", {
        params,
      });
      setImages(res.data.results);
    } finally {
      setLoading(false);
    }
  }, [category, page]);

  useEffect(() => {
    load();
  }, [load]);

  const deleteImage = useCallback(
    async (id: string) => {
      await http.delete(`/files/${id}/`);
      await load();
    },
    [load]
  );

  const updateImage = useCallback(
    async (id: string, title: string) => {
      await http.patch(`/files/${id}/`, { title });
      await load();
    },
    [load]
  );

  return {
    images,
    loading,
    page,
    setPage,
    reload: load,
    deleteImage,
    updateImage,
  };
}
