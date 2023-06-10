import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  AiFillGithub, AiFillLinkedin, AiFillMail
} from "react-icons/ai"
import {FaBlog} from "react-icons/fa"
import './styles.css'

const img = "https://cdn.pixabay.com/photo/2018/04/19/08/22/background-3332557_1280.jpg"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <section className='h-screen' style={{position: 'relative'}}>
      <img src={img} alt="Image"  style={{ filter: 'blur(8px)' }} className='w-full h-full object-cover'/>
      <div className='flex items-center w-full h-full column' style={{ position: 'absolute', top: 0 }}>
        <h1 className='bg-gradient-to-b from-gray-200  to-orange-200 text-transparent bg-clip-text p-10 text-center text-6xl w-full' style={{fontFamily: "BrittnaySignature"}}>Kaiser Sakhi</h1>
      </div>


      <div className='flex items-center justify-center w-full h-full column' style={{ position: 'absolute', top: 0 }}>
         <ul className='flex justify-between mt-20 pt-20 text-sm gap-6'>
            <li>
              <a href="https://github.com/kaisersakhi">
                <AiFillGithub className='text-white text-3xl hover:text-orange-300' />
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kaisersakhi/">
                <AiFillLinkedin className='text-white text-3xl  hover:text-orange-300' />
              </a>
            </li>

            <li>
              <a href="https://blog.kaisersakhi.com">
                <FaBlog className='text-white text-3xl hover:text-orange-300' />
              </a>
            </li>


            <li>
              <a href="mailto:mail@kaisersakhi.com">
                <AiFillMail className='text-white text-3xl hover:text-orange-300' />
              </a>
            </li>

         </ul>
      </div>
    </section>
  </React.StrictMode>,
)
