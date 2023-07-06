import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './CSS/CarouselComp.css'
import {
  Fragment,
  // useEffect, useState
} from 'react';
export default function CarouselComp({data}) {
  // useEffect(() => {
  //   fetch('localhost:8000/admin/mall/shoprate')
  //   .then(res=>res.json())
  //   .then(data=> console.log(data))
  // }, [])
  // const [isLoading , setIsLoading] = useState(false)
  
  return (
    <Fragment>
      {data && (
              <Carousel className='carousel'>
              {data.map(item=> (
              <Carousel.Item className='overflow-hidden' style={{height: '600px'}} key={item.id}>
                <img
                  className="d-block w-100 h-100 object-fit-fill"
                  src={`http://localhost:8000/${item.image}`}
                  alt={item.title}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.details}</p>
                </Carousel.Caption>
              </Carousel.Item>
              ))}
            </Carousel>
      )}
    </Fragment>
  );
}