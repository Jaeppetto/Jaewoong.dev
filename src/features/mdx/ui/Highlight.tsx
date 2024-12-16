export interface HighlightProps {
  children: React.ReactNode
  color?:
    | 'code'
    | 'gray'
    | 'brown'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'blue'
    | 'purple'
    | 'red'
}

export const Highlight = ({ children, color = 'yellow' }: HighlightProps) => {
  const colorMap = {
    code: 'bg-slate-200 border-none text-slate-900',
    gray: 'bg-[#F1F1EF] border-[#E3E2E0] text-[#8C8B89]',
    brown: 'bg-[#F4EEEE] border-[#F1E4E0] text-[#A5745D]',
    orange: 'bg-[#FBECDD] border-[#FADEC9] text-[#D9730E]',
    yellow: 'bg-[#FCF3DB] border-[#FDECC8] text-[#CB912F]',
    green: 'bg-[#EDF3ED] border-[#DBEDDB] text-[#4F8969]',
    blue: 'bg-[#E7F3F8] border-[#D3E5EF] text-[#347EA9]',
    purple: 'bg-[#F7F3F8] border-[#EDE5F2] text-[#9065B0]',
    red: 'bg-[#FDEBEC] border-[#FFE2DD] text-[#D44C47]'
  }

  return (
    <span
      className={`rounded-md border px-2 py-1 text-lg font-bold ${colorMap[color]}`}>
      {children}
    </span>
  )
}
