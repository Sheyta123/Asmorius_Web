import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Settings, Edit, Star, Heart, MessageCircle, FileText, ArrowLeft, X } from "lucide-react";

// Import all creators data
import { allCreatorsData } from "../data/creatorsData";

// Helper to get/set following list from localStorage
const getFollowingList = (): number[] => {
  const stored = localStorage.getItem("followingList");
  return stored ? JSON.parse(stored) : [];
};

const setFollowingList = (list: number[]) => {
  localStorage.setItem("followingList", JSON.stringify(list));
};

// Deterministic pseudo-random based on creator id (no Math.random)
const seedRandom = (seed: number, range: number, offset: number) =>
  ((seed * 1664525 + 1013904223) % range) + offset;

// Mock creator data - in real app, fetch from API
const getCreatorData = (id: string) => {
  const creatorId = parseInt(id);
  const creator = allCreatorsData.find(c => c.id === creatorId);

  if (!creator) return null;

  const joinMonths = ["Tháng 1", "Tháng 3", "Tháng 6", "Tháng 9", "Tháng 12"];
  const joinYears = ["2022", "2023", "2024"];

  return {
    ...creator,
    workInDuty: seedRandom(creatorId * 7, 20, 5),
    followers: seedRandom(creatorId * 13, 3000, 500),
    bio: `Chuyên về ${creator.specialty} với nhiều năm kinh nghiệm. Đam mê tạo ra những tác phẩm độc đáo và ấn tượng.`,
    email: `${creator.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    joinDate: joinMonths[seedRandom(creatorId * 3, 5, 0)] + ", " + joinYears[seedRandom(creatorId * 5, 3, 0)],
  };
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

export function CreatorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = getCreatorData(id || "");
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(creator?.followers ?? 0);
  const [showTOSModal, setShowTOSModal] = useState(false);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // Commission form state
  const [commissionTitle, setCommissionTitle] = useState("");
  const [commissionDescription, setCommissionDescription] = useState("");
  const [commissionDeadline, setCommissionDeadline] = useState("");

  // Pricing options
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [selectedBodyType, setSelectedBodyType] = useState<string>("");
  const [additionalCharacter, setAdditionalCharacter] = useState(false);
  const [withBackground, setWithBackground] = useState(false);

  // Deposit state
  const [depositAmount, setDepositAmount] = useState("");

  // Get base price from creator's price range
  const getBasePriceFromRange = () => {
    if (!creator) return 500000;

    const priceRange = creator.priceRange;
    if (priceRange.includes("from")) {
      // "from 5.000.000 VND" -> base is 5,000,000
      const match = priceRange.match(/from\s+([\d.]+)/);
      if (match) {
        return parseInt(match[1].replace(/\./g, "")) * 1000;
      }
    } else {
      // "50.000 VND - 1.000.000 VND" -> base is lower bound
      const match = priceRange.match(/([\d.]+)\s+VND/);
      if (match) {
        return parseInt(match[1].replace(/\./g, "")) * 1000;
      }
    }
    return 500000;
  };

  const basePrice = getBasePriceFromRange();

  // Price calculation based on Term of Service
  const basePrices = {
    format: {
      sketch: Math.max(basePrice * 0.3, 500000),
      baseColor: Math.max(basePrice * 0.6, 1000000),
      fullColor: basePrice,
    },
    bodyType: {
      shot: Math.max(basePrice * 0.3, 500000),
      halfBody: Math.max(basePrice * 0.6, 1000000),
      fullBody: basePrice,
    },
    extras: {
      additionalCharacter: Math.max(basePrice * 0.4, 500000),
      background: Math.max(basePrice * 0.5, 800000),
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (selectedFormat) total += basePrices.format[selectedFormat as keyof typeof basePrices.format] || 0;
    if (selectedBodyType) total += basePrices.bodyType[selectedBodyType as keyof typeof basePrices.bodyType] || 0;
    if (additionalCharacter) total += basePrices.extras.additionalCharacter;
    if (withBackground) total += basePrices.extras.background;
    return total;
  };

  useEffect(() => {
    if (creator) {
      const followingList = getFollowingList();
      const alreadyFollowing = followingList.includes(creator.id);
      setIsFollowing(alreadyFollowing);
      setFollowersCount(creator.followers + (alreadyFollowing ? 1 : 0));
    }
  }, [creator?.id]);

  const handleFollowToggle = () => {
    if (!creator) return;

    const followingList = getFollowingList();
    if (isFollowing) {
      const newList = followingList.filter(cid => cid !== creator.id);
      setFollowingList(newList);
      setIsFollowing(false);
      setFollowersCount(prev => prev - 1);
    } else {
      const newList = [...followingList, creator.id];
      setFollowingList(newList);
      setIsFollowing(true);
      setFollowersCount(prev => prev + 1);
    }
  };

  if (!creator) {
    return (
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1>Creator không tồn tại</h1>
          <button onClick={() => navigate("/find-creators")} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg">
            Quay lại tìm kiếm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Quay lại
      </button>

      {/* Profile Header */}
      <div className="mb-8 bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl border border-border p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img
              src={creator.image}
              alt={creator.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="absolute bottom-0 right-0 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
              {creator.type}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left space-y-1">
            <h1>{creator.name}</h1>
            <p className="text-primary">{creator.email}</p>
            <p className="text-muted-foreground">{creator.specialty}</p>
            <p className="text-muted-foreground text-sm">Thành viên từ {creator.joinDate}</p>
            <div className="flex items-center gap-2 justify-center md:justify-start mt-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{creator.rating}</span>
              <span className="text-muted-foreground">({creator.commissions} reviews)</span>
            </div>
          </div>

          {/* Stats - Not Clickable */}
          <div className="flex gap-6 text-center flex-shrink-0">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{creator.commissions}</div>
              <div className="text-sm text-muted-foreground">Commissions</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{creator.workInDuty}</div>
              <div className="text-sm text-muted-foreground">Work in duty</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-foreground">{followersCount}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </div>
          </div>

          {/* Term of Service Button */}
          <button className="px-6 py-3 bg-card border border-border rounded-lg hover:bg-secondary transition-colors flex items-center gap-2 flex-shrink-0">
            <FileText className="w-5 h-5" />
            Term of Service
          </button>
        </div>

        {/* Bio */}
        <div className="mt-6 p-4 bg-card/50 rounded-lg">
          <p className="text-foreground">{creator.bio}</p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {creator.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price Range */}
        <div className="mt-4 p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-muted-foreground mb-1">Mức giá:</p>
          <p className="text-xl font-bold text-primary">{creator.priceRange}</p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setShowTOSModal(true)}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Đặt Commission
          </button>
          <button
            onClick={handleFollowToggle}
            className={`flex-1 px-6 py-3 rounded-lg transition-colors ${
              isFollowing
                ? "bg-secondary text-secondary-foreground border border-border"
                : "border border-border hover:bg-secondary"
            }`}
          >
            {isFollowing ? "Đã theo dõi" : "Theo dõi"}
          </button>
          <button className="px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors">
            Nhắn tin
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        <h2>Bài đăng của {creator.name}</h2>
        {postsData.map((post) => (
          <div key={post.id} className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Post Header */}
            <div className="p-4 flex items-center gap-3">
              <img
                src={creator.image}
                alt={creator.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4>{creator.name}</h4>
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

      {/* Term of Service Modal */}
      {showTOSModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2>Term of Service - {creator.name}</h2>
              <button onClick={() => setShowTOSModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="prose prose-sm max-w-none">
                <h3>Bảng giá dịch vụ</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-2">Format:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Sketch: {Math.round(basePrices.format.sketch).toLocaleString('vi-VN')} VND</li>
                      <li>Base-color: {Math.round(basePrices.format.baseColor).toLocaleString('vi-VN')} VND</li>
                      <li>Full-color: {Math.round(basePrices.format.fullColor).toLocaleString('vi-VN')} VND</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Phần vẽ:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Shot (bust-up/headshot): {Math.round(basePrices.bodyType.shot).toLocaleString('vi-VN')} VND</li>
                      <li>Half-body: {Math.round(basePrices.bodyType.halfBody).toLocaleString('vi-VN')} VND</li>
                      <li>Full-body: {Math.round(basePrices.bodyType.fullBody).toLocaleString('vi-VN')} VND</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Yêu cầu khác:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Thêm character: +{Math.round(basePrices.extras.additionalCharacter).toLocaleString('vi-VN')} VND/nhân vật</li>
                      <li>Kèm background: +{Math.round(basePrices.extras.background).toLocaleString('vi-VN')} VND</li>
                    </ul>
                  </div>
                </div>

                <h3 className="mt-6">Điều khoản chung</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Thanh toán 50% trước khi bắt đầu, 50% khi hoàn thành</li>
                  <li>Chỉnh sửa miễn phí tối đa 3 lần trong quá trình sketch</li>
                  <li>Thời gian hoàn thành: 7-14 ngày tùy độ phức tạp</li>
                  <li>File giao sẵn: PNG/JPG chất lượng cao, 300 DPI</li>
                  <li>Bản quyền thuộc về khách hàng sau khi thanh toán đầy đủ</li>
                  <li>Tôi có quyền sử dụng tác phẩm để quảng bá portfolio</li>
                </ul>

                <h3 className="mt-6">Không chấp nhận</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Nội dung 18+, bạo lực quá mức</li>
                  <li>Đạo nhái tác phẩm của người khác</li>
                  <li>Nội dung phân biệt chủng tộc, tôn giáo</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowTOSModal(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setShowTOSModal(false);
                    setShowCommissionModal(true);
                  }}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Đồng ý và tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Commission Request Modal */}
      {showCommissionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2>Đặt Commission từ {creator.name}</h2>
              <button onClick={() => setShowCommissionModal(false)} className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block mb-2">Tiêu đề commission</label>
                <input
                  type="text"
                  value={commissionTitle}
                  onChange={(e) => setCommissionTitle(e.target.value)}
                  placeholder="VD: Character Design cho OC của tôi"
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block mb-2">Mô tả chi tiết</label>
                <textarea
                  rows={4}
                  value={commissionDescription}
                  onChange={(e) => setCommissionDescription(e.target.value)}
                  placeholder="Mô tả chi tiết yêu cầu của bạn: style, màu sắc, concept..."
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div>
                <label className="block mb-2">Deadline</label>
                <input
                  type="date"
                  value={commissionDeadline}
                  onChange={(e) => setCommissionDeadline(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {/* Format Options */}
              <div>
                <label className="block mb-3 font-semibold">Format:</label>
                <div className="space-y-2">
                  {[
                    { value: 'sketch', label: 'Sketch', price: Math.round(basePrices.format.sketch).toLocaleString('vi-VN') + ' VND' },
                    { value: 'baseColor', label: 'Base-color', price: Math.round(basePrices.format.baseColor).toLocaleString('vi-VN') + ' VND' },
                    { value: 'fullColor', label: 'Full-color', price: Math.round(basePrices.format.fullColor).toLocaleString('vi-VN') + ' VND' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80">
                      <input
                        type="radio"
                        name="format"
                        value={option.value}
                        checked={selectedFormat === option.value}
                        onChange={(e) => setSelectedFormat(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="flex-1">{option.label}</span>
                      <span className="text-primary font-semibold">{option.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Body Type Options */}
              <div>
                <label className="block mb-3 font-semibold">Phần vẽ:</label>
                <div className="space-y-2">
                  {[
                    { value: 'shot', label: 'Shot (bust-up/headshot)', price: Math.round(basePrices.bodyType.shot).toLocaleString('vi-VN') + ' VND' },
                    { value: 'halfBody', label: 'Half-body', price: Math.round(basePrices.bodyType.halfBody).toLocaleString('vi-VN') + ' VND' },
                    { value: 'fullBody', label: 'Full-body', price: Math.round(basePrices.bodyType.fullBody).toLocaleString('vi-VN') + ' VND' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80">
                      <input
                        type="radio"
                        name="bodyType"
                        value={option.value}
                        checked={selectedBodyType === option.value}
                        onChange={(e) => setSelectedBodyType(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="flex-1">{option.label}</span>
                      <span className="text-primary font-semibold">{option.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <label className="block mb-3 font-semibold">Yêu cầu khác:</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80">
                    <input
                      type="checkbox"
                      checked={additionalCharacter}
                      onChange={(e) => setAdditionalCharacter(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="flex-1">Thêm character</span>
                    <span className="text-primary font-semibold">+{Math.round(basePrices.extras.additionalCharacter).toLocaleString('vi-VN')} VND</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80">
                    <input
                      type="checkbox"
                      checked={withBackground}
                      onChange={(e) => setWithBackground(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="flex-1">Kèm background</span>
                    <span className="text-primary font-semibold">+{Math.round(basePrices.extras.background).toLocaleString('vi-VN')} VND</span>
                  </label>
                </div>
              </div>

              {/* Total Price */}
              <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Tổng giá dự kiến:</span>
                  <span className="text-2xl font-bold text-primary">
                    {calculateTotalPrice().toLocaleString('vi-VN')} VND
                  </span>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowCommissionModal(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={() => {
                    setShowCommissionModal(false);
                    setShowDepositModal(true);
                  }}
                  disabled={!selectedFormat || !selectedBodyType}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Gửi yêu cầu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-md w-full overflow-hidden flex flex-col">
            <div className="p-6 border-b border-border">
              <h2>Nhập số tiền đặt cọc</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-4 bg-secondary rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tổng giá trị:</span>
                  <span className="font-semibold">{calculateTotalPrice().toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Đặt cọc tối thiểu (50%):</span>
                  <span className="font-semibold text-primary">{(calculateTotalPrice() * 0.5).toLocaleString('vi-VN')} VND</span>
                </div>
              </div>

              <div>
                <label className="block mb-2">Số tiền đặt cọc</label>
                <input
                  type="text"
                  value={depositAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d]/g, "");
                    setDepositAmount(value);
                  }}
                  placeholder="VD: 2000000"
                  className="w-full px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              {depositAmount && parseInt(depositAmount) < calculateTotalPrice() * 0.5 && (
                <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                  <p className="text-sm text-destructive">
                    ⚠️ Số tiền đặt cọc phải đạt tối thiểu 50% theo Term of Service của creator
                  </p>
                </div>
              )}

              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  💡 Theo Term of Service, bạn cần thanh toán 50% trước khi creator bắt đầu làm việc.
                  Số tiền còn lại sẽ được thanh toán khi hoàn thành.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
                >
                  Quay lại
                </button>
                <button
                  onClick={() => {
                    const amount = parseInt(depositAmount);
                    const minDeposit = calculateTotalPrice() * 0.5;

                    if (amount >= minDeposit) {
                      alert("Thanh toán thành công! Yêu cầu đã được gửi đến creator.");
                      navigate(`/messages?conversation=${creator.id}`);
                    }
                  }}
                  disabled={!depositAmount || parseInt(depositAmount) < calculateTotalPrice() * 0.5}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Xác nhận thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
