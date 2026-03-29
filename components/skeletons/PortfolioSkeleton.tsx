const PortfolioSkeleton = () => (
  <section className="py-24 bg-slate-50/50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-4 mx-auto" />
      <div className="h-12 w-96 bg-slate-200 rounded animate-pulse mb-12 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="w-full h-48 bg-slate-200 animate-pulse" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
              <div className="h-3 w-2/3 bg-slate-100 rounded animate-pulse" />
              <div className="flex gap-2 pt-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-5 w-16 bg-slate-100 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSkeleton;
