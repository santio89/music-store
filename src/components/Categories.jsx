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
            <Link to="/categories/rap" className='Categories__rap'>RAP</Link>
            <Link to="/categories/metal" className='Categories__metal'>METAL</Link>
            <Link to="/categories/reggae" className='Categories__reggae'>REGGAE</Link>
            <Link to="/categories/punk" className='Categories__punk'>PUNK</Link>
            <Link to="/categories/techno" className='Categories__techno'>TECHNO</Link>
            <Link to="/categories/country" className='Categories__country'>COUNTRY</Link>
            <Link to="/categories/classical" className='Categories__classical'>CLASSICAL</Link>
            <Link to="/categories/funk" className='Categories__funk'>FUNK</Link>
        </div>
    </div>
  )
}
