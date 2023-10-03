import {
  IBookSingleImage,
  IGetBookImageResponse,
} from "../types/Book/globalBookType";

const bookImageList: IBookSingleImage[] = [
  {
    imageLink:
      "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
    imageId: "iM1",
  },
  {
    imageLink: "https://blog.ipleaders.in/wp-content/uploads/2019/07/books.jpg",
    imageId: "iM2",
  },
  {
    imageLink:
      "https://images.pexels.com/photos/3728084/pexels-photo-3728084.jpeg?cs=srgb&dl=pexels-wallace-chuck-3728084.jpg&fm=jpg",
    imageId: "iM3",
  },
  {
    imageLink:
      "https://images.unsplash.com/photo-1524492514790-8310bf594ea4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZyZW5jaCUyMGJvb2t8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    imageId: "iM4",
  },
  {
    imageLink:
      "https://plus.unsplash.com/premium_photo-1681825216523-467a3623eeb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2xkJTIwYm9va3N8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
    imageId: "iM5",
  },
];

export const getBookImage = (id: string): IGetBookImageResponse => {
  const imageInfo: IBookSingleImage | undefined = bookImageList.find(
    (book) => book.imageId === id
  );
  const result = imageInfo
    ? {
        success: true,
        message: "image retrieved successfully",
        data: imageInfo,
      }
    : { success: false, message: "image retrieved failed", data: null };
  return result;
};
