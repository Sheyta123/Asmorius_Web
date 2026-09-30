import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Check, X } from "lucide-react";

export function RequestHandlerPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock request data
  const request = {
    id: id || "1",
    title: "Cyberpunk Character Design",
    customer: "Customer A",
    customerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    description: "Yêu cầu: Thiết kế nhân vật theo phong cách cyberpunk với màu sắc neon chủ đạo. Nhân vật là một hacker nữ với outfit tương lai. Cần có cả full body và close-up portrait.",
    deadline: "2026-06-15",
    requirements: {
      format: "Full-color",
      bodyType: "Full-body",
      additionalCharacter: false,
      withBackground: true,
    },
    totalPrice: "4.700.000 VND",
    deposit: "2.350.000 VND",
    depositStatus: "Đã thanh toán",
    submittedAt: "2026-06-01 14:30",
  };

  const handleAccept = () => {
    // TODO: Accept request logic
    alert("Đã chấp nhận yêu cầu!");
    navigate(`/messages?conversation=customer-${request.customer}`);
  };

  const handleReject = () => {
    // TODO: Reject request logic
    if (confirm("Bạn có chắc chắn muốn từ chối yêu cầu này?")) {
      alert("Đã từ chối yêu cầu");
      navigate("/notifications");
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Quay lại
      </button>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-br from-primary/10 to-purple-600/10">
          <h1 className="mb-2">Yêu cầu Commission Mới</h1>
          <p className="text-muted-foreground">Đã gửi lúc {request.submittedAt}</p>
        </div>

        {/* Customer Info */}
        <div className="p-6 border-b border-border">
          <h3 className="mb-4">Thông tin khách hàng</h3>
          <div className="flex items-center gap-4">
            <img
              src={request.customerAvatar}
              alt={request.customer}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4>{request.customer}</h4>
              <p className="text-sm text-muted-foreground">Khách hàng</p>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h3 className="mb-2">Tiêu đề commission</h3>
            <p className="text-lg font-semibold">{request.title}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2">Mô tả chi tiết</h3>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm">{request.description}</p>
            </div>
          </div>

          {/* Requirements */}
          <div>
            <h3 className="mb-3">Yêu cầu cụ thể</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Format</p>
                <p className="font-semibold">{request.requirements.format}</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Phần vẽ</p>
                <p className="font-semibold">{request.requirements.bodyType}</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Thêm character</p>
                <p className="font-semibold">{request.requirements.additionalCharacter ? "Có" : "Không"}</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Background</p>
                <p className="font-semibold">{request.requirements.withBackground ? "Có" : "Không"}</p>
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div>
            <h3 className="mb-2">Deadline mong muốn</h3>
            <p className="text-lg">{request.deadline}</p>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="mb-3">Thông tin thanh toán</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <span>Tổng giá trị</span>
                <span className="text-xl font-bold text-primary">{request.totalPrice}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary rounded-lg">
                <span>Đặt cọc (50%)</span>
                <div className="text-right">
                  <span className="text-lg font-semibold block">{request.deposit}</span>
                  <span className="text-sm text-green-600">{request.depositStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex gap-4">
          <button
            onClick={handleReject}
            className="flex-1 px-6 py-3 border-2 border-destructive text-destructive rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-5 h-5" />
            Từ chối
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Chấp nhận
          </button>
        </div>
      </div>
    </div>
  );
}
