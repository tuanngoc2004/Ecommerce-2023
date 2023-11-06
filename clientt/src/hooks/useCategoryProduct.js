import { useState, useEffect } from 'react';
import axios from 'axios';

export const useCategoryProduct = (categorySlug) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (categorySlug) {
        getProductsByCategory(categorySlug);
        }
    }, [categorySlug]);

    const getProductsByCategory = async (slug) => {
        try {
        setLoading(true);
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/product/product-category/${slug}?${Date.now()}`
        );
        setProducts(data.products);
        setCategory(data.category);
        setLoading(false);
        } catch (error) {
        console.log(error);
        setLoading(false);
        }
    };

    return { products, category, loading, getProductsByCategory };
};
