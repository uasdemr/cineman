import { useEffect, useState } from "react"

import { store } from "../../store"
import { fetchFilmsAction } from "../../store/api-actions"
import { clearFilms } from "../../store/films-slice";
import { useAppSelector } from "../../hooks";
import { useSearchParams } from "react-router-dom";

function ShowMoreButton() {
  let total = useAppSelector(state => state.DATA.total)
  const sort = useAppSelector(state => state.DATA.sort)
  const isLoading = useAppSelector(state => state.DATA.isLoading)

  let [offset, setOffset] = useState(0)
  let [limit, setLimit] = useState(5)

  const [searchParams, setSearchParams] = useSearchParams()

  const onButtonClickHandler = () => {
    setOffset(offset += 5)
    if (sort) {
      setSearchParams({ 'offset': '' + offset, 'limit': '' + limit, 'sort_by': '' + sort })
      store.dispatch(fetchFilmsAction({ offset, limit, sort }))
    } else {
      setSearchParams({ 'offset': '' + offset, 'limit': '' + limit })
      store.dispatch(fetchFilmsAction({ offset, limit }))
    }
  }

  useEffect(() => {
    store.dispatch(clearFilms())
    const localOffset = sort ? 0 : offset
    const localLimit = sort ? offset + limit : 5
    const noSortLimit = sort ? 5 : offset + limit
    if (sort) {
      setSearchParams({ 'offset': '' + localOffset, 'limit': '' + localLimit, 'sort': sort })
      store.dispatch(fetchFilmsAction({ offset: localOffset, limit: localLimit, sort }))
    } else {
      setSearchParams({ 'offset': '' + 0, 'limit': '' + noSortLimit })
      store.dispatch(fetchFilmsAction({ offset: 0, limit: noSortLimit }))
    }
  }, [sort])

  return (
    <button
      onClick={onButtonClickHandler}
      className='films-list__show-more'
      disabled={offset + 5 >= total ? true : false}
    >
      {isLoading ? 'Loading...' : 'Show more'}
    </button>
  )
}

export default ShowMoreButton
