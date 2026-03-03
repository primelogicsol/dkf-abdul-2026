"use client"
import { useState } from "react"

const regions = [
  {
    name: "South Asia",
    countries: ["India", "Pakistan", "Bangladesh"]
  },
  {
    name: "Middle East",
    countries: ["UAE", "Saudi Arabia"]
  },
  {
    name: "Europe",
    countries: ["UK", "Germany"]
  }
]

export default function Accordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {regions.map((region, index) => (
        <div key={index} className="border-b border-gray-700 pb-4">
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="w-full flex justify-between text-left text-lg"
          >
            {region.name}
            <span>{open === index ? "-" : "+"}</span>
          </button>

          {open === index && (
            <ul className="mt-4 text-gray-400 space-y-2">
              {region.countries.map((country, i) => (
                <li key={i}>{country}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}