import heroJersey from "@/assets/hero-jersey.jpg";
import jerseyBlue from "@/assets/jersey-blue.jpg";
import jerseyWhite from "@/assets/jersey-white.jpg";
import jerseyYellow from "@/assets/jersey-yellow.jpg";
import jerseyGreen from "@/assets/jersey-green.jpg";
import jerseyMaroon from "@/assets/jersey-maroon.jpg";

export type Condition = "Mint" | "Excellent" | "Good" | "Fair";

export type Jersey = {
  id: string;
  club: string;
  season: string;
  league: string;
  size: "S" | "M" | "L" | "XL";
  condition: Condition;
  price: number;
  certiScore: number;
  swap: boolean;
  image: string;
  story: string;
  seller: { name: string; country: string; rating: number; verified: boolean };
};

export const jerseys: Jersey[] = [
  {
    id: "athletic-1984",
    club: "Athletic Bilbao",
    season: "1984 Home",
    league: "La Liga",
    size: "L",
    condition: "Excellent",
    price: 420,
    certiScore: 96,
    swap: true,
    image: heroJersey,
    story:
      "Worn during the title-winning 1983/84 La Liga campaign. Faint number traces remain on the back — a quiet trace of history.",
    seller: { name: "Mikel Aranzabal", country: "Spain", rating: 4.9, verified: true },
  },
  {
    id: "italia-1994",
    club: "Italy National Team",
    season: "1994 Home",
    league: "International",
    size: "M",
    condition: "Mint",
    price: 680,
    certiScore: 99,
    swap: true,
    image: jerseyBlue,
    story: "Iconic Azzurri shirt from USA '94. Roberto Baggio era. Deadstock condition with original tags.",
    seller: { name: "Lorenzo Conti", country: "Italy", rating: 5.0, verified: true },
  },
  {
    id: "madrid-2002",
    club: "Real Madrid",
    season: "2002 Centenary",
    league: "La Liga",
    size: "L",
    condition: "Excellent",
    price: 540,
    certiScore: 94,
    swap: false,
    image: jerseyWhite,
    story: "Centenary edition with gold trim. Released for the club's 100-year anniversary.",
    seller: { name: "Diego Herrera", country: "Spain", rating: 4.8, verified: true },
  },
  {
    id: "dortmund-1997",
    club: "Borussia Dortmund",
    season: "1997 Home",
    league: "Bundesliga",
    size: "M",
    condition: "Good",
    price: 310,
    certiScore: 88,
    swap: true,
    image: jerseyYellow,
    story: "Champions League winning season. Light vintage wear consistent with age.",
    seller: { name: "Markus Weber", country: "Germany", rating: 4.7, verified: false },
  },
  {
    id: "celtic-1988",
    club: "Celtic FC",
    season: "1988 Centenary",
    league: "Scottish Premier",
    size: "L",
    condition: "Excellent",
    price: 380,
    certiScore: 92,
    swap: true,
    image: jerseyGreen,
    story: "Celtic's centenary season double winners. Hallmark hooped silhouette in solid block.",
    seller: { name: "Sean O'Connor", country: "Scotland", rating: 4.9, verified: true },
  },
  {
    id: "westham-1980",
    club: "West Ham United",
    season: "1980 FA Cup",
    league: "Premier League",
    size: "M",
    condition: "Good",
    price: 290,
    certiScore: 87,
    swap: true,
    image: jerseyMaroon,
    story: "FA Cup winning campaign shirt. Claret and blue, the Hammers' enduring identity.",
    seller: { name: "James Whitlock", country: "England", rating: 4.6, verified: true },
  },
];

export const findJersey = (id: string) => jerseys.find((j) => j.id === id);