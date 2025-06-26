export interface IGame {
  id: number;
  title: string;
  release_date: string;
  cover_image_url: string;
  description: string;
  publisher_id?: number;
}
