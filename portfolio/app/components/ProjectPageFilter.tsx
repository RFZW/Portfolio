"use client"

{
  /* Filter Pop Up Page */
}
type FilterProps = {
  title: string
  options: string[]
  selected: string[]
  setSelected: (val: string[]) => void
}

function FilterSection({ title, options, selected, setSelected }: FilterProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter(o => o !== option))
    } else {
      setSelected([...selected, option])
    }
  }

  return (
    <div className="mb-6">
      <h3 className="mb-3 font-semibold">{title}</h3>

      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => toggle(option)}
            className={`
              px-3 py-1 rounded-full text-sm border
              ${selected.includes(option) ? "bg-accent text-black border-accent" : "border-gray-500"}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

type ProjectPageFilterProps = {
  isOpen: boolean
  onClose: () => void
  filters: {
    type: string[]
    team: string[]
    tools: string[]
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      type: string[]
      team: string[]
      tools: string[]
    }>
  >
  applyFilters: () => void
  allTypes: string[]
  allTeams: string[]
  allTools: string[]
}

export default function ProjectPageFilter({ isOpen, onClose, filters, setFilters, applyFilters, allTypes, allTeams, allTools }: ProjectPageFilterProps) {
  if (!isOpen) return null

  const clearFilters = () => {
    setFilters({
      type: [],
      team: [],
      tools: []
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-secondary p-8 rounded-xl w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-accent">Filter Projects</h2>

        <FilterSection title="Type" options={allTypes} selected={filters.type} setSelected={val => setFilters(prev => ({ ...prev, type: val }))} />

        <FilterSection title="Team" options={allTeams} selected={filters.team} setSelected={val => setFilters(prev => ({ ...prev, team: val }))} />

        <FilterSection title="Tools" options={allTools} selected={filters.tools} setSelected={val => setFilters(prev => ({ ...prev, tools: val }))} />

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={clearFilters} className="px-4 py-2 border border-red-400 text-red-400 rounded hover:bg-red-400 hover:text-black transition">
            Clear
          </button>

          <button onClick={onClose} className="px-4 py-2 border border-gray-500 rounded">
            Cancel
          </button>

          <button
            onClick={() => {
              applyFilters()
              onClose()
            }}
            className="px-4 py-2 bg-accent text-black rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
