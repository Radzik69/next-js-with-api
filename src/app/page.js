"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { ArrowDown } from "lucide-react"

export default function Goldprice(){

    const[data,setData] = useState(null)
    const[error,serError] = useState(false)
    const[loading,setLoading] = useState(true)
    const [priceArray, setPriceArray] = useState([])

    useEffect(()=>{
        const getPnbData = async () =>{
            try{
                const response = await fetch("https://api.nbp.pl/api/cenyzlota/last/30")
                const dataJson = await response.json()
                setData(dataJson)
                data.reverse()
              }
            catch(error){
                serError(true)
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        getPnbData()
    },[])


    data && data.map((cenaData,idx) =>{
      const prevPrice = idx < data.length -1 ? data[idx +1].cenaData : null
      const currentPrice = cenaData.cena
      let arrowIcon = null
      if(prevPrice!=null){
        arrowIcon = currentPrice > prevPrice ? <ArrowUp size={60} color="green"></ArrowUp> : <ArrowDown size={60} color="red"></ArrowDown>
      }
    })
  

    
    return(
      
            <div className="flex flex-col items-center justify-center max-w-52 flex-wrap" >
            {data && data.map((day,idx) =>
              <div key={idx}>
                <Card>
                  <CardContent>
                    <div >
                      <h1>
                        {day.cena.toFixed(2)} zl
                      </h1>

                      <p>
                        {day.data}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                  <p>Data: {day.data}</p>
                  </CardFooter>
                </Card>
              </div>
          )
          }
            </div>
    )
}