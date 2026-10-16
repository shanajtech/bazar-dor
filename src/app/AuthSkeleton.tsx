export default function AuthSkeleton() {
  return (
    <main aria-busy="true" aria-label="লোড হচ্ছে" className="min-h-[650px] bg-[#f0f6f1] px-4 pb-24 pt-12">
      <div className="mx-auto max-w-[440px] animate-pulse motion-reduce:animate-none">
        <div className="mx-auto mb-3 h-8 w-48 rounded bg-[#dce6df]" />
        <div className="mx-auto mb-6 h-4 w-64 rounded bg-[#dce6df]" />
        <div className="space-y-5 rounded-2xl border border-[#e1eae3] bg-white p-6">
          {[0, 1, 2].map((item) => <div key={item} className="h-12 rounded-lg bg-[#e5eee7]" />)}
          <div className="h-11 rounded-lg bg-[#b9d9c3]" />
        </div>
      </div>
    </main>
  );
}
