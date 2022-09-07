import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartState } from '../context/Contex'
import Filters from './Filters';
import SingleProduct from './SingleProduct';
import ReactPaginate from 'react-paginate';
import { faker } from '@faker-js/faker';


const Home = () => {
    const { state: { products },
        productState: { byStock,
            byFastDelivery,
            byRating,
            sort,
            searchQuery }
    } = CartState();

    const transformProducts = () => {
        let sortedProducts = products;
        if (sort) {
            sortedProducts = sortedProducts.sort((a, b) =>
                sort === "lowToHigh" ? a.price - b.price : b.price - a.price
            );
        }
        if (!byStock) {
            sortedProducts = sortedProducts.filter((prod) => prod.inStock);
        }
        if (byFastDelivery) {
            sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
        }
        if (byRating) {
            sortedProducts = sortedProducts.filter((prod) => prod.ratings === byRating);
        }
        if (searchQuery) {
            sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery));
        }
        return sortedProducts;
    }
    /*new Array(1000).fill().map((value, index) => (({
        id: index,
        title: faker.lorem.words(5),
        body: faker.lorem.sentences(8)
    })))*/
    const [pagination, setPagination] = useState({
        data: transformProducts(),
        offset: 0,
        numberPerPage: 9,
        pageCount: 0,
        currentData: []
    });
    useEffect(() => {
        

        setPagination((prevState) => ({
            ...prevState,
            data: transformProducts(),
            pageCount: prevState.data.length / prevState.numberPerPage,
            currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
        }))
    }, [pagination.numberPerPage, pagination.offset])
    const handlePageClick = event => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })
    }

    return (
        <div className="home">
            <Filters />
            <div className="productContainer">
                {/*{transformProducts().map((prod) => {
                    return <SingleProduct prod={prod} />
                })}*/}
                {pagination.currentData && pagination.currentData.map(((item, index) => (
                    /* transformProducts().map((prod) => {
                         return <SingleProduct prod={prod} />
                     })*/

                    <SingleProduct prod={item} />
                )))
                }
                <div>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        pageCount={pagination.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>
            </div>

        </div>
    )
}

export default Home;