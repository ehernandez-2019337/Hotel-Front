import { useEffect } from 'react'
import { PacmanLoader } from 'react-spinners'
import { Route, Routes } from 'react-router-dom'
import { HotelView } from './HotelView'
import { useGetHotels } from '../../shared/hooks/hotels/useGetHotels'
import { useGetCategories } from '../../shared/hooks/categories/useGetCategories'

export const HotelContent = () => {
  const { hotels, getHotels, isFetching: isFetchingHotels } = useGetHotels()
  const { categories, getCategories, isFetching: isFetchingCategories } = useGetCategories()

  useEffect(() => {
    getHotels(),
      getCategories()
  }, [])
  if (isFetchingHotels || isFetchingCategories) {
    return (
      <div className="container d-flex align-items-center justify-content-center vh-100">
        <PacmanLoader color="#ffe733" />
      </div>
    )
  }
  return (
    <div>
      <Routes>
        <Route path="hotelView" element={<HotelView hotels={hotels} categories={categories} getHotels={getHotels} />} />
      </Routes>
    </div>
  )
}

