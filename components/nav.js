import { useRouter } from 'next/router';
import Link from 'next/link'
import Logo from '../Images/logo.png';
import Image from 'next/image';

/*
   los iconos los obtuve de la url:
   https://heroicons.dev/ 
*/

const Dashboard = ({children}) => {
   const router = useRouter()

   const renderList = () => {
      var menu =  [
         {nombre:'Usuarios',     pathname:'/gitSearch/usuarios',  icon:<svg className={router.pathname.includes('/gitSearch/usuarios')?" w-6 h-6 text-blue-500 md:ml-10 sm:ml-3 " :"w-6 h-6 text-gray-400 md:ml-10 sm:ml-3 "} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path></svg> },           
         {nombre:'Repositorios', pathname:'/gitSearch/repos',        icon:<svg className={router.pathname.includes('/gitSearch/repos')?" w-6 h-6 text-blue-500 md:ml-10 sm:ml-3 " :"w-6 h-6 text-gray-400 md:ml-10 sm:ml-3 "} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg> },                    
                  ]
      
      return menu.map((item,index) =>{
        return(
         <li key={item.nombre} className={router.pathname.includes(item.pathname) ?'justify-between flex bg-blue-100 ' :'justify-between flex hover:cursor-pointer hover:bg-gray-300 '} >
            <Link href={item.pathname}  className={router.pathname.includes(item.pathname)  ?'flex p-2  ' :'flex p-2  w-full '}>
               <a className='flex flex-row p-2 w-full' >
                  {item.icon}
                  <span className={router.pathname.includes(item.pathname) ?'ml-3 text-blue-500' :"ml-3 text-gray-500"}>{item.nombre}</span>
               </a>
            </Link>
            <div className={router.pathname.includes(item.pathname)  ?'bg-blue-400 w-1' :'hidden'} />
         </li>
        )
      })
    }

   return(
         <div  className={'flex h-screen'} style={{backgroundColor:'#231F20'}}>
            <aside className={'w-80 '} style={{backgroundColor:'#F1F2F2'}} >
               <div className='h-screen justify-center flex-row ' >
                  <a className={'w-full justify-center text-center flex md:px-14 md:py-10 sm:px-16 sm:py-4 px-16 py-4  '} href={"/gitSearch/usuarios"} >
                     <div >
                        <Image src={Logo} />
                     </div>
                  </a>
                  <ul className={'space-y-2 flex-row justify-center text-center w-full'}>
                     {renderList()}
                  </ul>
               </div>
            </aside>
            {children}
         </div>
   )
}
export default Dashboard