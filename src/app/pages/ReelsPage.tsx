import { Heart, MessageCircle, Share2, Play } from "lucide-react";

const reelsData = [
  {
    id: 1,
    creator: "Luna Artwork",
    avatar: "https://images.unsplash.com/photo-1509803874385-db7c23652552?w=100&h=100&fit=crop",
    title: "Speed painting: Dark fantasy character",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=600&fit=crop",
    likes: 1243,
    comments: 87,
    duration: "0:45",
  },
  {
    id: 2,
    creator: "Starlight Painter",
    avatar: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=100&h=100&fit=crop",
    title: "Pastel character design process",
    thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=600&fit=crop",
    likes: 892,
    comments: 54,
    duration: "1:20",
  },
  {
    id: 3,
    creator: "Nebula Arts",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    title: "Cyberpunk city sketch",
    thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=600&fit=crop",
    likes: 2156,
    comments: 143,
    duration: "2:10",
  },
  {
    id: 4,
    creator: "Shadow Canvas",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    title: "Gothic horror illustration",
    thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=600&fit=crop",
    likes: 1567,
    comments: 92,
    duration: "1:45",
  },
  {
    id: 5,
    creator: "Blossom Studio",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    title: "Chibi character cuteness overload",
    thumbnail: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=600&fit=crop",
    likes: 978,
    comments: 61,
    duration: "1:05",
  },
  {
    id: 6,
    creator: "Neon Dreams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    title: "Cyberpunk neon scene WIP",
    thumbnail: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=600&fit=crop",
    likes: 1834,
    comments: 108,
    duration: "0:55",
  },
  {
    id: 7,
    creator: "Velvet Brush",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    title: "Realistic portrait painting",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=600&fit=crop",
    likes: 2345,
    comments: 156,
    duration: "3:20",
  },
  {
    id: 8,
    creator: "Pixel Paradise",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    title: "Pixel art game character",
    thumbnail: "https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=400&h=600&fit=crop",
    likes: 1456,
    comments: 78,
    duration: "1:15",
  },
];

export function ReelsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Reels</h1>
        <p className="text-muted-foreground">
          Khám phá những video ngắn showcase từ các creators tài năng
        </p>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reelsData.map((reel) => (
          <div
            key={reel.id}
            className="group cursor-pointer relative aspect-[9/16] rounded-xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all"
          >
            {/* Thumbnail */}
            <img
              src={reel.thumbnail}
              alt={reel.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 group-hover:opacity-100 transition-opacity">
              {/* Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                {reel.duration}
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
                {/* Creator Info */}
                <div className="flex items-center gap-2">
                  <img
                    src={reel.avatar}
                    alt={reel.creator}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                  <span className="text-white text-sm font-semibold">{reel.creator}</span>
                </div>

                {/* Title */}
                <p className="text-white text-sm line-clamp-2">{reel.title}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-white text-sm">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{reel.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{reel.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Reel CTA */}
      <div className="mt-12 p-8 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl border border-border text-center space-y-4">
        <h2>Bạn là creator?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Chia sẻ quá trình sáng tạo của bạn qua video ngắn và thu hút thêm nhiều khách hàng tiềm năng
        </p>
        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2">
          <Play className="w-5 h-5" />
          Đăng Reel của bạn
        </button>
      </div>
    </div>
  );
}
