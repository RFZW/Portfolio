"use client"

type Props = {
  onSelect: (sensitive: boolean) => void
}

export default function FlashWarning({ onSelect }: Props) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-6">
      <div className="w-full max-w-md border border-red-500/40 bg-black p-8 text-center shadow-2xl">

        <div className="mb-4 text-4xl">⚠️</div>

        <h2 className="mb-4 text-xl font-bold tracking-widest text-red-500">
          CONTENT WARNING
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-gray-300">
          This website contains flashing lights, flickering effects,
          visual glitches, and rapidly changing text.

          <br /><br />

          Are you sensitive to flashing lights or visual effects?
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => onSelect(true)}
            className="w-full border border-green-500/50 bg-green-950/30 px-5 py-3 text-sm text-green-400 transition hover:bg-green-900/50"
          >
            YES — Disable visual effects
          </button>

          <button
            onClick={() => onSelect(false)}
            className="w-full border border-red-500/50 bg-red-950/30 px-5 py-3 text-sm text-red-400 transition hover:bg-red-900/50"
          >
            NO — Continue with visual effects
          </button>
        </div>

      </div>
    </div>
  )
}
