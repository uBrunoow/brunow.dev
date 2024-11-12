import React, { useState, useEffect } from 'react'

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.pageX, y: event.pageY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        border: '2px solid #95F238',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none', // This ensures the ball doesn't interfere with mouse events
        transition: 'transform 5s ease-out', // Smooth transition
        animation: 'follow-mouse 5s infinite alternate', // Animation
      }}
    />
  )
}

export default MouseFollower
