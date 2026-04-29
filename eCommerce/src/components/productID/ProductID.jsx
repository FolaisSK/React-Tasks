import React from 'react'
import { useParams } from 'react-router'
import { useGetProductByIdQuery } from '../../apis/productApi'
import styles from './productid.module.css'



function productDetail() {

    const { productId } = useParams();

    const { isLoading, data } = useGetProductByIdQuery(productId)
    console.log(data)

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ul className={styles.product}>
                {
                    <div key={data.id}>
                        <img className={data?.img} src={data?.image} alt={data?.name} />
                        <p>{data?.title}</p>
                        <p>${data?.price.toFixed(2)}</p>
                        <p>{data?.description}</p>
                    </div>
                }
            </ul>
        </div>
    )
}

export default productDetail