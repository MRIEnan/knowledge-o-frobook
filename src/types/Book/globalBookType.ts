export type IBook = {
  _id: string;
  user_id: string;
  imageLink: string;
  title: string;
  description: string;
  author: string;
  publicationDate: string;
  genre: string;
  createdAt: string;
  reviews: [
    {
      userId: string;
      review: string;
      rating: number;
      createdAt: Date;
    }
  ];
};

export type IBookSingleImage = {
  imageLink: string;
  imageId: string;
};

export type IGetBookImageResponse = {
  success: boolean;
  message: string;
  data: IBookSingleImage | null;
};
