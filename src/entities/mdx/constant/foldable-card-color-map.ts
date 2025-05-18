type FoldableCardColorMap = {
  [key: string]: {
    bg: string
    border: string
    title: string
  }
}

const colorMap: FoldableCardColorMap = {
  yellow: {
    bg: '#EDF3ED',
    border: '#DBEDDB',
    title: '#4F8969'
  },
  navy: {
    bg: '#E7F3F8',
    border: '#D3E5EF',
    title: '#347EA9'
  },
  blue: {
    bg: '#F7F3F8',
    border: '#EDE5F2',
    title: '#9065B0'
  },
  red: {
    bg: '#FDEBEC',
    border: '#FFE2DD',
    title: '#D44C47'
  }
}

export default colorMap
