/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from 'react-router-dom';
import '../styles/css/Item.css';
import { motion, AnimatePresence } from 'framer-motion'

export default function Item({ id, title, img, price }) {


    return (
        <>
            <AnimatePresence>
                <motion.div layout key={`/item/${id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: .4 }}>
                    <Link to={`/item/${id}`} className="ItemLink">
                        <div className="Item" >
                            <div className="Item__imgWrapper"><img className="Item__img" src={img} alt={"cover_image_" + id} loading="lazy"></img></div>
                            <div className="Item__content">
                                <p className="Item__content__price">${price}</p>
                                <h3 className="Item__content__title">{title}</h3>
                            </div>
                            <div className="Item__details">Detalles</div>
                        </div>
                    </Link>
                </motion.div>
            </AnimatePresence>
        </>
    )
}