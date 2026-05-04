export interface DocSection {
  id: string;
  title: string;
  level: number;
  content?: string;
  sections?: DocSection[];
}

export interface DocChapter {
  id: string;
  title: string;
  emoji: string;
  level: number;
  sections: DocSection[];
  content: string;
}

export interface SearchResult {
  id: string;
  title: string;
  chapter: string;
  content: string;
  matches: string[];
}
