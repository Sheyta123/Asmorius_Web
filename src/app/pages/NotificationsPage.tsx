import { Link } from "react-router";
import { Bell, UserPlus, FileText, TrendingUp, CheckCircle, Clock } from "lucide-react";

const notificationsData = [
  {
    id: 0,
    type: "new_request",
    icon: Bell,
    title: "Yêu cầu commission mới",
    message: "Bạn có một yêu cầu commission mới từ khách hàng Customer A cho dự án 'Cyberpunk Character Design'",
    time: "Vừa xong",
    isRead: false,
    hasAction: true,
  },
  {
    id: 1,
    type: "commission_update",
    icon: FileText,
    title: "Commission đang xử lý",
    message: "Luna Artwork đã gửi bản phác thảo cho commission 'Dark Fantasy Character Design' của bạn",
    time: "5 phút trước",
    isRead: false,
  },
  {
    id: 2,
    type: "creator_post",
    icon: Bell,
    title: "Creator bạn follow có bài đăng mới",
    message: "Starlight Painter vừa đăng một Reel mới: 'Pastel character design process'",
    time: "2 giờ trước",
    isRead: false,
  },
  {
    id: 3,
    type: "commission_complete",
    icon: CheckCircle,
    title: "Commission hoàn thành",
    message: "Moonlight Quill đã hoàn thành commission 'Dark Fantasy Short Story' của bạn. Vui lòng xem và phê duyệt.",
    time: "1 ngày trước",
    isRead: true,
  },
  {
    id: 4,
    type: "monthly_update",
    icon: TrendingUp,
    title: "Cập nhật Monthly Creator",
    message: "Danh sách Top Creators tháng này đã được cập nhật. Xem ngay những tài năng mới!",
    time: "2 ngày trước",
    isRead: true,
  },
  {
    id: 5,
    type: "new_follower",
    icon: UserPlus,
    title: "Follower mới",
    message: "Nebula Arts đã bắt đầu theo dõi bạn",
    time: "3 ngày trước",
    isRead: true,
  },
  {
    id: 6,
    type: "commission_progress",
    icon: Clock,
    title: "Tiến độ commission",
    message: "Fantasy Forge đã cập nhật tiến độ commission 'Epic Fantasy Novel' - Đang ở giai đoạn 60%",
    time: "4 ngày trước",
    isRead: true,
  },
  {
    id: 7,
    type: "creator_post",
    icon: Bell,
    title: "Bài đăng mới từ creator",
    message: "Velvet Brush vừa chia sẻ video 'Realistic portrait painting' trên Reels",
    time: "5 ngày trước",
    isRead: true,
  },
];

export function NotificationsPage() {
  const unreadCount = notificationsData.filter((n) => !n.isRead).length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1>Bản tin Asmorius</h1>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm">
              {unreadCount} mới
            </span>
          )}
        </div>
        <p className="text-muted-foreground">
          Cập nhật mới nhất về creators, commissions và hoạt động của bạn
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notificationsData.map((notification: any) => {
          const Icon = notification.icon;
          return (
            <div
              key={notification.id}
              className={`p-5 rounded-xl border hover:shadow-md transition-all ${
                notification.isRead
                  ? "bg-card border-border"
                  : "bg-primary/5 border-primary/30"
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    notification.isRead
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base">{notification.title}</h3>
                    {!notification.isRead && (
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mb-3">{notification.time}</p>

                  {/* Action Button for new requests */}
                  {notification.hasAction && (
                    <Link to="/request/1">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm">
                        Xử lí yêu cầu
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State for when all read */}
      {notificationsData.length === 0 && (
        <div className="text-center py-16 space-y-4">
          <div className="w-20 h-20 mx-auto bg-secondary rounded-full flex items-center justify-center">
            <Bell className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3>Chưa có thông báo</h3>
          <p className="text-muted-foreground">
            Các thông báo của bạn sẽ hiển thị ở đây
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
          Đánh dấu tất cả đã đọc
        </button>
        <button className="px-6 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
          Cài đặt thông báo
        </button>
      </div>
    </div>
  );
}
