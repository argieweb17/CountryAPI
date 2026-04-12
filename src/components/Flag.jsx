function Flag({ src, name }) {
  if (!src) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-sm font-medium text-slate-500">
        No flag available
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${name} flag`}
      className="aspect-[16/10] w-full rounded-xl border border-slate-200 object-cover"
      loading="lazy"
    />
  )
}

export default Flag
