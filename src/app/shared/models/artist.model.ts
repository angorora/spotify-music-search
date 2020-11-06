export interface Artist {
  id: string;
  images: Image[];
  name: string;
  href: string;
  genres: string[];
  albums: Album[];
}
export interface Image {
  height: number;
  url: string;
  width: string;
}
export interface Album {
  name: string;
  id: string;
  release_date?: string;
  images?: Image[];
  tracks?: Track[];
  artists?: Artist[];
}
export interface Track {
  name: string;
  artists: Artist[];
  preview_url: string;
}
