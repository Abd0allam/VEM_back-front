import React, { Fragment, useEffect, useState } from 'react'
import "./CSS/Cards.css";
export default function Cards() {
  const accessToken = localStorage.getItem("access");
  const [items, setItems] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    console.log("Hello");
    fetch('http://127.0.0.1:8000/shop/shops/', {
      // headers: {
      //   Authorization: `Bearer ${accessToken}`,
      // }
    })
      .then(res => res.json())
      .then(data => {
        setIsLoading(true)
        setItems(data)
        setIsLoading(false)
      }).catch(err=>{
        err ? setIsLoading(true) : setIsLoading(false)
      })
  }, [])

  return (
    <div className="section_our_solution">
      <div className="row">
        {/* <div className="col-lg-12 col-md-12 col-sm-12"> */}
          <div className="our_solution_category">
            
      {isLoading &&  (<p className='text-center'>Loading...</p>)}
      {!isLoading && (<Fragment>
        <div className="solution_cards_box">
          {items !== null && items.map(item => (
            <div className="solution_card" key={item.id}>
              <div className="hover_color_bubble"></div>
              <div className="so_top_icon" style={{
                overflow: 'hidden'
              }}>
                <img src={item.image || ''} alt="" />
              </div>
              <div className="solu_title">
                <h3>{item.title}</h3>
              </div>
              <div className="solu_description">
                <p>
                  {item.details}
                </p>
                {/* <button type="button" className="read_more_btn">Read More</button> */}
              </div>
            </div>
          ))}
        </div>

      </Fragment>)}
          </div>
        {/* </div> */}
      </div>
    </div>
  )
}