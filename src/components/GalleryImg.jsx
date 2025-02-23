import React from 'react';

const GalleryImg = () => {
    return (
        <section className=' mt-20 pb-10 bg-gradient-to-t from-[#aff2ff] via-teal-50 to-white'>
            <div className="p-10 max-w-[1200px] mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 mt-20 mb-20">
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/drenaje.jpg"
                        alt="gallery-photo" />
                </div>
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/Entrenamiento.jpg"
                        alt="gallery-photo" />
                </div>
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/lifting.jpg"
                        alt="gallery-photo" />
                </div>
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/lifting2.jpeg"
                        alt="gallery-photo" />
                </div>
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/limpieza-facial-.jpg"
                        alt="gallery-photo" />
                </div>
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/masaje-reductivo.jpg"
                        alt="gallery-photo" />
                </div>
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/presoterapia.jpg" 
                        alt="gallery-photo" />
                </div>
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/radiofrecuencia.jpeg" 
                        alt="gallery-photo" />
                </div>
                <div>
                    <img className="object-cover object-center w-full h-40 max-w-full rounded-lg"
                        src="/img/masaje1hora.jpg"
                        alt="gallery-photo" />
                </div>
            </div>
        </section>
    );
};

export default GalleryImg;