import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
    '/alan-hardman-SU1LFoeEUkk-unsplash.jpg',
    '/carly-jayne-Lv174o7fn7Y-unsplash.jpg',
    '/chad-montano-MqT0asuoIcU-unsplash.jpg',
    '/christine-isakzhanova-0IgN3TbE4rM-unsplash.jpg',
    '/dan-gold-4_jhDO54BYg-unsplash.jpg',
    '/denis-hsTwPUzFegQ-unsplash.jpg',
    '/duong-ngan-l_T_qXBauO8-unsplash.jpg',
    '/esra-afsar-U0vVOE5HZ40-unsplash.jpg',
    '/hermes-rivera-Ww8eQWjMJWk-unsplash.jpg',
    '/irina-del-uJQYVRza0VY-unsplash.jpg',
    '/ivan-torres-MQUqbmszGGM-unsplash.jpg',
    '/ive-erhard-LxC1Qx1qulc-unsplash.jpg',
    '/jugoslocos-QD4yCjlD44A-unsplash.jpg',
    '/kelly-visel-zXn-amUiMJ4-unsplash.jpg',
    '/monika-grabkowska-AsrrZNN1kqg-unsplash.jpg',
    '/nielsen-ramon-ly_gX1NARIc-unsplash.jpg',
    '/nik-owens-40OJLYVWeeM-unsplash.jpg',
    '/omer-taha-cetin-19FH4oEKTbw-unsplash.jpg',
    '/pablo-pacheco-D3Mag4BKqns-unsplash.jpg',
    '/samantha-gilmore-yC3WlNDxxSk-unsplash.jpg',
    '/sebastian-coman-photography-rwBJaJdesGg-unsplash.jpg',
    '/tara-evans-lnz6eLsQrMM-unsplash.jpg',
]

const CarouselComponent = () => {
    return (
        <Carousel autoPlay infiniteLoop showStatus={false} emulateTouch showThumbs={false} axis={'horizontal'}>
            {images.map((image,i)=>{
                return(
                    <div key={i} className=' object-center brightness-75 max-h-[30rem]'>
                        <img src={image} alt='pizza' />
                    </div>
                )
            })}
            
        </Carousel>
    );
};

export default CarouselComponent;