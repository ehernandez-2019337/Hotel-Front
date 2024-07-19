import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CategoryView } from './CategoryView';
import { useGetCategories } from '../../shared/hooks/categories/useGetCategories';
import { PacmanLoader } from 'react-spinners'


export const CategoryContent = () => {
    const { categories, getCategories, isFetching: isFetchingCategories } = useGetCategories()
  
    useEffect(() =>{
      getCategories()
    }, [])
  
    if(isFetchingCategories ){
      return (
        <div className="container d-flex align-items-center justify-content-center vh-100">
            <PacmanLoader color="#ffe733"/>
          </div>
      )
    }
    return (
      <div>
        <Routes>
          <Route path="categoryView" element = {<CategoryView categories={categories} getCategories={getCategories}/>} />
        </Routes>
      </div>
    )
};