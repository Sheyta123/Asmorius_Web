import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router";
import { Search, Filter, Star, Trophy, Medal, Award } from "lucide-react";
import { allCreatorsData } from "../data/creatorsData";

// All available tags
const allTags = [
  "Dark Fantasy", "Pastel", "Gothic", "Kawaii", "Cyberpunk", "Steampunk",
  "Horror", "Cute", "Romance", "Action", "Sci-Fi", "Mystery",
  "Fantasy", "Realistic", "Anime", "Chibi", "Semi-Realistic", "Cartoon",
  "Landscape", "Portrait", "Character Design", "Concept Art", "Digital Art", "Traditional",
  "Full Color", "Sketch", "Lineart", "Watercolor", "Oil Painting", "Pixel Art", "Atmospheric"
];

const creatorsData = allCreatorsData;

export function FindCreatorsPage() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | "Artist">("all");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<string>("all");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "Artist") {
      setSelectedType(typeParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowTagSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setShowTagSuggestions(false);
  };

  const filteredCreators = creatorsData.filter((creator) => {
    const matchesSearch =
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = selectedType === "all" || creator.type === selectedType;

    return matchesSearch && matchesType;
  });

  // Get top creators by type and rating
  const topArtists = creatorsData
    .filter((c) => c.type === "Artist")
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2">Tìm Creators</h1>
        <p className="text-muted-foreground">
          Khám phá và kết nối với hàng ngàn artists tài năng
        </p>
      </div>

      {/* Search and Filters - Moved to top */}
      <div className="space-y-4 mb-8">
        {/* Search Bar */}
        <div className="relative" ref={searchInputRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, kỹ năng, hoặc tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowTagSuggestions(true)}
            className="w-full pl-12 pr-4 py-4 bg-card rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-ring"
          />

          {/* Tag Suggestions Dropdown */}
          {showTagSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-lg max-h-64 overflow-y-auto z-20">
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-3">Tags phổ biến</p>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1.5 bg-secondary hover:bg-primary hover:text-primary-foreground rounded-lg text-sm transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedType("all")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              selectedType === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSelectedType("Artist")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              selectedType === "Artist"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Artists
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="ml-auto px-6 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Bộ lọc nâng cao
          </button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="p-6 bg-card rounded-xl border border-border space-y-4">
            <div>
              <label className="block mb-2">Mức giá</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="all">Tất cả</option>
                <option value="0-50">50.000 VND - 1.000.000 VND</option>
                <option value="50-100">1.000.000 VND - 5.000.000 VND</option>
                <option value="100+">from 5.000.000 VND</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Top Rankings */}
      <div className="mb-12">
        {/* Top Artists */}
        <div className="bg-gradient-to-br from-primary/5 to-purple-100/50 rounded-2xl border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-primary" />
            <h2>Top Artists tháng này</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topArtists.map((artist, index) => (
              <Link key={artist.id} to={`/creator/${artist.id}`}>
                <div className="flex items-center gap-4 bg-card rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="truncate">{artist.name}</h4>
                    <p className="text-sm text-muted-foreground truncate">{artist.specialty}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{artist.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-8">
        <h2 className="mb-6">Tất cả Creators</h2>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-muted-foreground">
          Tìm thấy <span className="font-semibold text-foreground">{filteredCreators.length}</span> creators
        </p>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreators.map((creator) => (
          <Link key={creator.id} to={`/creator/${creator.id}`}>
            <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={creator.image}
                alt={creator.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
                {creator.type}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div>
                <h3 className="mb-1">{creator.name}</h3>
                <p className="text-sm text-muted-foreground">{creator.specialty}</p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{creator.rating}</span>
                </div>
                <div className="text-muted-foreground">
                  {creator.commissions} commissions
                </div>
              </div>

              {/* Price */}
              <div className="text-primary">
                <span className="font-semibold text-sm">{creator.priceRange}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {creator.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Xem hồ sơ
              </button>
            </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
