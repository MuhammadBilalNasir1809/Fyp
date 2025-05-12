import React from "react"
import plan from '../../assets/plan.jpeg'

export default function Nutriscan() {
  return (
    <section className="relative overflow-hidden bg-[#fffff] p-8 md:p-12"  style={{marginTop:'100px', width:'90%',marginLeft: '70px'}}>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6" style={{marginRight:'120px'}}>
            <h2 className="text-2xl md:text-3xl font-medium">
              What is a <span className="text-red-500">NutriScan</span> for you ?
            </h2>
            <ul className="space-y-4">
              {[
                "Provide Diet Plan",
                "Best nutrition advice",
                "Exercise Guide",
                "Meal analysis",
                "Ingredient comparison",
                "One stop shop for nutritions",
                "Community",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="text-gray-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src={plan}
              alt="Nutrition planning items including meal prep containers and a notebook"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* Orange splash decoration */}
      <div className="absolute right-0 top-0 w-64 h-64">
        <img
          src="/placeholder.svg?height=256&width=256"
          alt="Orange splash decoration"
          width={256}
          height={256}
          className="object-contain"
        />
      </div>
    </section>
  )
}

