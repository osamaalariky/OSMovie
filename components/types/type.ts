
export interface IMainState {
    page: number;
    searchValue: string;
    searchMoviePage: number;
    colorMode: TThemeMode;
}

export type TProductionCompanies = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

export interface ApiResponse<T> {
    ok: boolean;
    data: T;
    totalPages?: number;
  }

  export interface MovieApiResponse {
    results: Movie[]; 
    page: number;
    total_pages: number;
    total_results: number;
}


export interface Movie {
    id: number;
    title: string;
    vote_average: number;
    release_date?: string;
    poster_path: string;
    rating?: number
}

export interface Rating {
    id: number;
    title: string;
    vote_average: number;
    release_date?: string;
    poster_path: string;
    rating: number
}

export interface MovieInfo {
    adult: boolean;
    backdrop_path: string | null;
    id: number;
    media_type?: string;  
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
export interface NullableApiResponse<T> {
    ok: boolean;
    data: T | null; 
    totalPages?: number;
}

export type RootStackParamList = {
    HomeTab: undefined;
  Login: undefined;
  Profile: undefined;
    MovieDetails: {
        movieId: number; 
      };
      Home: undefined;
  ProfileTab: undefined;
  Watchlist: undefined;
  RatedList: undefined;

};

export type MovieDetailsRouteParams = {
    movieId: number;
  };
  
  export type MovieDetailsProps = {
    route: {
      params: MovieDetailsRouteParams;
    };
  };
  export interface Review {
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string | null;
      rating: number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }
  
  export interface ReviewApiResponse {
    results: Review[];
    total_pages: number;
  }
  
  export interface MovieReviewResponse extends ApiResponse<Review[]> {
    totalPages: number;
  }

  export interface RequestTokenResponse {
    success: boolean;
    expires_at: string;
    request_token: string;
  }
  
  export interface ValidateTokenResponse {
    success: boolean;
    request_token: string;
  }
  
  export interface SessionResponse {
    success: boolean;
    session_id: string;
  }
  export interface User {
    username: string;
    sessionId?: string;
  }

  export interface UserDetail {
    id?: number;
    username?: string;
    name?: string;
    iso_639_1?: string;
    iso_3166_1?: string;
    avatar?: {
      gravatar?: {
        hash: string;
      };
      tmdb?: {
        avatar_path: string | null;
      };
    };
    include_adult?: boolean;
  }

  export interface AccountResponse {
    id: number;
    username: string;
    name?: string;
    avatar?: {
        gravatar: {
            hash: string;
        };
    };
    iso_639_1?: string;
    iso_3166_1?: string;
}

  export interface AccountDetails {
    id: number; 
    username: string;
  }


  export type ApiFunction<T, Args extends any[]> = (...args: Args) => Promise<ApiResponse<T>>;
export type TThemeMode = 'light' | 'dark'