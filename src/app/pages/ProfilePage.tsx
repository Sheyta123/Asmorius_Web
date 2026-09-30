import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Settings, Edit, Star, Clock, CheckCircle, XCircle, Users, Image, Heart, MessageCircle, X, Briefcase } from "lucide-react";
import { allCreatorsData } from "../data/creatorsData";

const commissionsData = [
  {
    id: 1,
    title: "Dark Fantasy Character Design",
    creator: "Luna Artwork",
    status: "in_progress",
    progress: 60,
    price: "3.500.000 VND",
    deadline: "2026-06-05",
    thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Dark Fantasy Short Story",
    creator: "Moonlight Quill",
    status: "review",
    progress: 100,
    price: "2.000.000 VND",
    deadline: "2026-05-28",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Pastel Couple Illustration",
    creator: "Starlight Painter",
    status: "completed",
    progress: 100,
    price: "800.000 VND",
    deadline: "2026-05-20",
    thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop",
  },
];

const workInDutyData = [
  {
    id: 1,
    title: "Cyberpunk Character Design",
    client: "Customer A",
    status: "in_progress",
    progress: 45,
    price: "4.500.000 VND",
    deadline: "2026-06-10",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    title: "Epic Fantasy Novel",
    client: "Customer B",
    status: "in_progress",
    progress: 80,
    price: "6.000.000 VND",
    deadline: "2026-06-15",
    thumbnail: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=200&h=200&fit=crop",
  },
];

// Helper to get following list from localStorage
const getFollowingList = (): number[] => {
  const stored = localStorage.getItem("followingList");
  return stored ? JSON.parse(stored) : [];
};

const postsData = [
  {
    id: 1,
    type: "image",
    content: "Just finished this commission! 🎨",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop",
    likes: 234,
    comments: 45,
    timestamp: "2 giờ trước",
  },
  {
    id: 2,
    type: "text",
    content: "Working on some new character designs for upcoming projects. Stay tuned! ✨",
    likes: 128,
    comments: 23,
    timestamp: "1 ngày trước",
  },
  {
    id: 3,
    type: "image",
    content: "Sketch practice session 💜",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop",
    likes: 456,
    comments: 67,
    timestamp: "3 ngày trước",
  },
];

export function ProfilePage() {
  const [showCommissionsModal, setShowCommissionsModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showWorkInDutyModal, setShowWorkInDutyModal] = useState(false);
  const [showWorkDetailModal, setShowWorkDetailModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [followingData, setFollowingData] = useState<any[]>([]);

  useEffect(() => {
    const followingIds = getFollowingList();
    const followingCreators = followingIds.map(id => {
      const creator = allCreatorsData.find(c => c.id === id);
      return creator ? {
        id: creator.id,
        name: creator.name,
        type: creator.type,
        avatar: creator.image,
        isOnline: Math.random() > 0.5,
      } : null;
    }).filter(Boolean);
    setFollowingData(followingCreators);
  }, [showFollowingModal]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "text-blue-600 bg-blue-50";
      case "review":
        return "text-yellow-600 bg-yellow-50";
      case "completed":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in_progress":
        return "Đang thực hiện";
      case "review":
        return "Chờ phê duyệt";
      case "completed":
        return "Hoàn thành";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in_progress":
        return Clock;
      case "review":
        return Star;
      case "completed":
        return CheckCircle;
      default:
        return XCircle;
    }
  };

  const CommissionCard = ({ commission, isWorkInDuty = false, onViewDetail }: { commission: any; isWorkInDuty?: boolean; onViewDetail?: () => void }) => {
    const StatusIcon = getStatusIcon(commission.status);
    return (
      <div className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
        <div className="flex gap-6">
          <img
            src={commission.thumbnail}
            alt={commission.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="mb-1">{commission.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {isWorkInDuty ? `Khách hàng: ${commission.client}` : `Creator: ${commission.creator}`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{commission.price}</p>
                <p className="text-xs text-muted-foreground">Deadline: {commission.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${getStatusColor(commission.status)}`}>
                <StatusIcon className="w-4 h-4" />
                {getStatusText(commission.status)}
              </span>
            </div>
            {commission.status === "in_progress" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiến độ</span>
                  <span className="font-semibold">{commission.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${commission.progress}%` }} />
                </div>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button
                onClick={onViewDetail}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                Xem chi tiết
              </button>
              {commission.status === "review" && (
                <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm">
                  Phê duyệt
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl border border-border p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Edit className="w-5 h-5" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-1">
            <h1>Nguyễn Văn A</h1>
            <p className="text-primary">nguyen.vana@example.com</p>
            <p className="text-muted-foreground text-sm">Thành viên từ tháng 3, 2026</p>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-center flex-shrink-0">
            <button
              onClick={() => setShowCommissionsModal(true)}
              className="space-y-1 hover:opacity-80 transition-opacity"
            >
              <div className="text-2xl font-bold text-primary">{commissionsData.length}</div>
              <div className="text-sm text-primary">Commissions</div>
            </button>
            <button
              onClick={() => setShowWorkInDutyModal(true)}
              className="space-y-1 hover:opacity-80 transition-opacity"
            >
              <div className="text-2xl font-bold text-primary">{workInDutyData.length}</div>
              <div className="text-sm text-primary">Work in duty</div>
            </button>
            <button
              onClick={() => setShowFollowingModal(true)}
              className="space-y-1 hover:opacity-80 transition-opacity"
            >
              <div className="text-2xl font-bold text-primary">{followingData.length}</div>
              <div className="text-sm text-primary">Following</div>
            </button>
          </div>

          {/* Settings */}
          <button className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 flex-shrink-0">
            <Settings className="w-5 h-5" />
            Cài đặt
          </button>
        </div>
      </div>

      {/* Posts Feed - Default View */}
      <div className="space-y-6">
        <h2>Bài đăng</h2>
        {postsData.map((post) => (
          <div key={post.id} className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4>Nguyễn Văn A</h4>
                <p className="text-xs text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-4">
              <p className="mb-3">{post.content}</p>
            </div>

            {/* Post Image */}
            {post.type === "image" && post.image && (
              <img src={post.image} alt="Post" className="w-full max-h-[600px] object-cover" />
            )}

            {/* Post Actions */}
            <div className="p-4 border-t border-border flex items-center gap-6">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Commissions Modal */}
      {showCommissionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2>Commission đã đặt</h2>
              <button onClick={() => setShowCommissionsModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              {commissionsData.map((commission) => (
                <CommissionCard key={commission.id} commission={commission} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Work in Duty Modal */}
      {showWorkInDutyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2>Work in Duty</h2>
              <button onClick={() => setShowWorkInDutyModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              {workInDutyData.map((work) => (
                <CommissionCard
                  key={work.id}
                  commission={work}
                  isWorkInDuty={true}
                  onViewDetail={() => {
                    setSelectedWork(work);
                    setShowWorkDetailModal(true);
                    setShowWorkInDutyModal(false);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2>Danh sách Following</h2>
              <button onClick={() => setShowFollowingModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {followingData.map((creator: any) => (
                  <div key={creator.id} className="bg-secondary rounded-xl border border-border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={creator.avatar} alt={creator.name} className="w-16 h-16 rounded-full object-cover" />
                        {creator.isOnline && (
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="truncate">{creator.name}</h4>
                        <p className="text-sm text-muted-foreground">{creator.type}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                          Đã theo dõi
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Link to={`/creator/${creator.id}`} className="flex-1">
                        <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                          Xem hồ sơ
                        </button>
                      </Link>
                      <button className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm">
                        Bỏ follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Work Detail Modal */}
      {showWorkDetailModal && selectedWork && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2>Chi tiết Work in Duty</h2>
              <button onClick={() => setShowWorkDetailModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Work Info */}
              <div className="flex gap-6">
                <img
                  src={selectedWork.thumbnail}
                  alt={selectedWork.title}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1 space-y-2">
                  <h3>{selectedWork.title}</h3>
                  <p className="text-muted-foreground">Khách hàng: {selectedWork.client}</p>
                  <p className="text-primary font-semibold">{selectedWork.price}</p>
                  <p className="text-sm text-muted-foreground">Deadline: {selectedWork.deadline}</p>
                </div>
              </div>

              {/* Progress */}
              <div>
                <h4 className="mb-3">Tiến độ hiện tại</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Hoàn thành</span>
                    <span className="font-semibold">{selectedWork.progress}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${selectedWork.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Brief */}
              <div>
                <h4 className="mb-3">Brief từ khách hàng</h4>
                <div className="p-4 bg-secondary rounded-lg">
                  <p className="text-sm">
                    Yêu cầu: Thiết kế nhân vật theo phong cách cyberpunk với màu sắc neon chủ đạo.
                    Nhân vật là một hacker nữ với outfit tương lai. Cần có cả full body và close-up portrait.
                  </p>
                </div>
              </div>

              {/* Updates */}
              <div>
                <h4 className="mb-3">Cập nhật gần đây</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm font-semibold mb-1">3 giờ trước</p>
                    <p className="text-sm">Đã gửi bản sketch cho khách hàng review</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm font-semibold mb-1">1 ngày trước</p>
                    <p className="text-sm">Bắt đầu làm việc với dự án</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Gửi cập nhật
                </button>
                <button className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors">
                  Nhắn tin khách hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
