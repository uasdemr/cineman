import { useEffect, useState } from "react"
import { useAppSelector } from "../../hooks"
import { store } from "../../store"
import { setSort } from "../../store/films-slice"

type SortingItemType = {
  sortName: string
  // onSortClickHandler: (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

function SortingItem({ sortName }: SortingItemType) {
  const sort = useAppSelector(state => state.DATA.sort)

  const [sortByDateType, setSortByDateType] = useState('SORT_BY_DATE_DEFAULT');
  const [sortByRatingType, setSortByRatingType] = useState('SORT_BY_RATING_DEFAULT');

  // const dateSortActive = sort.includes('Sort by date down')
  //   ? 'sort__button sort__button--active sort__button-datedown--active'
  //   : sort.includes('SORT_BY_DATE_UP')
  //   ? 'sort__button sort__button--active sort__button-dateup--active'
  //   : 'sort__button';

  // const ratingSortActive = sort.includes('Sort by rating down')
  //   ? 'sort__button sort__button--active sort__button-datedown--active'
  //   : sort.includes('SORT_BY_RATING_UP')
  //   ? 'sort__button sort__button--active sort__button-dateup--active'
  //   : 'sort__button';

  // useEffect(() => {

  // }, [sort])

  // Придумать способ изменять состояние в несколько состояний сортировки типа:
  // по дате вверх, по дате вниз, по дате без сортировки





  // Наверное стоит ввести состояние компонента, он в нем будет разруливать
  // варианты сортировки при клике по ним и диспатчить их в нужный момент

  // клик по каждой кнопке будет менять ее состояние от которого зависит класс css

  const sortByDateClickHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (evt.currentTarget.innerText === 'Sort by date') {
      evt.currentTarget.innerHTML = 'Sort by date up'
      store.dispatch(setSort('Sort by date up'))
      return
    }
    if (evt.currentTarget.innerText === 'Sort by date up') {
      evt.currentTarget.innerHTML = 'Sort by date down'
      store.dispatch(setSort('Sort by date down'))
      return
    }
    if (evt.currentTarget.innerText === 'Sort by date down') {
      evt.currentTarget.innerHTML = 'Sort by date'
      store.dispatch(setSort('Sort by date'))
      return
    }
  }

  const sortByRatingClickHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (evt.currentTarget.innerText === 'Sort by rating') {
      evt.currentTarget.innerHTML = 'Sort by rating up'
      store.dispatch(setSort('Sort by rating up'))
      return
    }
    if (evt.currentTarget.innerText === 'Sort by rating up') {
      evt.currentTarget.innerHTML = 'Sort by rating down'
      store.dispatch(setSort('Sort by rating down'))
      return
    }
    if (evt.currentTarget.innerText === 'Sort by rating down') {
      evt.currentTarget.innerHTML = 'Sort by rating'
      store.dispatch(setSort('Sort by rating'))
      return
    }
  }

  const onSortClickHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    evt.preventDefault()
    if(evt.currentTarget.innerText.indexOf('rating')) {
      console.log('Это рейтинг');

      sortByRatingClickHandler(evt)
    }
    if(evt.currentTarget.innerText.indexOf('date')) {
      console.log('Это дата');
      sortByDateClickHandler(evt)

    }
  }

  const classMaker = (sortName: string) => {
    if (sortName === 'Sort by date') {
      const dateSortActive = sort.includes('Sort by date down')
        ? 'sort__button sort__button--active sort__button-datedown--active'
        : sort.includes('Sort by date up')
          ? 'sort__button sort__button--active sort__button-dateup--active'
          : 'sort__button';
      return dateSortActive
    }

    if (sortName === 'Sort by rating') {
      const ratingSortActive = sort.includes('Sort by rating down')
        ? 'sort__button sort__button--active sort__button-datedown--active'
        : sort.includes('Sort by rating up')
          ? 'sort__button sort__button--active sort__button-dateup--active'
          : 'sort__button';
          return ratingSortActive
    }
  }

  return (
    <li key={sortName}>
      <a
        href="/#"
        onClick={(evt) => {
          onSortClickHandler(evt)
        }}
        // className={`sort__button ${sortName === sort ? 'sort__button--active' : ''}`}>
        className={classMaker(sortName)}>
        {sortName}
      </a>
    </li>
  )
}

export default SortingItem
