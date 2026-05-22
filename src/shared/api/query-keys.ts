export const queryKeys = {
  pokemon: {
    all: ["pokemon"] as const,
    list: (page: number, search: string) => ["pokemon", "list", page, search] as const,
    detail: (name: string) => ["pokemon", "detail", name] as const,
  },
  comments: {
    all: ["comments"] as const,
  },
  posts: {
    all: ["posts"] as const,
  },
} as const;
