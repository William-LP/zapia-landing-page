import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie Martin",
    role: "Freelance web designer",
    avatar: "SM",
    rating: 5,
    text: "I've tried four different hosting providers over the years. Zapia is the first one where I don't spend my evenings debugging server issues. My clients' sites just work.",
  },
  {
    name: "Karim Benzali",
    role: "Founder, ShopKarim",
    avatar: "KB",
    rating: 5,
    text: "Our WooCommerce store handles Black Friday traffic without breaking a sweat. Page loads went from 3.2s to 0.7s after moving to Zapia Pro. That alone paid for itself in conversions.",
  },
  {
    name: "Priya Nair",
    role: "CTO, TechStartup",
    avatar: "PN",
    rating: 5,
    text: "The migration team handled everything — database, files, DNS — without any downtime. I was skeptical but it really was seamless. Support was responsive at every step.",
  },
  {
    name: "Thomas Dupont",
    role: "Blogger & content creator",
    avatar: "TD",
    rating: 5,
    text: "For $3/month I get SSL, backups, and speeds my readers notice. I even got a personal message from support after my ticket to make sure everything was resolved. Rare these days.",
  },
  {
    name: "Amira Hassan",
    role: "Digital agency owner",
    avatar: "AH",
    rating: 5,
    text: "We run 60+ client sites on Zapia Business. The dashboard is clean, the uptime is real, and when something breaks (rarely), it gets fixed fast. Exactly what an agency needs.",
  },
  {
    name: "Lucas Pereira",
    role: "Full-stack developer",
    avatar: "LP",
    rating: 5,
    text: "Appreciated that I can configure PHP versions, set custom headers, and access SSH without jumping through hoops. Zapia gives developers the control they need.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-4">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            Loved by thousands
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Real results,{" "}
            <span className="gradient-text">real customers</span>
          </h2>
          <div className="flex items-center justify-center gap-3 text-slate-500">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-900">4.9</span>
            <span className="text-sm">from 8,200+ verified reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="break-inside-avoid card-hover bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm"
            >
              <Stars count={t.rating} />
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                "{t.text}"
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
