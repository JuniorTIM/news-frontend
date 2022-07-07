import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from '../../../features/categoriesReducer';
import { Link } from "react-router-dom";
import './styles.css'

const Sidebar = () => {

const categories = useSelector(state => state.categories.categories)
const loading = useSelector(state => state.categories.loading)
const dispatch = useDispatch()

useEffect(()=>{
    dispatch(getCategories())
}, [dispatch])

    return (
        <div className='sidebar'>
            {loading && <div class="load"><hr/><hr/><hr/><hr/></div>}
            <hr />
            <div className='cat'>
            <div className='categories-block'>
                {categories && categories.map((element, index) => {
                    return (
                        <>
                        <div key={element._id} className='categories'>
                        <Link className="category" to={`/category/${element._id}`}>{element.name}</Link>
                        </div>
                        </>
                    )
                })} 
            </div>
            </div>
            <hr />
        </div>
    );
};

export default Sidebar;