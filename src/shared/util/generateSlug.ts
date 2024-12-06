const generateSlug = (text: string, suffix?: number): string => {
  const baseSlug = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s가-힣]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')

  return suffix ? `${baseSlug}-${suffix}` : baseSlug
}
export default generateSlug
