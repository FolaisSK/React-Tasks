import React from "react";
import {useGetAllProductsQuery} from "../apis/productApi.jsx";
import styles from "./products.module.css"

const Products = ()=>{

    const {isLoading, data, isError} = useGetAllProductsQuery();
    console.log(data)

    if(isLoading){
        return(
            <>Loading....</>
        )
    }

    if(isError){
        alert("Something went wrong")
    }

    return (
        <>
            <ul className={styles.products}>
                {
                    data.map((product)=>(
                        <div >
                            <img className={styles.img} src={product.image} alt=""/>
                            <p>{product.title}</p>
                            <p>{product.price}</p>
                            <p>{product.description}</p>
                        </div>
                    ))
                }
            </ul>
        </>
    )


}

export default Products;