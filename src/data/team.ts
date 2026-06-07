export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

import bismarkImg from '../assets/team/bismark.jpg';
import michaelImg from '../assets/team/michael.jpg';
import haygoodImg from '../assets/team/haygood.jpg';
import eyraImg from '../assets/team/eyra.jpg';
import christianaImg from '../assets/team/christiana.jpg';
import annaImg from '../assets/team/anna-enyonam.jpg';
import dzidonuImg from '../assets/team/dzidonu.jpg';
import barnabasImg from '../assets/team/barnabas.jpg';
import comfortImg from '../assets/team/comfort.jpg';
import elizabethImg from '../assets/team/elizabeth.jpg';
import francisImg from '../assets/team/francis.jpg';
import sammyImg from '../assets/team/sammy.jpg';
import evelynImg from '../assets/team/evelyn.jpg';

export const teamMembers: TeamMember[] = [
  { id: '1', name: "Bismark Fiifi Tetteh", role: "Chairman", image: bismarkImg },
  { id: '2', name: "Michael Fosu", role: "Vice Chairman (F&A)", image: michaelImg },
  { id: '3', name: "Haygood Newman Gbedzeker", role: "General Secretary", image: haygoodImg },
  { id: '4', name: "Eyra Arnong", role: "Deputy General Secretary", image: eyraImg },
  { id: '5', name: "Christiana Dziedzorm Kwadzoti", role: "Treasurer", image: christianaImg },
  { id: '6', name: "Anna Enyonam Awuku", role: "Financial Secretary", image: annaImg },
  { id: '7', name: "Dzidonu Afako", role: "Organizer", image: dzidonuImg },
  { id: '8', name: "Barnabas Ladzaglah", role: "Deputy Organizer", image: barnabasImg },
  { id: '9', name: "Comfort Akorfa Akpese", role: "Women Organizer", image: comfortImg },
  { id: '10', name: "Elizabeth Dziedzorm Bokor", role: "Women Organizer", image: elizabethImg },
  { id: '11', name: "Francis Ladzaglah", role: "Publicity, Information and Education", image: francisImg },
  { id: '12', name: "Sammy Atani", role: "Chief of Staff", image: sammyImg },
  { id: '13', name: "Evelyn Awusi Fosu", role: "Marketing/Protocols Manager", image: evelynImg },
];
