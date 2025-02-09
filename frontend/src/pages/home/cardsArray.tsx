import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";
import mapimg1 from "./mapimg/1.webp";
import mapimg2 from "./mapimg/2.webp";
import mapimg3 from "./mapimg/3.webp";
import mapimg4 from "./mapimg/4.jpg";
import mapimg5 from "./mapimg/5.jpg";
import australia from "./travelimg/australia.webp";
import australia2 from "./travelimg/australia2.webp";
import australia3 from "./travelimg/australia3.webp";
import australia4 from "./travelimg/australia4.webp";
import bhutan from "./travelimg/Bhutan.webp";
import bhutan2 from "./travelimg/bhutan2.jpeg";
import bhutan3 from "./travelimg/bhutan3.webp";
import bhutan4 from "./travelimg/bhutan4.jpeg";


import greece from "./travelimg/greece.webp";
import greece2 from "./travelimg/greece2.webp";
import greece3 from "./travelimg/greece3.webp";
import greece4 from "./travelimg/greece4.webp";
import italy from "./travelimg/italy.webp";
import italy2 from "./travelimg/italy2.webp";
import italy3 from "./travelimg/italy3.webp";
import italy4 from "./travelimg/italy4.webp";
import japan from "./travelimg/japan.webp";
import japan2 from "./travelimg/japan2.webp";
import japan3 from "./travelimg/japan3.webp";
import japan4 from "./travelimg/japan4.webp";
import maldives from "./travelimg/maldives.webp";
import maldives2 from "./travelimg/maldives2.webp";
import maldives3 from "./travelimg/maldives3.webp";
import maldives4 from "./travelimg/maldives4.webp";
import nepal1 from "./travelimg/nepal1.jpeg";
import nepal2 from "./travelimg/nepal2.webp";
import nepal3 from "./travelimg/nepal3.jpeg";
import nepal4 from "./travelimg/nepal4.webp";
import norway from "./travelimg/norway.webp";
import norway2 from "./travelimg/norway2.webp";
import norway3 from "./travelimg/norway3.webp";
import norway4 from "./travelimg/norway4.webp";
import paris from "./travelimg/paris.webp";
import paris2 from "./travelimg/paris2.webp";
import paris3 from "./travelimg/paris3.webp";
import paris4 from "./travelimg/paris4.webp";
import pkr1 from "./travelimg/pkr1.jpg";
import pkr2 from "./travelimg/pkr2.jpeg";
import pkr3 from "./travelimg/pkr3.png";
import pkr4 from "./travelimg/pkr4.jpeg";

const cards = [
  {
    size: 2,
    title:'',
    p: "OPEN A WORLD OF POSSIBILITIES with Pack&Go",
    button: "Browse by destination",
    img: img1,
  },
  {
    size: 1,
    title: "Save up to $200 per person",
    p: "Take advantage of special discounts and save big on your dream getaway.",
    button: "Browse by destination",
    img: "",
  },
  {
    size: 1,
    title: "Off-season travel with Pack&Go",
    p: "Enjoy peace and quiet while traveling during the off-season. Great deals await you!",
    button: "Find your off-season tour",
    img: img3,
  },
  {
    size: 1,
    title: "Grand Tours with Pack&Go",
    p: "Pack&Go’s Grand Tours offer once-in-a-lifetime experiences. Make your travel dreams come true.",
    button: "Shop Grand Tours",
    img: img4,
  },
  {
    size: 1,
    title: "New & trending destinations",
    p: "Discover the hottest spots around the world. Be the first to explore these trending locations.",
    button: "Check out what's new",
    img: img5,
  },
];

const sliderCards = [
  {
    title: "Experiential travel made easy with Pack&Go",
    description: "You dream it. We’ll take care of every last detail.",
    button: "Find out how we do it",
  },
  {
    title: "Pick your perfect trip",
    description: "Explore our wide selection of trips that fit your style, budget, and interests.",
    button: "",
  },
  {
    title: "Put just $299 down",
    description: "Lock in your dream vacation today with just a small deposit.",
    button: "",
  },
  {
    title: "Prep your packing list with Pack&Go",
    description: "We’ve got you covered! Our packing guide will make sure you’re all set.",
    button: "",
  },
  {
    title: "Say bon voyage with Pack&Go",
    description: "With Pack&Go, every step of your journey is taken care of.",
    button: "",
  },
];

const biggerCards = [
  {
    size: 1,
    title: "Traveling with 7+ with Pack&Go",
    p: "Get ready for amazing perks and discounts when you travel with a group of 7 or more.",
    button: "Browse by destination",
    img: img2,
  },
  {
    size: 1,
    title: "Ready, set, get inspired with Pack&Go",
    p: "Discover inspiring destinations and real traveler stories to enrich your next adventure.",
    button: "Browse by destination",
    img: img6,
  },
  {
    size: 1,
    title: "Save up to $200 with Pack&Go Specials",
    p: "Take advantage of Pack&Go’s exclusive deals and save big on last-minute bookings.",
    button: "Shop last-minute deals",
    img: "",
  },
];


const travelCards = [
  {
    id: 1,
    img: norway,
    img2: norway2,
    img3: norway3,
    img4: norway4,
    map: mapimg2,
    url: "norway",
    title: "Norway Mountains",
    destination: "Norway",
    description:
      "Explore the breathtaking mountains of Norway. Enjoy scenic views, adventurous trails, and serene landscapes.",
    groupSize: 4,
    stars: 4,
    oldPrice: 5524,
    price: 321,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 2,
    img: nepal4,
    img2: nepal1,
    img3: nepal2,
    img4: nepal3,
    map: mapimg3,
    url: "nepal",
    title: "Himalayan Adventure in Nepal",
    destination: "Nepal",
    description:
      "Discover Nepal's rich culture and stunning Himalayas. Experience trekking, temples, and breathtaking landscapes.",
    groupSize: 5,
    stars: 3,
    oldPrice: 6657,
    price: 456,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 3,
    img: australia,
    img2: australia2,
    img3: australia3,
    img4: australia4,
    map: mapimg4,
    url: "australia",
    title: "Australian Cliffs",
    destination: "Australia",
    description:
      "Visit Australia’s stunning coastal cliffs, sandy beaches, and diverse wildlife. A perfect destination for nature lovers.",
    groupSize: 7,
    stars: 4,
    oldPrice: 2621,
    price: 123,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 4,
    img: maldives,
    img2: maldives2,
    img3: maldives3,
    img4: maldives4,
    map: mapimg5,
    url: "maldives",
    title: "Maldives Paradise",
    destination: "Maldives",
    description:
      "Relax in the tropical paradise of the Maldives. Experience crystal-clear waters, luxurious resorts, and vibrant marine life.",
    groupSize: 2,
    stars: 5,
    oldPrice: 4012,
    price: 95,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 5,
    img: pkr3,
    img2: pkr2,
    img3: pkr1,
    img4: pkr4,
    map: mapimg1,
    url: "pokhara",
    title: "Discover Pokhara",
    destination: "Pokhara",
    description:
    "Discover the breathtaking beauty of Pokhara, the city of lakes and mountains. Nestled in the lap of the Himalayas, Pokhara offers serene lakes, stunning mountain views, and a peaceful escape into nature.",
    groupSize: 13,
    stars: 5,
    oldPrice: 1912,
    price: 341,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 6,
    img: paris,
    img2: paris2,
    img3: paris3,
    img4: paris4,
    map: mapimg2,
    url: "france",
    title: "Paris & the Eiffel Tower",
    destination: "France",
    description:
      "Visit the romantic city of Paris. Enjoy the Eiffel Tower, charming cafés, and world-class museums.",
    groupSize: 13,
    stars: 5,
    oldPrice: 1912,
    price: 274,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 7,
    img: italy,
    img2: italy2,
    img3: italy3,
    img4: italy4,
    map: mapimg3,
    url: "italy",
    title: "Italy’s Beautiful Streets",
    destination: "Italy",
    description:
      "Experience Italy’s stunning architecture, delicious cuisine, and rich history in cities like Rome, Venice, and Florence.",
    groupSize: 13,
    stars: 5,
    oldPrice: 1912,
    price: 341,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 8,
    img: japan,
    img2: japan2,
    img3: japan3,
    img4: japan4,
    map: mapimg4,
    url: "japan",
    title: "Japan’s Beautiful Temples",
    destination: "Japan",
    description:
      "Discover the rich culture of Japan, from historic temples to vibrant city life in Tokyo and Kyoto.",
    groupSize: 13,
    stars: 5,
    oldPrice: 1912,
    price: 341,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 9,
    img: greece,
    img2: greece2,
    img3: greece3,
    img4: greece4,
    map: mapimg5,
    url: "greece",
    title: "Greece’s Beautiful Beaches",
    destination: "Greece",
    description:
      "Relax on the stunning beaches of Greece and explore the ancient ruins of Athens and Santorini.",
    groupSize: 13,
    stars: 5,
    oldPrice: 1912,
    price: 341,
    button: "View Tour",
    favorite: false,
  },
  {
    id: 11,
    img: bhutan,
    img2: bhutan2,
    img3: bhutan3,
    img4: bhutan4,
    map: mapimg1,
    url: "bhutan",
    title: "Bhutan's Monasteries & Mountains",
    destination: "Bhutan",
    description:
      "Experience the untouched beauty of Bhutan. Visit stunning monasteries, hike breathtaking mountain trails, and immerse yourself in its rich culture.",
    groupSize: 10,
    stars: 5,
    oldPrice: 2999,
    price: 450,
    button: "View Tour",
    favorite: false,
  },
];

export { biggerCards, cards, sliderCards, travelCards };

