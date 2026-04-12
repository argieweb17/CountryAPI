function Flag({ src, name }) {
  if (!src) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-sm font-medium text-slate-500">
        No flag available
      </div>
    )
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img
        src={src}
        alt={`${name} flag`}
        className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />
    </div>
  )
}

export default Flag
