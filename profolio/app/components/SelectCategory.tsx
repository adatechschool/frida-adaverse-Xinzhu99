"use client"
import { useRouter } from "next/navigation";
import { getCategories } from "../actions/categories";
import { useEffect, useState } from "react";
export default function SelectCategory () {

    const [categories, setCategories] = useState([])
    const router = useRouter()

    function handleClick (e) {
        e.preventDefault()
        console.log(e.target.value)
        router.push(`/?category=${e.target.value}`)
    }
    useEffect(( )=> {
        getCategories().then(setCategories)
    }, [])
    return (
       <form onClick={handleClick}>
              {/* <label htmlFor="category">Promo Ada</label> */}
              <select name="category" id="category" required>
                <option value="tout">Tous les projects</option>
                {categories.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </form>
    )
}