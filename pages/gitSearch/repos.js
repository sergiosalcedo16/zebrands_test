import React, { useState } from 'react';
import {Toast, } from 'react-bootstrap';
import SearchBar from '../../components/searchBar'
import axios from 'axios'

export default function Repositorios() {

  const [repoName, setRepoName] = useState('');
  const [reposInfo, setReposInfo] = useState([]);
  const [reposLength, setreposLength] = useState(0);
  const [showSweet, setShowSweet] = useState(false)
  const [funcionToast, setFuncionToast] = useState([]);

  const tableBody = () => {
    if(reposInfo.length > 0) 
    return reposInfo.map((item,index) =>{
      return(
        <tr key={item.id} className='w-full flex justify-between py-5 border-b border-gray-400 text-left ' >
          <th className='w-2/12 font-normal truncate' >#{item.id}</th>
          <th className='w-3/12 font-normal truncate' >{item.name}</th>
          <th className='w-2/12 font-normal truncate' >{item.owner.login}</th>          
          <th className='w-4/12 font-normal truncate' >{item.description}</th>
          <th className='w-1/12 text-blue-400 cursor-pointer' style={{color:'#FF595A'}} onClick={()=>window.open(item.html_url)} ><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></th>
        </tr>
      )
    })
    else return (<tr className='w-full flex justify-between py-5 border-b border-gray-400 text-left ' > <th className='w-12/12 font-normal truncate'>No hay repositorios publicos</th> </tr>)
  }

  const getRepoInfo = () =>{

    if(repoName.trim() !== ''){
      axios.get('https://api.github.com/search/repositories?q={'+repoName+'}').then((response) => {
      let data = response.data;
        console.log(data)
        setReposInfo(data.items)
        setreposLength(data.total_count)
      }).catch((error) => {
          setRepoName([])
          setReposInfo([])
          setreposLength(0)
          showAlert('error','Error','Usuario no encontrado')
      });
    }
    else {
      showAlert('error','Error','Porfavor llena el campo de búsqueda')
    }
  }

  const showAlert = (tipo, title,descripcion) => {
    setShowSweet(true)
    var items = funcionToast
    items.push({
        notifType: tipo,
        notiTitle:title,
        notifDesc:descripcion,
    })
    setFuncionToast(items)
    setTimeout(function () {
        var newArray = funcionToast;
        newArray.shift()
        setFuncionToast(newArray)
        setShowSweet(false)
    }, 4000);
  }

  const renderToast = () =>{
    var items = []
    funcionToast.forEach((item, i) => {
    switch (item.notifType) {
        case 'error':
            items.push(
                <Toast className="" style={{ minWidth: 250, backgroundColor: '#f8d7da',color: '#8b0000', float: 'right', position:'absolute', zIndex:10000 }} >
                    <Toast.Header className="" style={{ backgroundColor: 'rgba(255,255,255,.50)' }} closeButton={false}>
                        <strong className="mr-auto">{item.notiTitle}</strong>
                    </Toast.Header>
                    <Toast.Body className=""><p style={{ marginBottom: 5, marginTop:-8, color: '#8b0000' }}></p>
                        {item.notifDesc}
                    </Toast.Body>
                </Toast>
            )
        break;
        default:
        }
    });
    return items
  }
  
  return (
    <>
      {
        (funcionToast.length > 0) &&
        <div
          style={{
            position: 'fixed',
            top: 5,
            right: 250,
            zIndex: 50000
          }}
        >
          {renderToast()}
        </div>
      }
      <div  className={'w-full h-full flex flex-col'}>
        {/* Parte Superior*/}
        <div className='px-10 py-16' >
          <p className={'text-3xl'} style={{color:'#F1F2F2'}} >Repositorios Github</p>
          <div className={'my-5'} >
            <SearchBar myPlaceholder={'Search a Repo'} value={(valor)=> setRepoName(valor)} sendValue={()=>getRepoInfo()} />
          </div>
          {
            reposLength > 0 && 
            <div className='w-full flex justify-between ' >
                <div className='w-full flex items-center' >
                  <div className='mx-3 w-auto' >
                    <p className={'text-md text-gray-400'} >Repositorios encontrados: {reposLength}</p>
                  </div>
                </div>
            </div>
          }
        </div>
        
        {/* Inicia sección Tabla */}
        {
          reposLength > 0 && 

          <div className={'w-full h-full flex-1 flex flex-col bg-white px-10 py-8 overflow-hidden'} >
            <table className={'mt-5 max-h-full w-full max-w-full flex flex-1 flex-col overflow-y-scroll px-6 rounded-md'} style={{backgroundColor:'#FCFCFC', border:'1px solid #E2E2E2'}}>
              <thead className={'w-full flex sticky top-0 '} style={{backgroundColor:'#FCFCFC'}}>
                <tr className='w-full flex justify-between py-5 border-b border-blue-400 text-blue-400 text-sm text-left ' style={{color:'#FF595A', borderBottomColor:'#FF595A'}} >
                  <th className='w-2/12' >Id</th>
                  <th className='w-3/12' >Nombre</th>
                  <th className='w-2/12'>Propietario</th>
                  <th className='w-4/12' >Descripción</th>
                  <th className='w-1/12' ></th>
                </tr>
              </thead>
              <tbody className={''} >
                {tableBody()}
              </tbody>
            </table>
          </div>
        }
        
        
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  return {
    props: { message: `Next.js is awesome` }, // will be passed to the page component as props
  }
}