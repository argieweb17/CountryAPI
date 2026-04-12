import { applyRipple } from '../utils/ripple'

function Borders({ borders, onBorderClick, isLoading }) {
  if (isLoading) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">Loading border countries...</p>
  }

  if (!Array.isArray(borders) || borders.length === 0) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">No border countries listed.</p>
  }

  return (
    <div className="flex flex-wrap gap-2">
      {borders.map((borderName) => (
        <button
          key={borderName}
          type="button"
          onClick={() => onBorderClick(borderName)}
          onPointerDown={applyRipple}
          className="isolate overflow-hidden rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold tracking-wide text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900 hover:bg-slate-900 hover:text-white active:translate-y-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:bg-teal-500/20"
        >
          {borderName}
        </button>
      ))}
    </div>
  )
}

export default Borders
