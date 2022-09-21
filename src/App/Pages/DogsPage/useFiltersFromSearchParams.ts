import { useCallback, useMemo, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Filters } from './types'

export function useFiltersFromSearchParams(): [() => Filters, (filters: Filters) => void] {
  const [searchParams] = useSearchParams()

  const breedId = searchParams.has('breed_id') ? Number(searchParams.get('breed_id')) : undefined
  const type = (searchParams.get('type') || 'all') as Filters['type']
  const order = (searchParams.get('order') || 'asc') as Filters['order']

  const filters = useMemo(() => ({ breedId, type, order }), [breedId, type, order])

  const navigate = useNavigate()

  const ref = useRef({ filters, navigate })
  ref.current = { filters, navigate }

  const setFilters = useCallback((filters: Filters): void => {
    const query = [
      filters.breedId !== undefined ? `breed_id=${filters.breedId}` : null,
      filters.type !== 'all' ? `type=${filters.type}` : null,
      filters.order !== 'asc' ? `order=${filters.order}` : null,
    ]
      .filter(Boolean)
      .join('&')

    ref.current.navigate({ pathname: '/dogs', search: query })
  }, [])

  const getFilters = useCallback((): Filters => ref.current.filters, [])

  return [getFilters, setFilters]
}
