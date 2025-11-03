export interface MovieInterface {
  _id: string;
  title: string;
  description: string;
  duration: number;
  releaseDate: string;
  genres: string[];
  cast: MovieCastInterface[];
  director: string;
  production: string;
  distribution: string;
  coverImage: string;
  trailer: string;
}

interface MovieCastInterface {
  name: string;
  characterName: string;
}

export interface CinemaInterface {
  _id: string;
  name: string;
  location: string;
  auditoriums: AuditoriumInterface[];
  openingHour: number;
  closingHour: number;
  email: string;
  parking: boolean;
  admin: string;
}

export interface AuditoriumInterface {
  _id: string;
  number: number;
  capacity: number;
  seatLayout: {
    rows: number;
    seatsPerRow: number;
  };
  screenSize: string;
  soundSystem: string;
  projection: string;
}

export interface ScreeningInterface {
  _id: string;
  auditorium: AuditoriumInterface;
  movie: MovieInterface;
  cinema: CinemaInterface;
  date: string;
  startTime: number;
  pricing: number;
  language: string;
  subtitle: string;
}

export interface UserInterface {
  address: string;
  createdAt: string;
  dateOfBirth: string;
  gender: string;
  isAdmin: boolean;
  phoneNumber: string;
  username: string;
}

export interface TicketInterface {
  screening: ScreeningInterface;
  customer: string;
  seat: {
    row: number;
    number: number;
  };
  totalPrice: number;
  pricingCategory: "standard" | "student";
}
