import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import "../scss/app.scss";
import CarBlock from "../components/CarBlock";
import Skeleton from "../components/CarBlock/Skeleton";
import Pagination from "../components/Pagination";


const Home = ({ searchValue }) => {
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage , setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sortType.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue > 0 ? `&search=${searchValue}` : "";
    fetch(
      `https://63492c050b382d796c7f6bf1.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType,searchValue,currentPage]);

  const carsItems = cars.filter(obj => {
    if(obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
return true;
    }
    return false;
  }).map((obj) => <CarBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(9)].map((_, index) => <Skeleton key={index} />)
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          valueCategory={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort valueSort={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все автомобили</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : carsItems}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
  );
};

export default Home;
