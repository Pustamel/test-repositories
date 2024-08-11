export function definePagination (currentPage:number, perPage:number, totalPages:number) {
  let startPage = Math.max(1, currentPage - Math.floor(perPage / 2))
  let endPage = startPage + perPage - 1
  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - perPage + 1)
  }

  const pages = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return {
    currentPage,
    totalPages,
    pages
  }
}

export function inRange (index:number, currentPage:number, perPage:number):boolean {
  let result = false
  const range = [currentPage * perPage - 6, currentPage * perPage - 1 ]

  if (index >= range[0] && index <= range[1]) {
    result = true
  }
  return result
}