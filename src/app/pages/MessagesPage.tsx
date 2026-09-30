import { useState } from "react";
import { Link } from "react-router";
import { Search, Send, Paperclip, MoreVertical, ArrowLeft } from "lucide-react";
import { allCreatorsData } from "../data/creatorsData";

// Mock conversations data
const conversationsData = [
  {
    id: 1,
    creatorId: 1,
    creatorName: "Luna Artwork",
    creatorAvatar: allCreatorsData[0].image,
    lastMessage: "Cảm ơn bạn! Tôi sẽ bắt đầu làm ngay",
    timestamp: "10 phút trước",
    unread: 2,
    isOnline: true,
  },
  {
    id: 2,
    creatorId: 2,
    creatorName: "Starlight Painter",
    creatorAvatar: allCreatorsData[1].image,
    lastMessage: "Sketch đầu tiên đã sẵn sàng, bạn xem qua nhé",
    timestamp: "2 giờ trước",
    unread: 0,
    isOnline: false,
  },
  {
    id: 3,
    creatorId: 3,
    creatorName: "Nebula Arts",
    creatorAvatar: allCreatorsData[2].image,
    lastMessage: "Bạn có thể gửi thêm reference images không?",
    timestamp: "1 ngày trước",
    unread: 0,
    isOnline: true,
  },
];

const mockMessages = [
  {
    id: 1,
    senderId: "user",
    text: "Chào bạn! Tôi đã gửi yêu cầu commission cho dự án Character Design",
    timestamp: "14:30",
  },
  {
    id: 2,
    senderId: "creator",
    text: "Chào bạn! Tôi đã nhận được yêu cầu của bạn rồi. Để tôi xem qua brief nhé",
    timestamp: "14:32",
  },
  {
    id: 3,
    senderId: "creator",
    text: "Concept rất hay đấy! Tôi sẽ bắt đầu làm sketch trong tuần này",
    timestamp: "14:35",
  },
  {
    id: 4,
    senderId: "user",
    text: "Cảm ơn bạn nhiều! Tôi rất mong chờ",
    timestamp: "14:36",
  },
  {
    id: 5,
    senderId: "creator",
    text: "Cảm ơn bạn! Tôi sẽ bắt đầu làm ngay",
    timestamp: "14:38",
  },
];

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<any>(conversationsData[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // TODO: Send message logic
    setMessageText("");
  };

  const filteredConversations = conversationsData.filter((conv) =>
    conv.creatorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="bg-card rounded-2xl border border-border overflow-hidden h-[calc(100vh-200px)] flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-border flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm cuộc trò chuyện..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-4 cursor-pointer hover:bg-secondary transition-colors border-b border-border ${
                  selectedConversation?.id === conv.id ? "bg-secondary" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={conv.creatorAvatar}
                      alt={conv.creatorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conv.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="truncate text-sm">{conv.creatorName}</h4>
                      <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-semibold">
                      {conv.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConversation.creatorAvatar}
                  alt={selectedConversation.creatorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold">{selectedConversation.creatorName}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.isOnline ? "Đang hoạt động" : "Không hoạt động"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/creator/${selectedConversation.creatorId}`}>
                  <button className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary transition-colors">
                    Xem hồ sơ
                  </button>
                </Link>
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      message.senderId === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.senderId === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-muted-foreground" />
                </button>
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 px-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Chọn một cuộc trò chuyện để bắt đầu</p>
          </div>
        )}
      </div>
    </div>
  );
}
