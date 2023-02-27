export const formatDate = (timestamp: number | string) => {
  return new Intl.DateTimeFormat('vi-VN').format(new Date(timestamp))
}
