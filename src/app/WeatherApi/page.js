"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleGauge, MapPinHouse, SunSnow, Thermometer, ThermometerSnowflake, ThermometerSun, Wind } from "lucide-react"
import { useEffect, useState } from "react"


export default function WeaherForecast(){

    const[dataDzis,setDataDzis] = useState(null)
    const[dataPrzewidywanie,setDataPrzewidywanie] = useState(null)
    const[loading,setLoading] = useState(true)
    const[error,setError] = useState(false)

    useEffect(()=>{
        const getData = async () =>{
            try{
                const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=52.237049&lon=21.017532&appid=07bf0aa66592a5f05be1020a41fe073a&units=metric")
                const dataJson = await response.json()
                setDataDzis(dataJson)
                console.log(dataJson)
            }
            catch(error){
                setError(true)
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        getData()
    },[])

    useEffect(()=>{
        const getData = async () =>{
            try{
                const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=52.237049&lon=21.017532&cnt=4&appid=07bf0aa66592a5f05be1020a41fe073a&units=metric")
                const dataJson = await response.json()
                setDataPrzewidywanie(dataJson)
                console.log(dataJson)
            }
            catch(error){
                setError(true)
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        getData()
    },[])

    return(
        <div>
            <div>
            <Card className="flex flex-col justify-center items-center">
                <CardHeader>
                    <CardTitle><Thermometer />Temperatura: {dataDzis.main.temp}℃</CardTitle>
                </CardHeader>
                <CardContent>
                    Data: 18.10.2024
                    <SunSnow/>{dataDzis.weather[0].description}
                    <Wind/>Prędkosć Wiatru: {dataDzis.wind.speed}km/h
                    <MapPinHouse/>Miejsce: {dataDzis.name}           
                </CardContent>
            </Card>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
            {
                dataPrzewidywanie && dataPrzewidywanie.list.map((weather,idx)=>
                <>
                    <Card key={idx}>
                        <CardHeader>
                            <CardTitle><Thermometer/>Za {idx+1} dni : {weather.main.temp}℃</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <CircleGauge />Ciśnienie: {weather.main.pressure}
                            <br></br>
                            <ThermometerSun />Temperatura Maksymalna: {weather.main.temp_max}℃
                            <br></br>
                            <ThermometerSnowflake />Temperatura Minimalna: {weather.main.temp_min}℃  

                        </CardContent>
                    </Card>
                </>
                )
            }
            </div>
        </div>
    )
}