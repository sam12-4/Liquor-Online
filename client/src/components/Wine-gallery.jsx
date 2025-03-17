// "use client"

// import { useRef, useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import { Link } from "react-router-dom"
// import gsap from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"

// gsap.registerPlugin(ScrollTrigger)

// const WineGallery = () => {
//   const galleryRef = useRef(null)
//   const imagesRef = useRef([])
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

//   const wines = [
//     {
//       id: 1,
//       name: "Cabernet Sauvignon",
//       image: "https://images.unsplash.com/photo-1586370434639-0fe43b4daa6d",
//       description: "Bold and full-bodied with rich dark fruit flavors",
//       price: 49.99,
//       link: "/products/cabernet-sauvignon",
//     },
//     {
//       id: 2,
//       name: "Chardonnay",
//       image: "https://images.unsplash.com/photo-1596097635166-c9540e39ad32",
//       description: "Elegant white wine with notes of apple and vanilla",
//       price: 39.99,
//       link: "/products/chardonnay",
//     },
//     {
//       id: 3,
//       name: "Pinot Noir",
//       image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809",
//       description: "Light-bodied red with cherry and earthy notes",
//       price: 45.99,
//       link: "/products/pinot-noir",
//     },
//     {
//       id: 4,
//       name: "Sauvignon Blanc",
//       image: "https://images.unsplash.com/photo-1600320515808-2ebc04ad2509",
//       description: "Crisp and refreshing with citrus and herbal notes",
//       price: 34.99,
//       link: "/products/sauvignon-blanc",
//     },
//     {
//       id: 5,
//       name: "Merlot",
//       image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d",
//       description: "Smooth and medium-bodied with plum and chocolate notes",
//       price: 42.99,
//       link: "/products/merlot",
//     },
//   ]

//   // Handle window resize for mobile detection
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     window.addEventListener('resize', handleResize)
//     return () => {
//       window.removeEventListener('resize', handleResize)
//     }
//   }, [])

//   useEffect(() => {
//     if (isMobile) return; // Don't apply horizontal scroll on mobile

//     const gallery = galleryRef.current;
//     if (!gallery) return;

//     // Clear any existing ScrollTrigger instances to prevent duplicates
//     ScrollTrigger.getAll().forEach(st => {
//       if (st.vars.trigger === gallery) {
//         st.kill();
//       }
//     });

//     // Horizontal scroll effect
//     let scrollTween = gsap.to(gallery, {
//       scrollTrigger: {
//         trigger: gallery,
//         start: "top center",
//         end: "bottom center",
//         scrub: 1,
//       },
//       x: () => -(gallery.scrollWidth - window.innerWidth + 100),
//       ease: "none",
//     });

//     // Parallax effect for images
//     imagesRef.current.forEach((image, index) => {
//       if (!image) return;

//       gsap.fromTo(
//         image,
//         {
//           y: index % 2 === 0 ? 50 : -50,
//           opacity: 0.5,
//         },
//         {
//           y: index % 2 === 0 ? -50 : 50,
//           opacity: 1,
//           scrollTrigger: {
//             trigger: image,
//             containerAnimation: scrollTween,
//             start: "left right",
//             end: "right left",
//             scrub: true,
//           },
//         },
//       );
//     });

//     return () => {
//       if (scrollTween) {
//         scrollTween.kill();
//       }
//       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
//     };
//   }, [isMobile]);

//   return (
//     <div className="relative overflow-hidden py-16">
//       <div className="text-center mb-10">
//         <h2 className="section-header text-3xl font-bold text-gray-800 mb-4">WINE COLLECTION</h2>
//         <p className="section-description text-gray-600 max-w-2xl mx-auto">
//           Explore our handpicked selection of exceptional wines from around the world.
//         </p>
//       </div>

//       {!isMobile ? (
//         // Desktop horizontal scroll gallery
//         <div className="relative h-[500px] overflow-hidden">
//           <div ref={galleryRef} className="absolute flex space-x-8 p-8" style={{ width: "max-content" }}>
//             {wines.map((wine, index) => (
//               <motion.div
//                 key={wine.id}
//                 ref={(el) => (imagesRef.current[index] = el)}
//                 className="relative w-[300px] h-[450px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="h-[250px] overflow-hidden">
//                   <img
//                     src={`${wine.image}?auto=format&fit=crop&w=600&q=80`}
//                     alt={wine.name}
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                   />
//                 </div>
//                 <div className="p-6 flex flex-col flex-grow">
//                   <h3 className="text-xl font-bold text-gray-800 mb-2">{wine.name}</h3>
//                   <p className="text-gray-600 mb-4 flex-grow">{wine.description}</p>
//                   <div className="flex items-center justify-between">
//                     <span className="text-[#aa4c40] font-bold text-xl">${wine.price}</span>
//                     <Link
//                       to={wine.link}
//                       className="px-4 py-2 bg-[#aa4c40] text-white rounded hover:bg-[#8a3d33] transition-colors duration-300"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         // Mobile grid layout
//         <div className="grid grid-cols-1 gap-6 px-4">
//           {wines.map((wine, index) => (
//             <motion.div
//               key={wine.id}
//               className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div className="h-[200px] overflow-hidden">
//                 <img
//                   src={`${wine.image}?auto=format&fit=crop&w=600&q=80`}
//                   alt={wine.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-4 flex flex-col flex-grow">
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">{wine.name}</h3>
//                 <p className="text-gray-600 mb-4 flex-grow">{wine.description}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-[#aa4c40] font-bold text-xl">${wine.price}</span>
//                   <Link
//                     to={wine.link}
//                     className="px-4 py-2 bg-[#aa4c40] text-white rounded hover:bg-[#8a3d33] transition-colors duration-300"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       )}

//       {!isMobile && (
//         <>
//           <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f9f9f7] to-transparent z-10"></div>
//           <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f9f9f7] to-transparent z-10"></div>
//         </>
//       )}

//       <div className="text-center mt-8">
//         <Link
//           to="/products?category=wine"
//           className="inline-block px-8 py-3 border-2 border-[#aa4c40] text-[#aa4c40] font-medium transition-all duration-300 hover:bg-[#aa4c40] hover:text-white"
//         >
//           View All Wines
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default WineGallery



"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const WineGallery = () => {
  const galleryRef = useRef(null)
  const imagesRef = useRef([])

  const wines = [
    {
      id: 1,
      name: "Cabernet Sauvignon",
      image: "https://images.unsplash.com/photo-1586370434639-0fe43b4daa6d",
      description: "Bold and full-bodied with rich dark fruit flavors",
      price: 49.99,
      link: "/products/cabernet-sauvignon",
    },
    {
      id: 2,
      name: "Chardonnay",
      image: "https://images.unsplash.com/photo-1596097635166-c9540e39ad32",
      description: "Elegant white wine with notes of apple and vanilla",
      price: 39.99,
      link: "/products/chardonnay",
    },
    {
      id: 3,
      name: "Pinot Noir",
      image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809",
      description: "Light-bodied red with cherry and earthy notes",
      price: 45.99,
      link: "/products/pinot-noir",
    },
    {
      id: 4,
      name: "Sauvignon Blanc",
      image: "https://images.unsplash.com/photo-1600320515808-2ebc04ad2509",
      description: "Crisp and refreshing with citrus and herbal notes",
      price: 34.99,
      link: "/products/sauvignon-blanc",
    },
    {
      id: 5,
      name: "Merlot",
      image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d",
      description: "Smooth and medium-bodied with plum and chocolate notes",
      price: 42.99,
      link: "/products/merlot",
    },
  ]

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    // Create a horizontal scroll effect
    const scrollTween = gsap.to(gallery, {
      x: () => -(gallery.scrollWidth - window.innerWidth + 100),
      ease: "none",
      scrollTrigger: {
        trigger: gallery,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })

    // Parallax effect for images
    imagesRef.current.forEach((image, index) => {
      if (image) {
        gsap.fromTo(
          image,
          {
            y: index % 2 === 0 ? 50 : -50,
            opacity: 0.5,
          },
          {
            y: index % 2 === 0 ? -50 : 50,
            opacity: 1,
            scrollTrigger: {
              trigger: image,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        )
      }
    })

    return () => {
      if (scrollTween) {
        scrollTween.kill()
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="relative overflow-hidden py-16">
      <div className="text-center mb-10">
        <h2 className="section-header text-3xl font-bold text-gray-800 mb-4">WINE COLLECTION</h2>
        <p className="section-description text-gray-600 max-w-2xl mx-auto">
          Explore our handpicked selection of exceptional wines from around the world.
        </p>
      </div>

      <div className="relative h-[500px] overflow-hidden">
        <div ref={galleryRef} className="absolute flex space-x-8 p-8" style={{ width: "max-content" }}>
          {wines.map((wine, index) => (
            <motion.div
              key={wine.id}
              ref={(el) => (imagesRef.current[index] = el)}
              className="relative w-[300px] h-[450px] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-[250px] overflow-hidden">
                <img
                  src={`${wine.image}?auto=format&fit=crop&w=600&q=80`}
                  alt={wine.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{wine.name}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{wine.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#aa4c40] font-bold text-xl">${wine.price}</span>
                  <Link
                    to={wine.link}
                    className="px-4 py-2 bg-[#aa4c40] text-white rounded hover:bg-[#8a3d33] transition-colors duration-300"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#f9f9f7] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#f9f9f7] to-transparent z-10"></div>

      <div className="text-center mt-8">
        <Link
          to="/products?category=wine"
          className="inline-block px-8 py-3 border-2 border-[#aa4c40] text-[#aa4c40] font-medium transition-all duration-300 hover:bg-[#aa4c40] hover:text-white"
        >
          View All Wines
        </Link>
      </div>
    </div>
  )
}

export default WineGallery

