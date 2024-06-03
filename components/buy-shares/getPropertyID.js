"use client"
import { useSearchParams } from 'next/navigation'
import React from 'react'

const GetPropertyID = ({ setPropertyID}) => {

    const searchParams = useSearchParams()

    const propertyID = searchParams.get("id")
    setPropertyID(propertyID)
  return (
    <div>{propertyID}</div>
  )
}

export default GetPropertyID