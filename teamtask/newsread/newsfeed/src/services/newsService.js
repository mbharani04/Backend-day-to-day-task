// ─── News API Service ─────────────────────────────────────────────────────────
// All Fetch API calls to NewsAPI.org are centralised here.
// Falls back to mock data if API key is missing or invalid.

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

// ── Mock articles for demo / when API key is not configured ───────────────────
const MOCK_ARTICLES = [
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: "BBC Science Team",
    title: "Scientists Discover New Earth-Like Planet in Nearby Solar System",
    description: "Astronomers have identified a potentially habitable planet just 12 light-years away, with conditions remarkably similar to early Earth including liquid water and a stable atmosphere.",
    url: "https://www.bbc.com/news/science",
    urlToImage: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: "In a groundbreaking discovery that has sent the scientific community into a frenzy, astronomers using the James Webb Space Telescope have detected what appears to be a habitable world.",
    category: "science",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Sarah Chen",
    title: "OpenAI Releases GPT-5 with Real-Time Web Browsing and Multimodal Reasoning",
    description: "The latest model from OpenAI demonstrates unprecedented reasoning abilities, capable of solving complex mathematical proofs and generating working software from plain English descriptions.",
    url: "https://techcrunch.com/ai",
    urlToImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: "OpenAI has unveiled GPT-5, its most capable language model to date, featuring real-time internet access and the ability to reason across text, images, audio, and video simultaneously.",
    category: "technology",
  },
  {
    source: { id: "reuters", name: "Reuters" },
    author: "James Morrison",
    title: "Global Markets Rally as Inflation Falls to 3-Year Low Across G7 Nations",
    description: "Stock markets worldwide surged on Thursday after economic data showed inflation cooling significantly faster than expected, raising hopes for central bank rate cuts in the coming months.",
    url: "https://www.reuters.com/business",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    content: "Global equity markets rallied sharply after the G7 nations reported inflation figures below expectations, with the US Consumer Price Index falling to its lowest level since 2021.",
    category: "business",
  },
  {
    source: { id: "espn", name: "ESPN" },
    author: "Mike Johnson",
    title: "India Wins ICC Cricket World Cup in Dramatic Super Over Finish Against Australia",
    description: "A nail-biting final at Eden Gardens saw India claim their third World Cup title after an extraordinary super over, with Virat Kohli scoring a stunning 118 runs in the main match.",
    url: "https://www.espn.com/cricket",
    urlToImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    content: "India have won the ICC Cricket World Cup for the third time in their history after a breathtaking super over triumph against Australia in Kolkata.",
    category: "sports",
  },
  {
    source: { id: "healthline", name: "Healthline" },
    author: "Dr. Priya Sharma",
    title: "Breakthrough Drug Shows 94% Success Rate in Reversing Type 2 Diabetes",
    description: "A Phase III clinical trial has demonstrated that a new oral medication can reverse Type 2 diabetes in the majority of patients within 6 months, marking a potential paradigm shift in treatment.",
    url: "https://www.healthline.com/diabetes",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    content: "Pharmaceutical researchers have announced trial results for a new drug that effectively reversed Type 2 diabetes in 94% of participants, without requiring insulin dependency.",
    category: "health",
  },
  {
    source: { id: "variety", name: "Variety" },
    author: "Lisa Monroe",
    title: "Christopher Nolan's New Film 'Epoch' Breaks Global Box Office Records in Opening Weekend",
    description: "The acclaimed director's latest sci-fi epic about time and consciousness has shattered opening weekend records worldwide, earning over $400 million in its first three days of release.",
    url: "https://variety.com/film",
    urlToImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    content: "Christopher Nolan's 'Epoch' has become the highest-grossing opening weekend in cinema history, surpassing the previous record set by Avengers: Endgame.",
    category: "entertainment",
  },
  {
    source: { id: "aljazeera", name: "Al Jazeera" },
    author: "Rami Al-Hassan",
    title: "UN Climate Summit Reaches Historic Agreement on Carbon Neutral Shipping by 2035",
    description: "World leaders at the emergency climate summit in Geneva have agreed to phase out fossil fuels from international shipping a decade ahead of previous targets, a move hailed as transformational.",
    url: "https://www.aljazeera.com/climate",
    urlToImage: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800",
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    content: "The UN Climate Summit concluded with 142 nations signing the Geneva Maritime Agreement, committing to zero-emission shipping by 2035.",
    category: "world",
  },
  {
    source: { id: "politico", name: "Politico" },
    author: "Anna Roberts",
    title: "Supreme Court Overturns Decades-Old Precedent in Landmark Voting Rights Case",
    description: "In a 6-3 decision, the Supreme Court has struck down provisions that restricted voter registration, saying they violate constitutional protections for equal access to democratic participation.",
    url: "https://www.politico.com/supreme-court",
    urlToImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    content: "The Supreme Court issued a landmark ruling on voting rights that experts say will reshape electoral law for a generation.",
    category: "politics",
  },
  {
    source: { id: "wired", name: "Wired" },
    author: "Dmitri Volkov",
    title: "Tesla's New Solid-State Battery Promises 800-Mile Range and 10-Minute Charging",
    description: "Tesla has unveiled its next-generation solid-state battery cell with energy density more than double current lithium-ion technology, set to enter mass production next year.",
    url: "https://www.wired.com/tesla",
    urlToImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
    content: "Tesla's Battery Day presentation revealed a solid-state cell capable of powering a vehicle for 800 miles on a single charge.",
    category: "technology",
  },
  {
    source: { id: "bloomberg", name: "Bloomberg" },
    author: "Kevin Walsh",
    title: "Apple Becomes First Company to Cross $4 Trillion Market Capitalisation",
    description: "Apple Inc. has become the world's first company to achieve a $4 trillion market capitalisation, driven by record iPhone sales and the explosive growth of its services division.",
    url: "https://www.bloomberg.com/apple",
    urlToImage: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800",
    publishedAt: new Date(Date.now() - 36000000).toISOString(),
    content: "Apple crossed the historic $4 trillion market cap threshold on Monday after reporting blockbuster quarterly earnings.",
    category: "business",
  },
  {
    source: { id: "nasa", name: "NASA" },
    author: "NASA Science Team",
    title: "James Webb Telescope Captures First Direct Image of Exoplanet Atmosphere Containing Oxygen",
    description: "NASA's James Webb Space Telescope has produced the first-ever direct spectroscopic confirmation of free oxygen in an exoplanet's atmosphere, a potential biosignature for extraterrestrial life.",
    url: "https://www.nasa.gov/jwst",
    urlToImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
    publishedAt: new Date(Date.now() - 39600000).toISOString(),
    content: "In a historic first, NASA scientists have used the JWST to directly detect molecular oxygen in the atmosphere of a planet orbiting a distant star.",
    category: "science",
  },
  {
    source: { id: "ndtv", name: "NDTV" },
    author: "Priya Kapoor",
    title: "India's GDP Growth Rate Hits 8.2% Making It World's Fastest Growing Major Economy",
    description: "India's Central Statistics Office has released data showing the economy expanded at 8.2% in the latest quarter, cementing its position as the world's fastest-growing large economy.",
    url: "https://www.ndtv.com/india",
    urlToImage: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800",
    publishedAt: new Date(Date.now() - 43200000).toISOString(),
    content: "India's economic growth has surpassed even the most optimistic forecasts, with GDP expanding by 8.2% in the April-June quarter.",
    category: "general",
  },
];

// Fallback images per category when API returns null
const FALLBACK_IMAGES = {
  technology:    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
  business:      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  sports:        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
  science:       "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800",
  health:        "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
  entertainment: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=800",
  general:       "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
  politics:      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
  world:         "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
};

/**
 * Check whether a real API key has been configured
 */
const hasValidApiKey = () =>
  API_KEY &&
  API_KEY !== "your_api_key_here" &&
  API_KEY.length > 10;

/**
 * Enrich an article with a fallback image if the API returns null
 */
const enrichArticle = (article, category = "general") => ({
  ...article,
  urlToImage:
    article.urlToImage ||
    FALLBACK_IMAGES[category] ||
    FALLBACK_IMAGES.general,
  category: article.category || category || "general",
});

/**
 * Get mock articles filtered/simulated by category and page
 */
const getMockData = (category = "general", page = 1, pageSize = 12) => {
  // filter() — filter mock articles by category
  const filtered =
    category === "general"
      ? MOCK_ARTICLES
      : MOCK_ARTICLES.filter(
          (a) => a.category === category || a.category === "general"
        );

  const start = (page - 1) * pageSize;
  const articles = filtered.slice(start, start + pageSize);

  return { articles, totalResults: filtered.length };
};

/**
 * Get mock articles filtered by search query
 */
const getMockSearch = (query, page = 1, pageSize = 12) => {
  const q = query.toLowerCase();
  // filter() + some() — search across multiple fields
  const filtered = MOCK_ARTICLES.filter(
    (a) =>
      a.title?.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q) ||
      a.category?.toLowerCase().includes(q) ||
      a.source?.name?.toLowerCase().includes(q) ||
      a.author?.toLowerCase().includes(q)
  );

  const start = (page - 1) * pageSize;
  return { articles: filtered.slice(start, start + pageSize), totalResults: filtered.length };
};

/**
 * Fetch top headlines by category
 * Falls back to mock data if API key is missing/invalid
 */
export const fetchTopHeadlines = async (
  category = "general",
  page = 1,
  pageSize = 12
) => {
  // Use mock data if no valid API key configured
  if (!hasValidApiKey()) {
    return getMockData(category, page, pageSize);
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
    category: category === "world" || category === "politics" ? "general" : category,
    country: "us",
    page,
    pageSize,
  });

  const response = await fetch(`${BASE_URL}/top-headlines?${params}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    // Fall back to mock data on API error (e.g. 401 invalid key)
    console.warn("[NewsService] API error, using mock data:", error.message);
    return getMockData(category, page, pageSize);
  }

  const data = await response.json();

  if (data.status === "error") {
    console.warn("[NewsService] API returned error, using mock data:", data.message);
    return getMockData(category, page, pageSize);
  }

  const articles = (data.articles || [])
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a) => enrichArticle(a, category));

  // If API returned no results, fall back to mock
  if (articles.length === 0) {
    return getMockData(category, page, pageSize);
  }

  return { articles, totalResults: data.totalResults || 0 };
};

/**
 * Search articles across everything
 * Falls back to mock data if API key is missing/invalid
 */
export const fetchEverything = async (
  query,
  page = 1,
  pageSize = 12,
  sortBy = "publishedAt"
) => {
  if (!query || query.trim().length < 2) {
    return { articles: [], totalResults: 0 };
  }

  // Use mock data if no valid API key configured
  if (!hasValidApiKey()) {
    return getMockSearch(query, page, pageSize);
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
    q: query.trim(),
    language: "en",
    page,
    pageSize,
    sortBy,
  });

  const response = await fetch(`${BASE_URL}/everything?${params}`);

  if (!response.ok) {
    console.warn("[NewsService] Search API error, using mock data");
    return getMockSearch(query, page, pageSize);
  }

  const data = await response.json();

  if (data.status === "error") {
    console.warn("[NewsService] Search API error, using mock data:", data.message);
    return getMockSearch(query, page, pageSize);
  }

  const articles = (data.articles || [])
    .filter((a) => a.title && a.title !== "[Removed]")
    .map((a) => enrichArticle(a, "general"));

  if (articles.length === 0) {
    return getMockSearch(query, page, pageSize);
  }

  return { articles, totalResults: data.totalResults || 0 };
};
