export interface SiteData {
    name: string;
    url: string;
}

//demo data
export const siteData: SiteData[] = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'Facebook', url: 'https://www.facebook.com' },
    { name: 'Twitter', url: 'https://www.twitter.com' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com' },
    { name: 'GitHub', url: 'https://www.github.com' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com' },
    { name: 'Reddit', url: 'https://www.reddit.com' },
    { name: 'YouTube', url: 'https://www.youtube.com' },
    { name: 'Instagram', url: 'https://www.instagram.com' },
    { name: 'Pinterest', url: 'https://www.pinterest.com' },
    { name: 'Medium', url: 'https://medium.com' },
];


export interface NoteData {
  title: string;
  des: string;
}

export const noteData: NoteData[] = [
  {
    title: "Movie",
    des: "Harry Potter",
  },
  {
    title: "Study",
    des: "Read Contract Law chapter 5",
  },
  {
    title: "Project",
    des: "Finish the React notes application",
  },
  {
    title: "Book",
    des: "Read The Alchemist",
  },
];
