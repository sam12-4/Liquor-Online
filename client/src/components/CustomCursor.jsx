// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';

// const CustomCursor = () => {
//   const cursorRef = useRef(null);
//   const followerRef = useRef(null);
  
//   useEffect(() => {
//     const cursor = cursorRef.current;
//     const follower = followerRef.current;
    
//     // Set initial position off-screen
//     gsap.set(cursor, {
//       xPercent: -50,
//       yPercent: -50,
//       opacity: 0
//     });
    
//     gsap.set(follower, {
//       xPercent: -50,
//       yPercent: -50,
//       opacity: 0
//     });
    
//     // Vars for mouse position
//     let mouseX = 0;
//     let mouseY = 0;
    
//     // Vars for follower position
//     let followerX = 0;
//     let followerY = 0;
    
//     // Speed of follower cursor
//     const followerSpeed = 0.3;
    
//     // Mouse move handler
//     const moveHandler = (e) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
      
//       // Update cursor position immediately
//       gsap.to(cursor, {
//         duration: 0.1,
//         x: mouseX,
//         y: mouseY,
//         opacity: 1
//       });
//     };
    
//     // Animation loop for follower cursor
//     gsap.ticker.add(() => {
//       // Calculate new position with easing
//       followerX += (mouseX - followerX) * followerSpeed;
//       followerY += (mouseY - followerY) * followerSpeed;
      
//       // Update follower position
//       gsap.set(follower, {
//         x: followerX,
//         y: followerY,
//         opacity: 1
//       });
//     });
    
//     // Mouse enter/leave handlers for links and buttons
//     const handleLinkEnter = () => {
//       gsap.to(cursor, {
//         scale: 0.8,
//         duration: 0.3
//       });
      
//       gsap.to(follower, {
//         scale: 2,
//         duration: 0.3
//       });
//     };
    
//     const handleLinkLeave = () => {
//       gsap.to(cursor, {
//         scale: 1,
//         duration: 0.3
//       });
      
//       gsap.to(follower, {
//         scale: 1,
//         duration: 0.3
//       });
//     };
    
//     // Add event listeners
//     window.addEventListener('mousemove', moveHandler);
    
//     // Add hover effects for all links and buttons
//     const links = document.querySelectorAll('a, button');
//     links.forEach(link => {
//       link.addEventListener('mouseenter', handleLinkEnter);
//       link.addEventListener('mouseleave', handleLinkLeave);
//     });
    
//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener('mousemove', moveHandler);
      
//       links.forEach(link => {
//         link.removeEventListener('mouseenter', handleLinkEnter);
//         link.removeEventListener('mouseleave', handleLinkLeave);
//       });
      
//       gsap.ticker.remove();
//     };
//   }, []);
  
//   // Only show custom cursor on non-touch devices
//   if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
//     return null;
//   }
  
//   return (
//     <>
//       <div 
//         ref={cursorRef} 
//         className="fixed pointer-events-none z-50 h-3 w-3 rounded-full bg-[#aa4c40] mix-blend-difference"
//         style={{ top: 0, left: 0 }}
//       />
//       <div 
//         ref={followerRef} 
//         className="fixed pointer-events-none z-40 h-8 w-8 rounded-full border border-[#aa4c40] mix-blend-difference"
//         style={{ top: 0, left: 0 }}
//       />
//     </>
//   );
// };

// export default CustomCursor; 


"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const CustomCursor = () => {
  const cursorOuterRef = useRef(null)
  const cursorInnerRef = useRef(null)
  const cursorTextRef = useRef(null)

  useEffect(() => {
    // Check if we're on a touch device
    if (typeof navigator !== "undefined" && navigator.maxTouchPoints > 0) {
      return // Exit early on touch devices
    }

    const cursorOuter = cursorOuterRef.current
    const cursorInner = cursorInnerRef.current
    const cursorText = cursorTextRef.current

    if (!cursorOuter || !cursorInner || !cursorText) return

    // Set initial position off-screen
    gsap.set([cursorOuter, cursorInner, cursorText], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    })

    // Vars for mouse position
    let mouseX = 0
    let mouseY = 0

    // Vars for cursor position
    let outerX = 0
    let outerY = 0
    let innerX = 0
    let innerY = 0

    // Speed of cursor followers
    const outerSpeed = 0.2
    const innerSpeed = 0.3

    // Mouse move handler
    const moveHandler = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Update inner cursor position immediately
      gsap.to(cursorInner, {
        duration: 0.1,
        x: mouseX,
        y: mouseY,
        opacity: 1,
      })

      // Show cursors if they're hidden
      if (Number.parseFloat(cursorOuter.style.opacity || 0) === 0) {
        gsap.to([cursorOuter, cursorInner], {
          opacity: 1,
          duration: 0.3,
        })
      }
    }

    // Animation loop for outer cursor with easing
    const ticker = () => {
      // Calculate new position with easing
      outerX += (mouseX - outerX) * outerSpeed
      outerY += (mouseY - outerY) * outerSpeed
      innerX += (mouseX - innerX) * innerSpeed
      innerY += (mouseY - innerY) * innerSpeed

      // Update outer cursor position
      gsap.set(cursorOuter, {
        x: outerX,
        y: outerY,
      })

      // Update text position
      gsap.set(cursorText, {
        x: innerX,
        y: innerY + 40,
      })

      requestAnimationFrame(ticker)
    }

    // Start the animation loop
    const tickerRef = requestAnimationFrame(ticker)

    // Mouse enter/leave handlers for links and buttons
    const handleLinkEnter = (e) => {
      // Get the element's data attribute for cursor text
      const cursorTextContent = e.currentTarget.dataset.cursorText || ""

      // Set the cursor text
      cursorText.textContent = cursorTextContent

      // Show text if there's content
      if (cursorTextContent) {
        gsap.to(cursorText, {
          opacity: 1,
          duration: 0.3,
        })
      }

      // Animate cursors
      gsap.to(cursorInner, {
        scale: 0.5,
        duration: 0.3,
      })

      gsap.to(cursorOuter, {
        scale: 2,
        duration: 0.3,
        backgroundColor: "rgba(170, 76, 64, 0.1)",
        borderColor: "#aa4c40",
      })
    }

    const handleLinkLeave = () => {
      // Hide text
      gsap.to(cursorText, {
        opacity: 0,
        duration: 0.3,
      })

      // Reset cursors
      gsap.to(cursorInner, {
        scale: 1,
        duration: 0.3,
      })

      gsap.to(cursorOuter, {
        scale: 1,
        duration: 0.3,
        backgroundColor: "transparent",
        borderColor: "#aa4c40",
      })
    }

    // Hide cursor when it leaves the window
    const handleMouseLeave = () => {
      gsap.to([cursorOuter, cursorInner, cursorText], {
        opacity: 0,
        duration: 0.3,
      })
    }

    // Show cursor when it enters the window
    const handleMouseEnter = () => {
      gsap.to([cursorOuter, cursorInner], {
        opacity: 1,
        duration: 0.3,
      })
    }

    // Add event listeners
    document.addEventListener("mousemove", moveHandler)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Add hover effects for all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .interactive, input, select, textarea, [role="button"]',
    )
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleLinkEnter)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousemove", moveHandler)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)

      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkEnter)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })

      cancelAnimationFrame(tickerRef)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorInnerRef}
        className="fixed pointer-events-none z-[100] h-3 w-3 rounded-full bg-[#aa4c40]"
        style={{ top: 0, left: 0 }}
        aria-hidden="true"
      />
      <div
        ref={cursorOuterRef}
        className="fixed pointer-events-none z-[99] h-8 w-8 rounded-full border border-[#aa4c40]"
        style={{ top: 0, left: 0 }}
        aria-hidden="true"
      />
      <div
        ref={cursorTextRef}
        className="fixed pointer-events-none z-[99] text-xs font-medium text-[#aa4c40] opacity-0 whitespace-nowrap"
        style={{ top: 0, left: 0 }}
        aria-hidden="true"
      />
    </>
  )
}

export default CustomCursor

