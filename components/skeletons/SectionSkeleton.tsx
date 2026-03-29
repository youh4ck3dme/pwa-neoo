const SectionSkeleton = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-6">
      <div className="h-5 w-32 bg-slate-200 rounded animate-pulse mx-auto" />
      <div className="h-10 w-2/3 bg-slate-200 rounded animate-pulse mx-auto" />
      <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-48 bg-slate-100 rounded-[7px] animate-pulse" />
        ))}
      </div>
    </div>
  </section>
);

export default SectionSkeleton;
