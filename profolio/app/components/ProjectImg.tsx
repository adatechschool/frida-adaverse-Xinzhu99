"use client";
import { useState } from "react";
export default function ProjectImg({imgSrc}) {

  const [imgError, setImgError] = useState(false);
  return <>
  {imgError ? (
    <img 
    src="placeholder.jpeg"
    alt="thumbnail"
    className="w-60"/>
  ):(
  <img src={imgSrc}
  alt="thumbnail"
  onError={()=>setImgError(true)}
  className="w-60"
  />
)}</>;
}
