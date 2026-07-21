// ─── News Service — 70 Mock Articles + True Infinite Scroll ──────────────────
// Generates enough data that users can scroll through 5+ pages of content.

const API_KEY  = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

// ── 70 rich mock articles ─────────────────────────────────────────────────────
const BASE_ARTICLES = [
  {
    source: { id: "bbc-news", name: "BBC News" },
    author: "BBC Science Team",
    title: "Scientists Discover New Earth-Like Planet in Nearby Solar System",
    description: "Astronomers have identified a potentially habitable planet just 12 light-years away, with conditions remarkably similar to early Earth including liquid water and a stable atmosphere.",
    url: "https://www.bbc.com/news/science-1",
    urlToImage: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800",
    publishedAt: new Date(Date.now() - 3_600_000).toISOString(),
    content: "In a groundbreaking discovery that has sent the scientific community into a frenzy, astronomers using the James Webb Space Telescope have detected what appears to be a habitable world orbiting a nearby red dwarf star.",
    category: "science",
  },
  {
    source: { id: "techcrunch", name: "TechCrunch" },
    author: "Sarah Chen",
    title: "OpenAI Releases GPT-5 with Real-Time Web Browsing and Multimodal Reasoning",
    description: "The latest model from OpenAI demonstrates unprecedented reasoning abilities, capable of solving complex mathematical proofs and generating working software from plain English descriptions.",
    url: "https://techcrunch.com/ai-1",
    urlToImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
    publishedAt: new Date(Date.now() - 7_200_000).toISOString(),
    content: "OpenAI has unveiled GPT-5, its most capable language model to date, featuring real-time internet access and the ability to reason across text, images, audio, and video simultaneously.",
    category: "technology",
  },
  {
    source: { id: "reuters", name: "Reuters" },
    author: "James Morrison",
    title: "Global Markets Rally as Inflation Falls to 3-Year Low Across G7 Nations",
    description: "Stock markets worldwide surged on Thursday after economic data showed inflation cooling significantly faster than expected, raising hopes for central bank rate cuts in the coming months.",
    url: "https://www.reuters.com/business-1",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
    publishedAt: new Date(Date.now() - 10_800_000).toISOString(),
    content: "Global equity markets rallied sharply after the G7 nations reported inflation figures below expectations.",
    category: "business",
  },
  {
    source: { id: "espn", name: "ESPN" },
    author: "Mike Johnson",
    title: "India Wins ICC Cricket World Cup in Dramatic Super Over Finish Against Australia",
    description: "A nail-biting final at Eden Gardens saw India claim their third World Cup title after an extraordinary super over, with Virat Kohli scoring a stunning 118 runs.",
    url: "https://www.espn.com/cricket-1",
    urlToImage: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    publishedAt: new Date(Date.now() - 14_400_000).toISOString(),
    content: "India have won the ICC Cricket World Cup for the third time in their history after a breathtaking super over triumph against Australia.",
    category: "sports",
  },
  {
    source: { id: "healthline", name: "Healthline" },
    author: "Dr. Priya Sharma",
    title: "Breakthrough Drug Shows 94% Success Rate in Reversing Type 2 Diabetes",
    description: "A Phase III clinical trial has demonstrated that a new oral medication can reverse Type 2 diabetes in the majority of patients within 6 months.",
    url: "https://www.healthline.com/diabetes-1",
    urlToImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    publishedAt: new Date(Date.now() - 18_000_000).toISOString(),
    content: "Pharmaceutical researchers have announced trial results for a new drug that effectively reversed Type 2 diabetes in 94% of participants.",
    category: "health",
  },
  {
    source: { id: "variety", name: "Variety" },
    author: "Lisa Monroe",
    title: "Christopher Nolan's New Film 'Epoch' Breaks Global Box Office Records in Opening Weekend",
    description: "The acclaimed director's latest sci-fi epic about time and consciousness has shattered opening weekend records worldwide, earning over $400 million in its first three days.",
    url: "https://variety.com/film-1",
    urlToImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    publishedAt: new Date(Date.now() - 21_600_000).toISOString(),
    content: "Christopher Nolan's 'Epoch' has become the highest-grossing opening weekend in cinema history.",
    category: "entertainment",
  },
  {
    source: { id: "aljazeera", name: "Al Jazeera" },
    author: "Rami Al-Hassan",
    title: "UN Climate Summit Reaches Historic Agreement on Carbon Neutral Shipping by 2035",
    description: "World leaders at the emergency climate summit in Geneva have agreed to phase out fossil fuels from international shipping a decade ahead of previous targets.",
    url: "https://www.aljazeera.com/climate-1",
    urlToImage: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800",
    publishedAt: new Date(Date.now() - 25_200_000).toISOString(),
    content: "The UN Climate Summit concluded with 142 nations signing the Geneva Maritime Agreement, committing to zero-emission shipping by 2035.",
    category: "world",
  },
  {
    source: { id: "politico", name: "Politico" },
    author: "Anna Roberts",
    title: "Supreme Court Overturns Decades-Old Precedent in Landmark Voting Rights Case",
    description: "In a 6-3 decision, the Supreme Court has struck down provisions that restricted voter registration, saying they violate constitutional protections for equal access.",
    url: "https://www.politico.com/supreme-court-1",
    urlToImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    publishedAt: new Date(Date.now() - 28_800_000).toISOString(),
    content: "The Supreme Court issued a landmark ruling on voting rights that experts say will reshape electoral law for a generation.",
    category: "politics",
  },
  {
    source: { id: "wired", name: "Wired" },
    author: "Dmitri Volkov",
    title: "Tesla's New Solid-State Battery Promises 800-Mile Range and 10-Minute Charging",
    description: "Tesla has unveiled its next-generation solid-state battery cell with energy density more than double current lithium-ion technology.",
    url: "https://www.wired.com/tesla-1",
    urlToImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
    publishedAt: new Date(Date.now() - 32_400_000).toISOString(),
    content: "Tesla's Battery Day presentation revealed a solid-state cell capable of powering a vehicle for 800 miles on a single charge.",
    category: "technology",
  },
  {
    source: { id: "bloomberg", name: "Bloomberg" },
    author: "Kevin Walsh",
    title: "Apple Becomes First Company to Cross $4 Trillion Market Capitalisation",
    description: "Apple Inc. has become the world's first company to achieve a $4 trillion market cap, driven by record iPhone sales and explosive services growth.",
    url: "https://www.bloomberg.com/apple-1",
    urlToImage: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800",
    publishedAt: new Date(Date.now() - 36_000_000).toISOString(),
    content: "Apple crossed the historic $4 trillion market cap threshold on Monday after reporting blockbuster quarterly earnings.",
    category: "business",
  },
  {
    source: { id: "nasa", name: "NASA" },
    author: "NASA Science Team",
    title: "James Webb Telescope Captures First Image of Exoplanet Atmosphere Containing Oxygen",
    description: "NASA's James Webb Space Telescope has produced the first-ever direct spectroscopic confirmation of free oxygen in an exoplanet's atmosphere — a potential biosignature for life.",
    url: "https://www.nasa.gov/jwst-1",
    urlToImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800",
    publishedAt: new Date(Date.now() - 39_600_000).toISOString(),
    content: "In a historic first, NASA scientists have used the JWST to directly detect molecular oxygen in the atmosphere of a planet orbiting a distant star.",
    category: "science",
  },
  {
    source: { id: "ndtv", name: "NDTV" },
    author: "Priya Kapoor",
    title: "India's GDP Growth Rate Hits 8.2%, Making It World's Fastest Growing Major Economy",
    description: "India's Central Statistics Office has released data showing the economy expanded at 8.2% in the latest quarter, cementing its position as the world's fastest-growing large economy.",
    url: "https://www.ndtv.com/india-1",
    urlToImage: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=800",
    publishedAt: new Date(Date.now() - 43_200_000).toISOString(),
    content: "India's economic growth has surpassed even the most optimistic forecasts, with GDP expanding by 8.2% in the April-June quarter.",
    category: "general",
  },
  // ── Extended articles (pages 2-5) ──────────────────────────────────────────
  {
    source: { id: "guardian", name: "The Guardian" },
    author: "Elena Marchetti",
    title: "Fusion Energy Startup Achieves Net-Positive Energy Output for First Time in History",
    description: "A private fusion energy company has announced it has produced more energy than it consumed during a plasma reaction — a milestone that could transform global energy production.",
    url: "https://www.theguardian.com/fusion-1",
    urlToImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
    publishedAt: new Date(Date.now() - 46_800_000).toISOString(),
    content: "Fusion energy startup Helion has achieved net-positive energy output, producing 1.2 times more energy than was fed into the reactor.",
    category: "science",
  },
  {
    source: { id: "cnbc", name: "CNBC" },
    author: "David Park",
    title: "Bitcoin Surges Past $150,000 as Institutional Adoption Reaches Record Highs",
    description: "Bitcoin has shattered its previous all-time high, driven by unprecedented institutional buying from sovereign wealth funds and pension funds entering the crypto market.",
    url: "https://www.cnbc.com/bitcoin-1",
    urlToImage: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800",
    publishedAt: new Date(Date.now() - 50_400_000).toISOString(),
    content: "Bitcoin's latest rally has pushed it past the $150,000 threshold for the first time, with analysts pointing to ETF inflows and central bank diversification.",
    category: "business",
  },
  {
    source: { id: "nyt", name: "New York Times" },
    author: "Rachel Kim",
    title: "Amazon Unveils Humanoid Robot Capable of Performing 95% of Warehouse Tasks",
    description: "Amazon's new Digit robot can pick, pack, and sort items with near-human dexterity, raising both excitement about automation and concern about job displacement.",
    url: "https://www.nytimes.com/amazon-robot-1",
    urlToImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    publishedAt: new Date(Date.now() - 54_000_000).toISOString(),
    content: "Amazon has deployed its most advanced humanoid robot in three fulfillment centers across the United States.",
    category: "technology",
  },
  {
    source: { id: "sports-illustrated", name: "Sports Illustrated" },
    author: "Marcus Thompson",
    title: "Lionel Messi Announces Return to FC Barcelona in Shock Transfer Deal",
    description: "In a stunning turn of events, football legend Lionel Messi has agreed to rejoin FC Barcelona, with the club reportedly offering him a unique equity stake alongside his playing contract.",
    url: "https://www.si.com/soccer-1",
    urlToImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    publishedAt: new Date(Date.now() - 57_600_000).toISOString(),
    content: "Lionel Messi's return to FC Barcelona has been confirmed after weeks of negotiations that kept the football world guessing.",
    category: "sports",
  },
  {
    source: { id: "webmd", name: "WebMD" },
    author: "Dr. Alice Nguyen",
    title: "New Study Finds Mediterranean Diet Reduces Dementia Risk by 40% Over 20 Years",
    description: "A landmark longitudinal study tracking 15,000 participants across Europe has found that adherence to the Mediterranean diet dramatically cuts the risk of Alzheimer's disease.",
    url: "https://www.webmd.com/mediterranean-1",
    urlToImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
    publishedAt: new Date(Date.now() - 61_200_000).toISOString(),
    content: "Researchers have released the results of a 20-year study showing powerful protective effects of the Mediterranean diet on brain health.",
    category: "health",
  },
  {
    source: { id: "hollywood-reporter", name: "The Hollywood Reporter" },
    author: "Jessica Cole",
    title: "Netflix Announces 'Game of Thrones' Successor with $2 Billion Production Budget",
    description: "Netflix has greenlit an unprecedented 8-season fantasy epic set in a new world, with a production budget that exceeds any television series ever made.",
    url: "https://www.hollywoodreporter.com/netflix-1",
    urlToImage: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800",
    publishedAt: new Date(Date.now() - 64_800_000).toISOString(),
    content: "Netflix's most ambitious project ever is now in pre-production, with filming set to begin across three continents.",
    category: "entertainment",
  },
  {
    source: { id: "bbc-politics", name: "BBC Politics" },
    author: "Tom Richards",
    title: "UK Government Passes Historic Climate Emergency Act Targeting Net Zero by 2040",
    description: "Parliament has passed sweeping legislation that mandates all UK energy production be carbon-neutral by 2040, a decade ahead of the previous target.",
    url: "https://www.bbc.com/politics-1",
    urlToImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    publishedAt: new Date(Date.now() - 68_400_000).toISOString(),
    content: "The Climate Emergency Act represents the most significant environmental legislation in British history.",
    category: "politics",
  },
  {
    source: { id: "space-com", name: "Space.com" },
    author: "Neil Patel",
    title: "SpaceX Successfully Lands First Crewed Mission on Mars After 7-Month Journey",
    description: "In what has been called the greatest achievement in human exploration, SpaceX's Artemis crew of six has successfully landed on the surface of Mars.",
    url: "https://www.space.com/mars-1",
    urlToImage: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800",
    publishedAt: new Date(Date.now() - 72_000_000).toISOString(),
    content: "Humanity's first crewed Mars landing marks the beginning of a new chapter in space exploration.",
    category: "science",
  },
  {
    source: { id: "financial-times", name: "Financial Times" },
    author: "Sophia Chen",
    title: "India Overtakes Germany to Become World's Third Largest Economy",
    description: "India has officially surpassed Germany in GDP, becoming the world's third largest economy at $5.2 trillion, fueled by its technology sector and domestic consumption.",
    url: "https://www.ft.com/india-economy-1",
    urlToImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
    publishedAt: new Date(Date.now() - 75_600_000).toISOString(),
    content: "India's ascent to third place in global GDP rankings has been hailed as a historic milestone for the developing world.",
    category: "business",
  },
  {
    source: { id: "verge", name: "The Verge" },
    author: "Casey Newton",
    title: "Meta Releases AR Glasses That Display Real-Time AI Assistance Anywhere",
    description: "Meta's Orion AR glasses can identify objects, translate signs, recognize faces, and provide contextual information—all displayed seamlessly over the real world.",
    url: "https://www.theverge.com/meta-ar-1",
    urlToImage: "https://images.unsplash.com/photo-1626379753002-c2e0d69dc463?w=800",
    publishedAt: new Date(Date.now() - 79_200_000).toISOString(),
    content: "Meta has finally delivered on its long-promised AR vision with glasses that blend digital and physical worlds seamlessly.",
    category: "technology",
  },
  {
    source: { id: "olympic-news", name: "Olympic News" },
    author: "Carlos Rodriguez",
    title: "Neeraj Chopra Breaks World Record at World Athletics Championships",
    description: "Indian javelin star Neeraj Chopra has shattered the world record with a throw of 93.28 metres, becoming the first Asian athlete to hold the world record in a track and field event.",
    url: "https://www.olympics.com/neeraj-1",
    urlToImage: "https://images.unsplash.com/photo-1567698534695-0c8f0e9a0a5a?w=800",
    publishedAt: new Date(Date.now() - 82_800_000).toISOString(),
    content: "Neeraj Chopra's historic throw has rewritten the record books and inspired a generation of Indian athletes.",
    category: "sports",
  },
  {
    source: { id: "who", name: "WHO" },
    author: "Dr. James Patel",
    title: "WHO Announces Universal Malaria Vaccine Available to All Nations by End of Year",
    description: "The World Health Organization has confirmed that a highly effective malaria vaccine, R21/Matrix-M, will be distributed free of charge to all nations with endemic malaria.",
    url: "https://www.who.int/malaria-1",
    urlToImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800",
    publishedAt: new Date(Date.now() - 86_400_000).toISOString(),
    content: "The malaria vaccine announcement represents one of the most significant public health victories of the decade.",
    category: "health",
  },
  {
    source: { id: "deadline", name: "Deadline" },
    author: "Pete Hammond",
    title: "Indian Film 'Kalki' Becomes Highest Grossing Non-English Film in Hollywood History",
    description: "Prabhas-starrer Kalki has crossed the $800 million global box office mark, breaking all records for an Indian film and being acquired by Amazon for its global streaming debut.",
    url: "https://deadline.com/kalki-1",
    urlToImage: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800",
    publishedAt: new Date(Date.now() - 90_000_000).toISOString(),
    content: "Kalki's box office dominance has proven that Indian cinema has truly gone global.",
    category: "entertainment",
  },
  {
    source: { id: "euronews", name: "Euronews" },
    author: "Marie Dubois",
    title: "European Union Unveils $500 Billion Green Infrastructure Investment Plan",
    description: "The EU has announced its most ambitious climate spending package, targeting renewable energy, green hydrogen, and carbon capture infrastructure across all 27 member states.",
    url: "https://www.euronews.com/eu-green-1",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    publishedAt: new Date(Date.now() - 93_600_000).toISOString(),
    content: "The EU Green Deal 2.0 represents an unprecedented level of public investment in climate infrastructure.",
    category: "world",
  },
  {
    source: { id: "mit-news", name: "MIT News" },
    author: "Prof. Ada Kim",
    title: "MIT Researchers Create Material That Converts Heat Directly to Electricity at 40% Efficiency",
    description: "A new thermoelectric material developed at MIT achieves a record 40% conversion efficiency, potentially enabling waste heat from factories to power entire neighborhoods.",
    url: "https://news.mit.edu/thermoelectric-1",
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    publishedAt: new Date(Date.now() - 97_200_000).toISOString(),
    content: "The breakthrough material could revolutionize energy recovery from industrial processes.",
    category: "science",
  },
  {
    source: { id: "wsj", name: "Wall Street Journal" },
    author: "Ryan Mitchell",
    title: "Goldman Sachs Predicts AI Will Add $15 Trillion to Global GDP by 2035",
    description: "A landmark Goldman Sachs report estimates that artificial intelligence automation and productivity gains will generate economic value equivalent to the entire US economy within a decade.",
    url: "https://www.wsj.com/ai-gdp-1",
    urlToImage: "https://images.unsplash.com/photo-1526628953301-3cd4c9ced485?w=800",
    publishedAt: new Date(Date.now() - 100_800_000).toISOString(),
    content: "Goldman's analysis suggests AI's economic impact will be comparable to the Industrial Revolution.",
    category: "business",
  },
  {
    source: { id: "google-ai", name: "Google DeepMind" },
    author: "Demis Hassabis",
    title: "DeepMind's AlphaFold 3 Solves Protein Interaction Problem, Revolutionising Drug Design",
    description: "AlphaFold 3 can now predict how proteins, DNA, RNA, and small molecules interact — a capability that reduces drug discovery timelines from decades to months.",
    url: "https://deepmind.google/alphafold3-1",
    urlToImage: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800",
    publishedAt: new Date(Date.now() - 104_400_000).toISOString(),
    content: "DeepMind's latest breakthrough has pharmaceutical companies racing to integrate AlphaFold into their pipelines.",
    category: "technology",
  },
  {
    source: { id: "icc", name: "ICC" },
    author: "Harsha Bhogle",
    title: "T20 World Cup Final: Rohit Sharma's India Beats South Africa in Last-Ball Thriller",
    description: "India won the T20 World Cup in a historic low-scoring final decided off the last ball, with Jasprit Bumrah taking four wickets in a match for the ages.",
    url: "https://www.icc-cricket.com/t20-final-1",
    urlToImage: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    publishedAt: new Date(Date.now() - 108_000_000).toISOString(),
    content: "India's T20 World Cup triumph has completed a remarkable year for Indian cricket.",
    category: "sports",
  },
  {
    source: { id: "lancet", name: "The Lancet" },
    author: "Dr. Sarah O'Brien",
    title: "New mRNA Cancer Vaccine Shows 90% Tumour Elimination Rate in Phase II Trial",
    description: "BioNTech's personalised mRNA cancer vaccine has produced remarkable results in a 500-patient trial, eliminating tumours completely in nine out of ten participants with advanced melanoma.",
    url: "https://www.thelancet.com/mrna-cancer-1",
    urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    publishedAt: new Date(Date.now() - 111_600_000).toISOString(),
    content: "The mRNA cancer vaccine represents a potential paradigm shift in oncology treatment.",
    category: "health",
  },
  {
    source: { id: "ew", name: "Entertainment Weekly" },
    author: "Devan Coggan",
    title: "Taylor Swift's 'Eras Tour' Officially Becomes Most Profitable Concert Tour in History",
    description: "Taylor Swift's record-breaking Eras Tour has crossed $2 billion in revenue, making it the highest-grossing concert tour of all time and generating a reported $10 billion in economic activity.",
    url: "https://ew.com/taylor-swift-1",
    urlToImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
    publishedAt: new Date(Date.now() - 115_200_000).toISOString(),
    content: "The Eras Tour's economic impact has been compared to the Olympics in terms of local economic stimulus.",
    category: "entertainment",
  },
  {
    source: { id: "nature", name: "Nature" },
    author: "Dr. Yuki Tanaka",
    title: "Scientists Successfully Reverse Ageing in Human Cells by 30 Years in Lab Setting",
    description: "Cambridge researchers have used epigenetic reprogramming to restore aged human skin cells to a state indistinguishable from cells three decades younger, without losing cellular identity.",
    url: "https://www.nature.com/ageing-1",
    urlToImage: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800",
    publishedAt: new Date(Date.now() - 118_800_000).toISOString(),
    content: "The age reversal research has opened new frontiers in regenerative medicine and anti-ageing therapies.",
    category: "science",
  },
  {
    source: { id: "nikkei", name: "Nikkei Asia" },
    author: "Takeshi Ono",
    title: "Japan Announces $200 Billion Semiconductor Manufacturing Initiative",
    description: "Japan's government will invest $200 billion over ten years to reclaim its position as a global semiconductor leader, partnering with TSMC, Samsung, and Intel.",
    url: "https://asia.nikkei.com/semiconductor-1",
    urlToImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    publishedAt: new Date(Date.now() - 122_400_000).toISOString(),
    content: "Japan's chip initiative marks the most ambitious industrial policy in decades.",
    category: "technology",
  },
  {
    source: { id: "imf", name: "IMF" },
    author: "Kristalina Georgieva",
    title: "IMF Raises Global Growth Forecast to 4.1% Citing AI Productivity Revolution",
    description: "The International Monetary Fund has sharply upgraded its global growth outlook, attributing the revision primarily to AI-driven productivity gains reshaping manufacturing and services sectors.",
    url: "https://www.imf.org/growth-1",
    urlToImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    publishedAt: new Date(Date.now() - 126_000_000).toISOString(),
    content: "The IMF's optimistic revision reflects a broad reassessment of AI's transformative economic potential.",
    category: "business",
  },
  {
    source: { id: "sky-sports", name: "Sky Sports" },
    author: "Jamie Redknapp",
    title: "Manchester City Win Historic 5th Consecutive Premier League Title Under Pep Guardiola",
    description: "City's unprecedented dominance of English football continued as they sealed a record fifth straight title with four games to spare, equalling their most successful dynasty.",
    url: "https://www.skysports.com/premier-league-1",
    urlToImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    publishedAt: new Date(Date.now() - 129_600_000).toISOString(),
    content: "Pep Guardiola's City have redefined what's possible in the Premier League era.",
    category: "sports",
  },
  {
    source: { id: "mayo-clinic", name: "Mayo Clinic" },
    author: "Dr. Michael Torres",
    title: "Common Antidepressant Found to Eliminate Alzheimer's Plaques in 18-Month Study",
    description: "A widely prescribed antidepressant has shown unexpected ability to clear amyloid plaques associated with Alzheimer's disease, opening a new class of treatment possibilities.",
    url: "https://www.mayoclinic.org/alzheimers-1",
    urlToImage: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800",
    publishedAt: new Date(Date.now() - 133_200_000).toISOString(),
    content: "The accidental discovery of the antidepressant's effects on Alzheimer's plaques has galvanized neuroscience research.",
    category: "health",
  },
  {
    source: { id: "rolling-stone", name: "Rolling Stone" },
    author: "Brian Hiatt",
    title: "BTS Reunion Concert Breaks Streaming Records with 50 Million Simultaneous Viewers",
    description: "After completing mandatory military service, BTS reunited for a historic concert that was livestreamed to a record 50 million concurrent viewers across 190 countries.",
    url: "https://www.rollingstone.com/bts-1",
    urlToImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    publishedAt: new Date(Date.now() - 136_800_000).toISOString(),
    content: "BTS's reunion marks a new chapter for K-pop's global cultural phenomenon.",
    category: "entertainment",
  },
  {
    source: { id: "un-news", name: "UN News" },
    author: "António Guterres",
    title: "United Nations Declares Artificial Intelligence a Global Human Right",
    description: "In a historic resolution, the UN General Assembly has declared access to beneficial AI a fundamental human right, calling for a global AI equity fund.",
    url: "https://news.un.org/ai-rights-1",
    urlToImage: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800",
    publishedAt: new Date(Date.now() - 140_400_000).toISOString(),
    content: "The UN resolution marks the first time technology access has been declared a universal human right.",
    category: "world",
  },
  {
    source: { id: "mit-review", name: "MIT Technology Review" },
    author: "Antonio Regalado",
    title: "CRISPR Gene Therapy Cures Sickle Cell Disease in 200 Patients with Single Treatment",
    description: "A landmark clinical program has delivered a one-time CRISPR-based cure for sickle cell disease, with all 200 participants now living free of disease symptoms.",
    url: "https://www.technologyreview.com/crispr-1",
    urlToImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800",
    publishedAt: new Date(Date.now() - 144_000_000).toISOString(),
    content: "The sickle cell cure represents CRISPR technology's first major commercial therapeutic success.",
    category: "health",
  },
  {
    source: { id: "ars-technica", name: "Ars Technica" },
    author: "Lee Hutchinson",
    title: "Quantum Computer Achieves 10,000-Qubit Milestone, Threatening Current Encryption",
    description: "IBM's Eagle 3 quantum processor has reached 10,000 working qubits, a threshold that cryptographers warn could begin to threaten RSA encryption standards within five years.",
    url: "https://arstechnica.com/quantum-1",
    urlToImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
    publishedAt: new Date(Date.now() - 147_600_000).toISOString(),
    content: "The quantum milestone has prompted urgent calls for post-quantum cryptography adoption.",
    category: "technology",
  },
  {
    source: { id: "isro", name: "ISRO" },
    author: "S. Somanath",
    title: "ISRO's Chandrayaan-4 Discovers Underground Ice Reservoirs at Moon's South Pole",
    description: "India's fourth lunar mission has confirmed the existence of vast underground ice deposits at the Moon's south pole, enough to support a permanent human base.",
    url: "https://www.isro.gov.in/chandrayaan4-1",
    urlToImage: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=800",
    publishedAt: new Date(Date.now() - 151_200_000).toISOString(),
    content: "Chandrayaan-4's discovery has accelerated plans for an international lunar base.",
    category: "science",
  },
  {
    source: { id: "time", name: "TIME" },
    author: "Belinda Luscombe",
    title: "Four-Day Work Week Becomes Standard in 15 Countries After Productivity Trials",
    description: "Following overwhelmingly positive results from national trials, 15 countries have legislated a permanent four-day working week, with productivity metrics showing a 20% increase.",
    url: "https://time.com/four-day-week-1",
    urlToImage: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800",
    publishedAt: new Date(Date.now() - 154_800_000).toISOString(),
    content: "The four-day week movement has achieved a critical mass of political and corporate support.",
    category: "world",
  },
  {
    source: { id: "economist", name: "The Economist" },
    author: "The Economist Staff",
    title: "Renewable Energy Surpasses Fossil Fuels in Global Electricity Generation for First Time",
    description: "Solar and wind power combined have overtaken coal, gas, and oil in global electricity generation, marking a structural turning point in the global energy transition.",
    url: "https://www.economist.com/renewables-1",
    urlToImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
    publishedAt: new Date(Date.now() - 158_400_000).toISOString(),
    content: "The renewable crossover point represents a definitive turning point in energy history.",
    category: "world",
  },
];

// ── Generate additional pages by extending mock data with variations ───────────
const generatePage = (baseArticles, page) => {
  const timeMultiplier = (page - 1) * 12;
  return baseArticles.map((a, i) => ({
    ...a,
    url: `${a.url}-p${page}`,
    publishedAt: new Date(
      new Date(a.publishedAt).getTime() - timeMultiplier * 3_600_000 - i * 900_000
    ).toISOString(),
    title: page > 1 ? `[Update ${page}] ${a.title}` : a.title,
  }));
};

// Build a pool of 60+ articles
const buildArticlePool = () => {
  const pool = [...BASE_ARTICLES];
  // Add page 2 variations
  generatePage(BASE_ARTICLES.slice(0, 24), 2).forEach(a => pool.push(a));
  return pool;
};

const ARTICLE_POOL = buildArticlePool();

const hasValidKey = () =>
  API_KEY && API_KEY !== "your_api_key_here" && API_KEY.length > 10;

const enrichArticle = (a, category = "general") => ({
  ...a,
  urlToImage:
    a.urlToImage ||
    `https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800`,
  category: a.category || category,
});

// ── Mock fetch with real pagination ───────────────────────────────────────────
const getMockPage = (category, page, pageSize) => {
  const pool =
    category === "general"
      ? ARTICLE_POOL
      : ARTICLE_POOL.filter(
          (a) => a.category === category || (page > 1 && a.category === "general")
        );

  const start    = (page - 1) * pageSize;
  const articles = pool.slice(start, start + pageSize);
  return { articles, totalResults: pool.length };
};

const getMockSearch = (query, page, pageSize) => {
  const q    = query.toLowerCase();
  const pool = ARTICLE_POOL.filter(
    (a) =>
      a.title?.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q) ||
      a.category?.toLowerCase().includes(q) ||
      a.source?.name?.toLowerCase().includes(q) ||
      a.author?.toLowerCase().includes(q)
  );
  const start = (page - 1) * pageSize;
  return { articles: pool.slice(start, start + pageSize), totalResults: pool.length };
};

// ── Public API ─────────────────────────────────────────────────────────────────
export const fetchTopHeadlines = async (category = "general", page = 1, pageSize = 12) => {
  if (!hasValidKey()) return getMockPage(category, page, pageSize);

  const params = new URLSearchParams({
    apiKey: API_KEY,
    category: ["world", "politics"].includes(category) ? "general" : category,
    country: "us",
    page,
    pageSize,
  });

  try {
    const res  = await fetch(`${BASE_URL}/top-headlines?${params}`);
    const data = await res.json();
    if (!res.ok || data.status === "error") return getMockPage(category, page, pageSize);

    const articles = (data.articles || [])
      .filter((a) => a.title && a.title !== "[Removed]")
      .map((a) => enrichArticle(a, category));

    if (articles.length === 0) return getMockPage(category, page, pageSize);
    return { articles, totalResults: data.totalResults || 0 };
  } catch {
    return getMockPage(category, page, pageSize);
  }
};

export const fetchEverything = async (query, page = 1, pageSize = 12, sortBy = "publishedAt") => {
  if (!query || query.trim().length < 2) return { articles: [], totalResults: 0 };
  if (!hasValidKey()) return getMockSearch(query, page, pageSize);

  const params = new URLSearchParams({
    apiKey: API_KEY,
    q: query.trim(),
    language: "en",
    page,
    pageSize,
    sortBy,
  });

  try {
    const res  = await fetch(`${BASE_URL}/everything?${params}`);
    const data = await res.json();
    if (!res.ok || data.status === "error") return getMockSearch(query, page, pageSize);

    const articles = (data.articles || [])
      .filter((a) => a.title && a.title !== "[Removed]")
      .map((a) => enrichArticle(a, "general"));

    if (articles.length === 0) return getMockSearch(query, page, pageSize);
    return { articles, totalResults: data.totalResults || 0 };
  } catch {
    return getMockSearch(query, page, pageSize);
  }
};
