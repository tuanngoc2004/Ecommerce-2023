import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProductDetails = (slug) => {
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (slug) {
        getProductDetails(slug);
        }
    }, [slug]);

    const getProductDetails = async (slug) => {
        try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/product/get-product/${slug}?${Date.now()}`
        );
        setProduct(data?.product);

        if (data?.product?.category_id) {
            try {
                const categoryId = data.product.category_id;
                const categoryResponse = await axios.get(
                    `${process.env.REACT_APP_API}/api/category/singlee-category/${categoryId}?${Date.now()}`
                );
                if (categoryResponse.status === 200) {
                    setCategory(categoryResponse.data?.category);
                    getRelatedProducts(data.product.id, categoryId);
                } else {
                    setCategory({ name: 'Category Not Found' });
                }
            } catch (error) {
                console.error(error);
                setCategory({ name: 'Category Error' });
            }
        } else {
            setCategory({ name: 'Category Not Provided' });
        }
        } catch (error) {
        console.error(error);
        }
    };

    // Function to get related products
    const getRelatedProducts = async (productId, categoryId) => {
        try {
        const { data } = await axios.get(
            `${process.env.REACT_APP_API}/api/product/related-product/${productId}/${categoryId}?${Date.now()}`
        );
        setRelatedProducts(data?.products);
        } catch (error) {
        console.error(error);
        }
    };

    return { product, category, relatedProducts };
};
