import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import styles from './Pagination.module.css'
import { DOTS, usePagination } from './usePagination'

export type PaginationProps = {
  className?: string
  onPageChange: (currentPage: number) => void
  currentPage: number
  totalCount: number
  siblingCount?: number
  pageSize: number
}

const Pagination = ({
  className = '',
  onPageChange,
  currentPage,
  totalCount,
  siblingCount = 1,
  pageSize,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage < 0 || paginationRange?.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={clsx(className, styles.paginationWrapper)}>
      {currentPage !== 1 && (
        <li className={clsx(styles.item, styles.arrow, styles.prev)} onClick={onPrevious}>
          <ChevronLeftIcon className='w-3 h-3' />
        </li>
      )}
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber + index} className={clsx(styles.item, styles.dots)}>
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={pageNumber}
            className={clsx(styles.item, {
              [styles.selected]: +pageNumber === currentPage,
            })}
            onClick={() => onPageChange(+pageNumber)}
          >
            {pageNumber}
          </li>
        )
      })}
      {currentPage !== +lastPage && (
        <li className={clsx(styles.item, styles.arrow, styles.next)} onClick={onNext}>
          <ChevronRightIcon className='w-3 h-3' />
        </li>
      )}
    </ul>
  )
}

export default Pagination
