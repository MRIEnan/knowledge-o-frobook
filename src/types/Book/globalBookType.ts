export type IReview = {
  _id?: string;
  bookId: string;
  userId: IUser;
  review: string;
  rating: number;
  createdAt: string;
};

export type IUser = {
  _id?: string;
  id?: string;
  email: string;
  userName: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  needsPasswordChange?: true | false;
  passwordChangedAt?: Date;
};
export type IBook = {
  _id: string;
  accessIds: {
    _id: string;
    id?: string;
    email: string;
    userName: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    needsPasswordChange?: true | false;
    passwordChangedAt?: Date;
  };
  imageLink: string;
  title: string;
  description: string;
  author: string[];
  publicationDate: string;
  genre: string;
  createdAt: string;
  modifiedAt: string;
};
export type IBookString = {
  _id: string;
  accessIds: string;
  imageLink: string;
  title: string;
  description: string;
  author: string[];
  publicationDate: string;
  genre: string;
  createdAt: string;
  modifiedAt: string;
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

export type IErrorMessage = {
  path: string;
  message: string;
};

export type IErrorMessages = {
  errorMessages: IErrorMessage[];
};

export type IErrorResponse = {
  success: boolean;
  stack?: string;
  errorMessages?: IErrorMessages;
  message: string;
};

export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data: T | null;
};

export type IWishlist = {
  _id: string;
  userId: {
    _id: string;
    id?: string;
    email: string;
    userName: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    needsPasswordChange?: true | false;
    passwordChangedAt?: Date;
  };
  bookId: {
    _id: string;
    accessIds: string | IUser;
    imageLink: string;
    title: string;
    description: string;
    author: string[];
    publicationDate: string;
    genre: string;
    createdAt: string;
    modifiedAt: string;
  };
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ILoginResponse = {
  accessToken: string;
  needsPasswordChange: string;
};
