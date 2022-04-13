import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../../src/styles/css/Error404.css';

export default function Error404() {
  useEffect(()=>{
    window.scrollTo(0, 0)
  }, []);
  
  return (
    <div className="Error404Wrapper">
        <div className='Error404'>
            <h2>Error 404</h2>
            <p>El contenido al que intenta acceder no existe o no está disponible en este momento.</p>
            <Link to="/">Ir al inicio?</Link>
        </div>
    </div>
  )
}
