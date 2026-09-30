import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { allCreatorsData } from "../data/creatorsData";

// Get top creators by rating
const topCreators = [...allCreatorsData].sort((a, b) => b.rating - a.rating).slice(0, 6);

const artistsData = topCreators.filter(c => c.type === "Artist").map(c => ({ ...c, category: c.type })).slice(0, 3);

function ExhibitionCarousel({ title, data }: { title: string; data: typeof artistsData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [data.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Link to={`/creator/${data[currentIndex].id}`}>
        <div className="relative h-[400px] overflow-hidden rounded-2xl cursor-pointer group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="relative h-full bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl overflow-hidden border border-border">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <img
                  src={data[currentIndex].image}
                  alt={data[currentIndex].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary rounded-full text-sm">
                      {data[currentIndex].category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{data[currentIndex].rating}</span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{data[currentIndex].name}</h3>
                  <p className="text-lg text-white/90 mb-2">{data[currentIndex].specialty}</p>
                  <p className="text-white/70">{data[currentIndex].commissions} commissions hoàn thành</p>
                  <p className="text-yellow-400 font-semibold mt-2">{data[currentIndex].priceRange}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {data.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-8" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}

export function HomePage() {
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Chào mừng đến với Asmorius
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Nền tảng kết nối Artists và khách hàng. Biến ý tưởng của bạn thành hiện thực với những artist tài năng nhất.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/find-creators" className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Khám phá ngay
          </Link>
          <button className="px-8 py-3 border border-border rounded-lg hover:bg-secondary transition-colors">
            Tìm hiểu thêm
          </button>
        </div>
      </section>

      {/* Featured Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-card rounded-xl border border-border text-center space-y-2">
          <div className="text-4xl font-bold text-primary">1,234+</div>
          <div className="text-muted-foreground">Creators tài năng</div>
        </div>
        <div className="p-6 bg-card rounded-xl border border-border text-center space-y-2">
          <div className="text-4xl font-bold text-primary">5,678+</div>
          <div className="text-muted-foreground">Commissions hoàn thành</div>
        </div>
        <div className="p-6 bg-card rounded-xl border border-border text-center space-y-2">
          <div className="text-4xl font-bold text-primary">98%</div>
          <div className="text-muted-foreground">Khách hàng hài lòng về </div>
        </div>
      </section>

      {/* Monthly Exhibitions */}
      <section>
        <ExhibitionCarousel title="Top Artists tháng này" data={artistsData} />
      </section>

      {/* How It Works */}
      <section className="py-12 space-y-8">
        <h2 className="text-center">Cách thức hoạt động</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
              1
            </div>
            <h3>Tìm Creator phù hợp</h3>
            <p className="text-muted-foreground">
              Duyệt qua danh sách artists tài năng theo style và ngân sách của bạn
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
              2
            </div>
            <h3>Gửi yêu cầu & Thảo luận</h3>
            <p className="text-muted-foreground">
              Gửi brief chi tiết và trao đổi trực tiếp với creator qua chat nội bộ
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
              3
            </div>
            <h3>Nhận sản phẩm hoàn hảo</h3>
            <p className="text-muted-foreground">
              Thanh toán an toàn với escrow và nhận tác phẩm chất lượng cao
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
