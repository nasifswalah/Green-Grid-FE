import React from 'react'
import './Carousal.css'
import SlideIMG1 from '@assets/pexels-pixabay-46798.jpg'
import slideIMG2 from '@assets/Cricket.jpg'
import slideIMG3 from '@assets/i1080x475.jpg'

function Carousal() {
    return (
        <div id="carouselExampleCaptions" className="carousel slide carousal-container">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={SlideIMG1} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Pitch Perfect Moments</h5>
                        <p>Find exhilaration in every kick, and camaraderie in every pass, just like on the field</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={slideIMG2} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Stumps and Stories</h5>
                        <p>Among the stumps, whispers of cricketing sagas enchant the air</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={slideIMG3} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Rim Rendezvous</h5>
                        <p>Between the court and the rim lies the journey of every basketball dream</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousal