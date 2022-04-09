import React from 'react'
import { Link } from 'react-router-dom';
import '../../src/styles/css/Categories.css';

export default function Categories() {
  return (
    <div className='CategoriesWrapper'>
        <div className='Categories'>
            <Link to="/categories/rock" className='Categories__rock'>ROCK</Link>
            <Link to="/categories/pop" className='Categories__pop'>POP</Link>
            <Link to="/categories/blues" className='Categories__blues'>BLUES</Link>
            <Link to="/categories/jazz" className='Categories__jazz'>JAZZ</Link>
            <Link to="/categories/hip+hop" className='Categories__rap'>HIP HOP</Link>
            <Link to="/categories/reggae" className='Categories__reggae'>REGGAE</Link>
            <Link to="/categories/electronic" className='Categories__techno'>ELECTRONIC</Link>
            <Link to="/categories/country" className='Categories__country'>COUNTRY</Link>
            <Link to="/categories/classical" className='Categories__classical'>CLASSICAL</Link>
            <Link to="/categories/funk" className='Categories__funk'>FUNK</Link>
            <Link to="/categories/latin" className='Categories__latin'>LATIN</Link>
            <Link to="/categories/folk" className='Categories__folk'>FOLK</Link>
        </div>
    </div>
  )
}
