import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

export default function CheckoutItem({item, modifyCount, removeItemSelected, setRemoveItemSelected, cartRemove}) {
    const [activeValue, setActiveValue] = useState(item.count);


    useEffect(()=>{
        setActiveValue(item.count);
    }, [item.count])

    return (
            <motion.li layout initial={{ opacity: 0, x: "-120%" }} animate={{ opacity: 1, x: "0%" }} exit={{ opacity: 0, x: "120%" }} transition={{ type: 'tween', duration: .4, ease: "easeInOut" }} className='Checkout__details__list__li'>
                <motion.span layout><Link to={`/item/${item?.id}`}><motion.img alt="item" src={item?.images?.[0]?.uri}></motion.img></Link><motion.span className='Checkout__details__list__li__title'>{item?.title}</motion.span></motion.span>
                <motion.span>{item?.artists_sort}</motion.span>
                <motion.span>${item?.price}</motion.span>
                <motion.span className='Checkout__details__list__li__input'><input type="number" min={0} value={activeValue} onChange={(e) => setActiveValue(e.currentTarget.value)} onBlur={e => {
                    e.currentTarget.value = e.currentTarget.value < 0 ? 0 : Math.round(e.currentTarget.value);
                    if (Number(e.currentTarget.value) > Number(item.stock)) {
                        e.currentTarget.value = item.stock;
                        modifyCount({ ...item, count: Number(e.currentTarget.value) });
                    } else {
                        modifyCount({ ...item, count: Number(e.currentTarget.value) });
                    }
                }} onKeyDown={(e) => e.key !== "Enter" ? (e.key !== 'Escape' ? null : e.currentTarget.blur()) : e.currentTarget.blur()} /> <motion.span className='Checkout__details__list__li__stock'>Stock:&nbsp;{item.stock}</motion.span></motion.span>
                <motion.span>${item?.price * item?.count}</motion.span>
                {
                    removeItemSelected === item?.id ? <motion.div className='Checkout__details__list__removeConfirm'>
                        <motion.p>ELIMINAR?</motion.p>
                        <motion.div className="Checkout__details__list__removeConfirm__buttons">
                            <button onClick={() => { setRemoveItemSelected(0); cartRemove(item?.id) }}>SI</button>
                            <button onClick={() => setRemoveItemSelected(0)}>NO</button>
                        </motion.div>
                    </motion.div> : <button className='Checkout__details__list__remove' aria-label='Eliminar product' title='Eliminar producto' onClick={() => setRemoveItemSelected(item?.id)}><i className="bi bi-trash-fill"></i></button>
                }
            </motion.li>
    )
}
