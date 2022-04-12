import React from 'react'
import { Link } from 'react-router-dom';
import '../../src/styles/css/Categories.css';

export default function Categories() {
  return (
    <div className='CategoriesWrapper'>
        <div className='Categories'>
            <Link to="/music-store/categories/rock" onClick={()=>window.scrollTo(0,0)} className='Categories__rock'>ROCK</Link>
            <Link to="/music-store/categories/pop" onClick={()=>window.scrollTo(0,0)} className='Categories__pop'>POP</Link>
            <Link to="/music-store/categories/blues" onClick={()=>window.scrollTo(0,0)} className='Categories__blues'>BLUES</Link>
            <Link to="/music-store/categories/jazz" onClick={()=>window.scrollTo(0,0)} className='Categories__jazz'>JAZZ</Link>
            <Link to="/music-store/categories/hip+hop" onClick={()=>window.scrollTo(0,0)} className='Categories__rap'>HIP HOP</Link>
            <Link to="/music-store/categories/reggae" onClick={()=>window.scrollTo(0,0)} className='Categories__reggae'>REGGAE</Link>
            <Link to="/music-store/categories/electronic" onClick={()=>window.scrollTo(0,0)} className='Categories__techno'>ELECTRONIC</Link>
            <Link to="/music-store/categories/country" onClick={()=>window.scrollTo(0,0)} className='Categories__country'>COUNTRY</Link>
            <Link to="/music-store/categories/classical" onClick={()=>window.scrollTo(0,0)} className='Categories__classical'>CLASSICAL</Link>
            <Link to="/music-store/categories/funk" onClick={()=>window.scrollTo(0,0)} className='Categories__funk'>FUNK</Link>
            <Link to="/music-store/categories/latin" onClick={()=>window.scrollTo(0,0)} className='Categories__latin'>LATIN</Link>
            <Link to="/music-store/categories/folk" onClick={()=>window.scrollTo(0,0)} className='Categories__folk'>FOLK</Link>
        </div>
    </div>
  )
}
