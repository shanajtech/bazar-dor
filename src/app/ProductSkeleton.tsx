export default function ProductSkeleton() {
  return <main aria-busy="true" aria-label="পণ্যের তথ্য লোড হচ্ছে" className="mx-auto min-h-[65vh] max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
    <div className="animate-pulse motion-reduce:animate-none">
      <div className="mb-8 h-32 rounded-2xl bg-[#e5eee7]" />
      <div className="mb-6 h-7 w-48 rounded bg-[#dce6df]" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => <div key={i} className="space-y-4 rounded-xl border border-[#e1eae3] bg-white p-4">
          <div className="h-10 w-10 rounded-lg bg-[#e5eee7]" />
          <div className="h-4 w-2/3 rounded bg-[#e5eee7]" />
          <div className="h-3 w-1/3 rounded bg-[#e5eee7]" />
          <div className="h-6 rounded bg-[#e5eee7]" />
        </div>)}
      </div>
    </div>
  </main>;
}
